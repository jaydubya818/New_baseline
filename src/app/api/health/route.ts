import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * Health check endpoint.
 * GET /api/health → { status, timestamp, db, uptime }
 *
 * Use in:
 * - CI smoke tests after deploy
 * - Monitoring / uptime checks
 * - Load balancer health probes
 */
export async function GET() {
  const health: Record<string, unknown> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV'],
  }

  // Database connectivity check
  try {
    await db.$queryRaw`SELECT 1`
    health['database'] = 'connected'
  } catch {
    health['status'] = 'degraded'
    health['database'] = 'disconnected'
  }

  const statusCode = health['status'] === 'ok' ? 200 : 503
  return NextResponse.json(health, { status: statusCode })
}
