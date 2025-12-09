import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const linkedin = formData.get('linkedin') as string
    const portfolio = formData.get('portfolio') as string
    const aiProject = formData.get('ai_project') as string
    const role = formData.get('role') as string
    const resume = formData.get('resume') as File

    // Validate required fields
    if (!fullName || !email || !role || !resume) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database (without resume for now - would need file storage)
    const application = await prisma.recruitmentApplication.create({
      data: {
        fullName,
        email,
        role,
        linkedin: linkedin || null,
        portfolio: portfolio || null,
        aiProject: aiProject || null,
        resumePath: resume.name // Store filename for reference
      }
    })

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      const adminMailOptions = {
        from: process.env.GMAIL_USER,
        to: 'hsa@knowcap.ai',
        subject: `New Recruitment Application: ${role}`,
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #005EFF; font-family: 'Space Grotesk', sans-serif;">New Recruitment Application</h2>
            
            <div style="background: #F5F7FA; padding: 20px; border-radius: 12px; margin: 20px 0;">
              <p><strong>Role:</strong> ${role}</p>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}">${linkedin}</a></p>` : ''}
              ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>` : ''}
            </div>

            ${aiProject ? `
              <div style="margin: 20px 0;">
                <h3 style="font-family: 'Space Grotesk', sans-serif;">AI Project:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${aiProject}</p>
              </div>
            ` : ''}

            <div style="margin: 20px 0;">
              <p><strong>Resume:</strong> ${resume.name}</p>
              <p style="font-size: 0.9rem; color: #6B7280;">Note: Resume file not attached. Please check the admin dashboard at https://knowcap.ai/admin</p>
            </div>

            <hr style="border: 1px solid #E5E7EB; margin: 20px 0;" />
            
            <p style="color: #6B7280; font-size: 14px;">
              Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC
            </p>
          </div>
        `,
      }

      await transporter.sendMail(adminMailOptions)
    } catch (emailError) {
      console.error('[EMAIL ERROR]', emailError)
      // Continue even if email fails - application is saved to database
    }

    return NextResponse.json(
      { message: 'Application submitted successfully', id: application.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('[RECRUITMENT APPLICATION ERROR]', error)
    return NextResponse.json(
      { message: 'Failed to submit application' },
      { status: 500 }
    )
  }
}
