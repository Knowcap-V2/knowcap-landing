import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const applications = await prisma.betaApplication.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(applications, { status: 200 })
  } catch (error) {
    console.error('Error fetching beta applications:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
