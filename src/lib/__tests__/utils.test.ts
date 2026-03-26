import { describe, it, expect } from 'vitest'
import { cn, formatCurrency, truncate, sleep, isServer, generateId } from '../utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra')
  })

  it('handles undefined and null', () => {
    expect(cn('base', undefined, null, 'extra')).toBe('base extra')
  })
})

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats negative amounts', () => {
    expect(formatCurrency(-50)).toBe('-$50.00')
  })
})

describe('truncate', () => {
  it('returns string unchanged if under max length', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('truncates with ellipsis at max length', () => {
    expect(truncate('hello world', 8)).toBe('hello...')
  })

  it('handles exact length', () => {
    expect(truncate('hello', 5)).toBe('hello')
  })
})

describe('sleep', () => {
  it('resolves after specified time', async () => {
    const start = Date.now()
    await sleep(50)
    const elapsed = Date.now() - start
    expect(elapsed).toBeGreaterThanOrEqual(40) // allow small variance
  })
})

describe('isServer', () => {
  it('returns false in jsdom test environment (window exists)', () => {
    // vitest uses jsdom which defines `window` — so isServer() returns false
    // In a real Node.js server context (no jsdom), this would return true
    expect(isServer()).toBe(false)
  })
})

describe('generateId', () => {
  it('returns a string', () => {
    expect(typeof generateId()).toBe('string')
  })

  it('returns unique values', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()))
    expect(ids.size).toBe(100)
  })

  it('returns 7-character strings', () => {
    expect(generateId()).toHaveLength(7)
  })
})
