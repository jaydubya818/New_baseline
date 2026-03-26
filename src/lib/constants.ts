// ============================================================
// APPLICATION CONSTANTS
// Centralized constants — never hardcode these values.
// ============================================================

export const APP_NAME = process.env['NEXT_PUBLIC_APP_NAME'] ?? 'My App'
export const APP_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000'

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Auth
export const AUTH_COOKIE_NAME = 'next-auth.session-token'
export const SESSION_MAX_AGE = 30 * 24 * 60 * 60 // 30 days in seconds

// Rate limiting
export const RATE_LIMIT = {
  auth: { requests: 5, windowMs: 15 * 60 * 1000 }, // 5 per 15 min
  api: { requests: 100, windowMs: 60 * 1000 }, // 100 per min
  upload: { requests: 10, windowMs: 60 * 1000 }, // 10 per min
} as const

// File uploads
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const
export const ALLOWED_DOC_TYPES = ['application/pdf', 'application/msword'] as const

// UI
export const TOAST_DURATION = 5000
export const DEBOUNCE_MS = 300
export const ANIMATION_DURATION = 200

// Breakpoints (match tailwind.config.ts)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
} as const

// HTTP Status
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
} as const
