import { z } from 'zod'

// ============================================================
// SHARED VALIDATION SCHEMAS
// Add your domain-specific schemas below. Import in server
// actions, API routes, and forms for end-to-end type safety.
// ============================================================

// Auth
export const emailSchema = z.string().email('Invalid email address').min(1, 'Email is required')
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')

// Common
export const idSchema = z.string().cuid()
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})
export const searchSchema = z.object({
  query: z.string().min(1).max(200),
  ...paginationSchema.shape,
})

// Example: User profile update
export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: emailSchema,
})

// Example: Generic form with optional fields
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: emailSchema,
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  subject: z.string().max(200).optional(),
})

// Helper: Extract the inferred type from any schema
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type PaginationInput = z.infer<typeof paginationSchema>
