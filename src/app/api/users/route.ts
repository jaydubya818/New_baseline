import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { withAuth, withRateLimit, withValidation } from '@/lib/api'

/**
 * Example API route demonstrating the composable wrapper pattern.
 *
 * GET  /api/users       → List users (authenticated + rate-limited)
 * POST /api/users       → Create user (authenticated + validated)
 *
 * This is a TEMPLATE. Copy and adapt for your own endpoints.
 * Delete this file when you build real user management.
 */

// --- GET /api/users (list) ---

const listHandler = withAuth(
  withRateLimit(
    { requests: 30, windowMs: 60_000 },
    async (req: NextRequest, _context) => {
      const url = new URL(req.url)
      const page = Number(url.searchParams.get('page') ?? '1')
      const limit = Number(url.searchParams.get('limit') ?? '10')

      const [users, total] = await Promise.all([
        db.user.findMany({
          select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        db.user.count(),
      ])

      return NextResponse.json({
        data: users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      })
    },
  ),
)

export { listHandler as GET }

// --- POST /api/users (create) ---

const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
})

const createHandler = withAuth(
  withValidation(createUserSchema, async (req: NextRequest, context) => {
    const { data } = context

    // Check for existing user
    const existing = await db.user.findUnique({
      where: { email: data.email },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'User with this email already exists', code: 409 },
        { status: 409 },
      )
    }

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        ...(data.role ? { role: data.role } : {}),
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    })

    return NextResponse.json({ data: user }, { status: 201 })
  }),
)

export { createHandler as POST }
