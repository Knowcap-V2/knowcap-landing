
import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Function to get Gmail OAuth credentials
async function getGmailAuth() {
  try {
    const accessToken = process.env.GMAIL_ACCESS_TOKEN
    
    if (!accessToken) {
      throw new Error('Gmail OAuth token not found in environment')
    }

    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({
      access_token: accessToken
    })

    return oauth2Client
  } catch (error) {
    console.error('Error getting Gmail auth:', error)
    throw error
  }
}

// Function to create email message
function createMessage(to: string, subject: string, htmlBody: string) {
  const message = [
    `To: ${to}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    htmlBody
  ].join('\n')

  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
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

    // Log the submission
    console.log('=== NEW BETA APPLICATION ===')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Company:', company)
    console.log('Role:', role)
    console.log('Motivation:', motivation)
    console.log('Submitted on:', new Date().toLocaleString())
    console.log('============================')

    // Try to send email using Gmail API
    try {
      const auth = await getGmailAuth()
      const gmail = google.gmail({ version: 'v1', auth })

      const htmlBody = `
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
      `

      const encodedMessage = createMessage(
        'hsa@knowcap.ai',
        `New Beta Application: ${name} from ${company}`,
        htmlBody
      )

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: encodedMessage
        }
      })

      console.log('✅ Beta application email sent successfully to hsa@knowcap.ai')

      return NextResponse.json(
        { success: true, message: 'Application submitted successfully' },
        { status: 200 }
      )
    } catch (emailError) {
      console.error('Error sending email via Gmail API:', emailError)
      
      // Still return success to user but log the error
      return NextResponse.json(
        { 
          success: true, 
          message: 'Application received successfully',
          note: 'Your application has been logged. We will contact you at ' + email
        },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Error submitting beta application:', error)
    
    return NextResponse.json(
      { error: 'Failed to submit application. Please contact us directly at hsa@knowcap.ai' },
      { status: 500 }
    )
  }
}
