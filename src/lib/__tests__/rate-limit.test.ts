import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit } from '../rate-limit'

describe('checkRateLimit', () => {
  const config = { requests: 3, windowMs: 10_000 }

  beforeEach(() => {
    // Use unique keys per test to avoid shared state
  })

  it('allows requests under the limit', () => {
    const key = `test-${Date.now()}-allow`
    const result = checkRateLimit(key, config)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it('decrements remaining on each call', () => {
    const key = `test-${Date.now()}-decrement`
    checkRateLimit(key, config)
    const result = checkRateLimit(key, config)
    expect(result.remaining).toBe(1)
  })

  it('blocks after exceeding the limit', () => {
    const key = `test-${Date.now()}-block`
    checkRateLimit(key, config)
    checkRateLimit(key, config)
    checkRateLimit(key, config)
    const result = checkRateLimit(key, config)
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('returns resetAt timestamp in the future', () => {
    const key = `test-${Date.now()}-reset`
    const result = checkRateLimit(key, config)
    expect(result.resetAt).toBeGreaterThan(Date.now())
  })
})
