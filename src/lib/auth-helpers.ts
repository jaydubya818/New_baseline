import 'server-only'

import { auth } from '@/auth'
import { UnauthorizedError, ForbiddenError } from '@/lib/error'
import type { SessionUser } from '@/types'

// ============================================================
// SERVER-SIDE AUTH GUARDS
// Use in Server Components, Server Actions, and API routes.
// ============================================================

/**
 * Require an authenticated session. Throws UnauthorizedError if not logged in.
 *
 * @example
 * ```ts
 * export async function myServerAction() {
 *   const user = await requireAuth()
 *   // user is guaranteed to exist here
 * }
 * ```
 */
export async function requireAuth(): Promise<SessionUser> {
  const session = await auth()

  if (!session?.user?.id) {
    throw new UnauthorizedError()
  }

  return session.user as SessionUser
}

/**
 * Require an admin session. Throws ForbiddenError if not admin.
 *
 * @example
 * ```ts
 * export async function adminOnlyAction() {
 *   const user = await requireAdmin()
 * }
 * ```
 */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireAuth()

  // Check role from database (session user may not have role)
  const { db } = await import('@/lib/db')
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    select: { role: true },
  })

  if (dbUser?.role !== 'ADMIN') {
    throw new ForbiddenError('Admin access required')
  }

  return user
}

/**
 * Get the current session user, or null if not authenticated.
 * Does NOT throw — use when auth is optional.
 */
export async function getUser(): Promise<SessionUser | null> {
  const session = await auth()
  return (session?.user as SessionUser) ?? null
}
