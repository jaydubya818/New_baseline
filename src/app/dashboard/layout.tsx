import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signOut } from '@/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/dashboard" className="font-semibold">
            {process.env['NEXT_PUBLIC_APP_NAME'] ?? 'My App'}
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button
                type="submit"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">{children}</main>
    </div>
  )
}
