import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'

// Create email transporter
async function createEmailTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'hsa@knowcap.ai',
      pass: process.env.GMAIL_APP_PASSWORD || ''
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, role, motivation } = body

    // Validate required fields
    if (!name || !email || !company || !role || !motivation) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Save to database
    const application = await prisma.betaApplication.create({
      data: {
        name,
        email,
        company,
        role,
        motivation
      }
    })

    console.log('=== NEW BETA APPLICATION ===')
    console.log('ID:', application.id)
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Company:', company)
    console.log('Role:', role)
    console.log('Submitted on:', new Date().toLocaleString())
    console.log('============================')

    // Try to send email
    try {
      const transporter = await createEmailTransporter()

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #005EFF;">New Beta Application Submission</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 10px 0;"><strong>Role:</strong> ${role}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #005EFF;">What brings them to Knowcap:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${motivation}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="color: #6b7280; font-size: 14px;">
            Submitted on: ${new Date().toLocaleString()}<br/>
            Application ID: ${application.id}
          </p>
          
          <p style="margin-top: 20px;">
            <a href="https://knowcap.ai/betaapp" style="background-color: #005EFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View All Applications</a>
          </p>
        </div>
      `

      await transporter.sendMail({
        from: '"Knowcap Beta Applications" <hsa@knowcap.ai>',
        to: 'hsa@knowcap.ai',
        subject: `New Beta Application: ${name} from ${company}`,
        html: htmlBody
      })

      console.log('✅ Beta application email sent successfully to hsa@knowcap.ai')
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the request if email fails - data is already saved
    }

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting beta application:', error)
    
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again or contact us at hsa@knowcap.ai' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
