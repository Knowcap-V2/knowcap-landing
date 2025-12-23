import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationId, adminNotes } = body

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      )
    }

    const updatedApplication = await prisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: { adminNotes }
    })

    return NextResponse.json({
      success: true,
      application: updatedApplication
    })
  } catch (error) {
    console.error('Error updating admin notes:', error)
    return NextResponse.json(
      { error: 'Failed to update admin notes' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
