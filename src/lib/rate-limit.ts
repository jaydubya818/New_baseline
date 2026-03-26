// ============================================================
// IN-MEMORY RATE LIMITER
// Simple sliding-window rate limiter for API routes.
// For production at scale, replace with Redis (e.g., @upstash/ratelimit).
// ============================================================

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Cleanup stale entries every 60s to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
      if (now > entry.resetAt) {
        store.delete(key)
      }
    }
  }, 60_000)
}

export interface RateLimitConfig {
  /** Max requests allowed in the window */
  requests: number
  /** Window duration in milliseconds */
  windowMs: number
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

/**
 * Check rate limit for a given key (usually IP or user ID).
 *
 * @example
 * ```ts
 * const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
 * const result = checkRateLimit(ip, RATE_LIMIT.api)
 * if (!result.success) {
 *   return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
 * }
 * ```
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const entry = store.get(key)

  // No existing entry or window expired — start fresh
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs })
    return { success: true, remaining: config.requests - 1, resetAt: now + config.windowMs }
  }

  // Within window — increment
  entry.count++

  if (entry.count > config.requests) {
    return { success: false, remaining: 0, resetAt: entry.resetAt }
  }

  return {
    success: true,
    remaining: config.requests - entry.count,
    resetAt: entry.resetAt,
  }
}
