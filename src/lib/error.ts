import { isServer } from '@/lib/utils'

// ============================================================
// ERROR HANDLING UTILITIES
// Centralized error handling with optional Sentry integration.
// Configure NEXT_PUBLIC_SENTRY_DSN in .env.local to enable.
// ============================================================

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super(
      id ? `${resource} with id ${id} not found` : `${resource} not found`,
      'NOT_FOUND',
      404
    )
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 'UNAUTHORIZED', 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 'FORBIDDEN', 403)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details)
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfterMs?: number) {
    super('Too many requests', 'RATE_LIMITED', 429, { retryAfterMs })
  }
}

// --- Sentry Integration (lazy-loaded) ---

let sentryInitialized = false

async function initSentry() {
  if (sentryInitialized) return

  const dsn = process.env['NEXT_PUBLIC_SENTRY_DSN']
  if (!dsn) return

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Sentry = await import(/* webpackIgnore: true */ '@sentry/nextjs' as string)
    Sentry.init({
      dsn,
      environment: process.env['NODE_ENV'],
      tracesSampleRate: process.env['NODE_ENV'] === 'production' ? 0.1 : 1.0,
    })
    sentryInitialized = true
  } catch {
    // Sentry not installed — that's fine, it's optional
    console.warn('[error] @sentry/nextjs not installed, error reporting disabled')
  }
}

/**
 * Report an error to Sentry (if configured) and log it.
 * Safe to call even if Sentry is not installed.
 */
export async function captureError(error: unknown, context?: Record<string, unknown>) {
  await initSentry()

  const err = error instanceof Error ? error : new Error(String(error))

  if (isServer()) {
    console.error('[error]', err.message, context ?? '')
  }

  try {
    const Sentry = await import(/* webpackIgnore: true */ '@sentry/nextjs' as string)
    Sentry.captureException(err, { extra: context })
  } catch {
    // Sentry not available
  }
}

/**
 * Convert an AppError (or unknown error) to an API-safe response object.
 */
export function toErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return {
      error: error.message,
      code: error.code,
      ...(error.details ? { details: error.details } : {}),
    }
  }

  // Don't leak internal error details in production
  const message =
    process.env['NODE_ENV'] === 'development' && error instanceof Error
      ? error.message
      : 'Internal server error'

  return { error: message, code: 'INTERNAL_ERROR' }
}
