import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(submissions, { status: 200 })
  } catch (error) {
    console.error('[GET CONTACT SUBMISSIONS ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
