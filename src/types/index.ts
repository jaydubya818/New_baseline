import type { User } from '@prisma/client'

// Re-export Prisma types for convenience
export type { User }

// API response shape
export type ApiResponse<T> =
  | { data: T; error?: never }
  | { data?: never; error: string; code?: string; details?: unknown }

// Auth session user (extends next-auth default)
export interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

// Pagination
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// Server Action result
export type ActionResult<T = void> =
  | { success: true; data: T; error?: never }
  | { success: false; error: string; data?: never }

// Form state (for useActionState)
export interface FormState {
  error?: string
  success?: string
  fieldErrors?: Record<string, string[]>
}
