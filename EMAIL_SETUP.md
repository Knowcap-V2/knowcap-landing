
# Email Configuration Setup Guide

This guide will help you set up email notifications for the beta application form.

## Quick Setup with Gmail (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### Step 2: Create an App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other** as the device and name it "Knowcap Beta Form"
4. Click **Generate**
5. Copy the 16-character password (remove spaces)

### Step 3: Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your details:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-gmail-address@gmail.com
   SMTP_PASS=your-16-char-app-password
   SMTP_FROM=your-gmail-address@gmail.com
   ```

3. Replace:
   - `your-gmail-address@gmail.com` with your actual Gmail address
   - `your-16-char-app-password` with the app password you generated

### Step 4: Restart Your Development Server
```bash
yarn dev
```

## Testing

1. Navigate to the `/odoo` page
2. Click "Apply for Beta Access"
3. Fill out and submit the form
4. Check your inbox at hsa@knowcap.ai for the notification

## Alternative SMTP Providers

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailgun-smtp-username
SMTP_PASS=your-mailgun-smtp-password
```

### AWS SES
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-aws-smtp-username
SMTP_PASS=your-aws-smtp-password
```

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2FA is enabled on your Google account

### "Connection timeout" error
- Check that port 587 is not blocked by your firewall
- Try port 465 with SMTP_SECURE=true

### Emails not arriving
- Check spam/junk folder
- Verify the recipient email (hsa@knowcap.ai) is correct
- Check server logs for error messages

## Security Notes

⚠️ **Never commit `.env.local` to version control!**

The `.env.local` file is already in `.gitignore`. Keep your SMTP credentials secure and never share them publicly.
