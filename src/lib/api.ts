import { NextRequest, NextResponse } from 'next/server'
import { type ZodSchema } from 'zod'
import { auth } from '@/auth'
import { checkRateLimit, type RateLimitConfig } from '@/lib/rate-limit'
import { RATE_LIMIT } from '@/lib/constants'
import { AppError, toErrorResponse, UnauthorizedError } from '@/lib/error'
import type { SessionUser } from '@/types'

// ============================================================
// API ROUTE MIDDLEWARE WRAPPERS
// Composable wrappers for Next.js route handlers.
//
// Usage:
//   export const GET = withAuth(async (req, { user }) => {
//     return NextResponse.json({ hello: user.email })
//   })
//
//   export const POST = withValidation(myZodSchema, async (req, { data }) => {
//     return NextResponse.json({ created: data })
//   })
// ============================================================

type Handler = (req: NextRequest, context: Record<string, unknown>) => Promise<NextResponse>

interface AuthContext { user: SessionUser }
interface ValidationContext<T> { data: T }
interface RateLimitContext { rateLimit: { remaining: number; resetAt: number } }

/**
 * Require authentication. Injects `user` into handler context.
 */
export function withAuth<C extends Record<string, unknown> = Record<string, never>>(
  handler: (req: NextRequest, context: C & AuthContext) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: C = {} as C) => {
    try {
      const session = await auth()
      if (!session?.user?.id) {
        throw new UnauthorizedError()
      }
      return await handler(req, { ...context, user: session.user as SessionUser })
    } catch (error) {
      return handleError(error)
    }
  }
}

/**
 * Validate request body against a Zod schema. Injects `data` into handler context.
 */
export function withValidation<T, C extends Record<string, unknown> = Record<string, never>>(
  schema: ZodSchema<T>,
  handler: (req: NextRequest, context: C & ValidationContext<T>) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: C = {} as C) => {
    try {
      const body = await req.json()
      const result = schema.safeParse(body)

      if (!result.success) {
        return NextResponse.json(
          { error: 'Validation failed', code: 'VALIDATION_ERROR', details: result.error.flatten() },
          { status: 400 }
        )
      }
      return await handler(req, { ...context, data: result.data })
    } catch (error) {
      return handleError(error)
    }
  }
}

/**
 * Apply rate limiting by IP. Injects `rateLimit` into handler context.
 */
export function withRateLimit<C extends Record<string, unknown> = Record<string, never>>(
  config: RateLimitConfig = RATE_LIMIT.api,
  handler: (req: NextRequest, context: C & RateLimitContext) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: C = {} as C) => {
    try {
      const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
      const result = checkRateLimit(ip, config)

      if (!result.success) {
        return NextResponse.json(
          { error: 'Too many requests', code: 'RATE_LIMITED' },
          {
            status: 429,
            headers: { 'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)) },
          }
        )
      }

      return await handler(req, {
        ...context,
        rateLimit: { remaining: result.remaining, resetAt: result.resetAt },
      })
    } catch (error) {
      return handleError(error)
    }
  }
}

/**
 * Convert any thrown error into a safe JSON response.
 */
function handleError(error: unknown): NextResponse {
  if (error instanceof AppError) {
    return NextResponse.json(toErrorResponse(error), { status: error.statusCode })
  }

  console.error('[api] Unhandled error:', error)
  return NextResponse.json(toErrorResponse(error), { status: 500 })
}
