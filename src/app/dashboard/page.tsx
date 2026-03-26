import { auth } from '@/auth'

export const metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {session?.user?.name ?? session?.user?.email ?? 'User'}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stat cards — replace with your data */}
        {[
          { label: 'Total Users', value: '—', description: 'Connect your data' },
          { label: 'Active Now', value: '—', description: 'Real-time metric' },
          { label: 'Revenue', value: '—', description: 'This month' },
          { label: 'Growth', value: '—', description: 'vs. last month' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm"
          >
            <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h2 className="text-lg font-semibold">Getting Started</h2>
        <p className="mt-2 text-muted-foreground">
          This is your dashboard. Replace these placeholder cards with real data
          by connecting your domain models in{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
            prisma/schema.prisma
          </code>{' '}
          and building server actions in{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
            src/server/actions.ts
          </code>
          .
        </p>
      </div>
    </div>
  )
}
