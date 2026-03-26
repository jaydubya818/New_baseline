import Link from 'next/link'
import { auth } from '@/auth'

export default async function HomePage() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          {process.env['NEXT_PUBLIC_APP_NAME'] ?? 'My App'}
        </h1>
        <p className="text-muted-foreground text-lg">
          Built on New Baseline — Next.js 15, NextAuth v5, Prisma, Tailwind, shadcn/ui
        </p>

        <div className="flex gap-4 justify-center">
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Go to Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {session?.user && (
          <p className="text-sm text-muted-foreground">
            Signed in as {session.user.email}
          </p>
        )}
      </div>
    </main>
  )
}
