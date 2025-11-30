import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { google } from 'googleapis'
import * as fs from 'fs'

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic' // Force rebuild for Gmail API deployment

// Get Gmail OAuth access token from Abacus.AI auth secrets (runtime only)
function getGmailAccessToken(): string | null {
  try {
    console.log('[TOKEN] Attempting to read Gmail OAuth token...')
    
    // This path is only accessed at runtime in the deployed environment
    // Using environment variable to avoid build-time path detection
    const homeDir = process.env.HOME
    if (!homeDir) {
      console.error('[TOKEN] ❌ HOME environment variable not set')
      return null
    }
    
    console.log('[TOKEN] HOME directory:', homeDir)
    const authSecretsPath = `${homeDir}/.config/abacusai_auth_secrets.json`
    console.log('[TOKEN] Checking path:', authSecretsPath)
    
    if (fs.existsSync(authSecretsPath)) {
      console.log('[TOKEN] ✅ Auth secrets file exists')
      const secrets = JSON.parse(fs.readFileSync(authSecretsPath, 'utf-8'))
      const token = secrets?.gmailuser?.secrets?.access_token?.value || null
      
      if (token) {
        console.log('[TOKEN] ✅ Token found, length:', token.length)
      } else {
        console.error('[TOKEN] ❌ Token not found in secrets file structure')
        console.error('[TOKEN] Available keys:', Object.keys(secrets))
      }
      
      return token
    } else {
      console.error('[TOKEN] ❌ Auth secrets file does NOT exist at:', authSecretsPath)
    }
  } catch (error: any) {
    console.error('[TOKEN] ❌ Error reading Gmail OAuth token:', error.message)
  }
  return null
}

// Send email using Gmail API
async function sendGmailEmail(to: string, subject: string, htmlBody: string) {
  console.log('[EMAIL] 🚀 Starting email send process')
  console.log('[EMAIL] 📧 To:', to)
  console.log('[EMAIL] 📝 Subject:', subject)
  
  const accessToken = getGmailAccessToken()
  
  if (!accessToken) {
    console.error('[EMAIL] ❌ OAuth token not found!')
    throw new Error('Gmail OAuth token not found. Please reconnect Gmail.')
  }
  
  console.log('[EMAIL] ✅ Access token found (length:', accessToken.length, ')')

  // Create OAuth2 client
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: accessToken })
  console.log('[EMAIL] ✅ OAuth2 client created')

  // Create Gmail API client
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client })
  console.log('[EMAIL] ✅ Gmail API client initialized')

  // Create email message
  const message = [
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `From: "Knowcap Beta Applications" <hsa@smetools.io>`,
    `To: ${to}`,
    `Subject: ${subject}`,
    '',
    htmlBody
  ].join('\n')

  // Encode message in base64url format
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  // Send email
  console.log('[EMAIL] 📤 Sending email via Gmail API...')
  const result = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage
    }
  })
  
  console.log('[EMAIL] ✅ Email sent successfully! Message ID:', result.data.id)
  return result.data
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

      await sendGmailEmail(
        'hsa@knowcap.ai',
        `New Beta Application: ${name} from ${company}`,
        htmlBody
      )

      console.log('✅ Beta application email sent successfully to hsa@knowcap.ai')
    } catch (emailError: any) {
      console.error('[EMAIL] ❌ Error sending email:', emailError.message)
      console.error('[EMAIL] Full error:', JSON.stringify(emailError, null, 2))
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
