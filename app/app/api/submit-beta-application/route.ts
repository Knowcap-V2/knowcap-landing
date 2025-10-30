
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // Log to console for admin to see
      console.log('=== NEW BETA APPLICATION (SMTP NOT CONFIGURED) ===')
      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Company:', company)
      console.log('Role:', role)
      console.log('Motivation:', motivation)
      console.log('Submitted on:', new Date().toLocaleString())
      console.log('===================================================')
      
      // Still return success to the user
      return NextResponse.json(
        { 
          success: true, 
          message: 'Application received successfully',
          note: 'Your application has been logged. We will contact you at ' + email
        },
        { status: 200 }
      )
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content
    const emailContent = `
New Beta Application Submission

Name: ${name}
Email: ${email}
Company: ${company}
Role: ${role}

What brings them to Knowcap:
${motivation}

---
Submitted on: ${new Date().toLocaleString()}
    `.trim()

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'hsa@knowcap.ai',
      subject: `New Beta Application: ${name} from ${company}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Beta Application Submission</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 10px 0;"><strong>Role:</strong> ${role}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #0891b2;">What brings them to Knowcap:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${motivation}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
          
          <p style="color: #6b7280; font-size: 14px;">
            Submitted on: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    })

    console.log('✅ Beta application email sent successfully to hsa@knowcap.ai')

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting beta application:', error)
    
    // Log the application data even if email fails
    console.log('=== FAILED EMAIL - APPLICATION DATA ===')
    console.log('Data:', JSON.stringify(await request.json(), null, 2))
    console.log('Error:', error)
    console.log('======================================')
    
    return NextResponse.json(
      { error: 'Failed to submit application. Please contact us directly at hsa@knowcap.ai' },
      { status: 500 }
    )
  }
}
