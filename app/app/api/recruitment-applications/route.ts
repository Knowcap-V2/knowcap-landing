import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const applications = await prisma.recruitmentApplication.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(applications, { status: 200 })
  } catch (error) {
    console.error('[GET RECRUITMENT APPLICATIONS ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
