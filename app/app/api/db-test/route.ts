import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const results: Record<string, string> = {}

  // Test the current DATABASE_URL
  const dbUrl = process.env.DATABASE_URL || 'NOT_SET'
  results.DATABASE_URL_SET = dbUrl !== 'NOT_SET' ? 'YES' : 'NO'
  results.DATABASE_URL_HOST = (() => {
    try { return new URL(dbUrl.replace('postgresql://', 'postgres://')).hostname } catch { return 'PARSE_ERROR' }
  })()

  // Test Prisma connection
  try {
    const { PrismaClient } = require('@prisma/client')
    const p = new PrismaClient()
    await p.$queryRaw`SELECT 1 as ok`
    await p.$disconnect()
    results.prisma_direct = 'CONNECTED'
  } catch (e: any) {
    results.prisma_direct = String(e.message).slice(0, 150)
  }

  // Test pooler regions
  const regions = ['us-east-1', 'eu-west-1', 'eu-central-1', 'ap-southeast-1']
  for (const region of regions) {
    try {
      const { Client } = require('pg')
      const c = new Client({
        host: `aws-0-${region}.pooler.supabase.com`,
        port: 6543,
        user: 'postgres.oseaqmubtbibvflrllsn',
        password: 'Knowyourstuff@268',
        database: 'postgres',
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
      })
      await c.connect()
      await c.query('SELECT 1')
      await c.end()
      results[`pooler_${region}`] = 'CONNECTED'
    } catch (e: any) {
      results[`pooler_${region}`] = String(e.message).slice(0, 80)
    }
  }

  return NextResponse.json(results)
}
