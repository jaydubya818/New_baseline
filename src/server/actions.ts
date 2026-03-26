'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { ActionResult } from '@/types'
import { updateProfileSchema } from '@/lib/validations'

// ============================================================
// SERVER ACTIONS TEMPLATE
// All writes go through server actions. Pattern:
// 1. Authenticate
// 2. Validate input with zod
// 3. Authorize (check ownership / permissions)
// 4. Execute DB operation in try-catch
// 5. Revalidate cache
// 6. Return ActionResult
// ============================================================

/**
 * Get the current authenticated user or throw.
 */
async function requireAuth() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/login')
  }
  return session.user
}

/**
 * Example: Update user profile.
 */
export async function updateProfile(
  formData: FormData
): Promise<ActionResult<{ name: string }>> {
  const user = await requireAuth()

  // Validate
  const parsed = updateProfileSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  })

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(', '),
    }
  }

  // Execute
  try {
    const updated = await db.user.update({
      where: { id: user.id },
      data: { name: parsed.data.name },
    })

    revalidatePath('/dashboard')
    return { success: true, data: { name: updated.name ?? '' } }
  } catch (error) {
    console.error('updateProfile failed:', error)
    return { success: false, error: 'Failed to update profile. Please try again.' }
  }
}

// ============================================================
// ADD YOUR SERVER ACTIONS BELOW
// ============================================================

// export async function createPost(formData: FormData): Promise<ActionResult<{ id: string }>> {
//   const user = await requireAuth()
//   const parsed = createPostSchema.safeParse({ ... })
//   if (!parsed.success) return { success: false, error: '...' }
//   try {
//     const post = await db.post.create({ data: { ...parsed.data, authorId: user.id } })
//     revalidatePath('/dashboard')
//     return { success: true, data: { id: post.id } }
//   } catch (error) {
//     console.error('createPost failed:', error)
//     return { success: false, error: 'Failed to create post.' }
//   }
// }
