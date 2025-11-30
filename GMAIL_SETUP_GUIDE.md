# Gmail App Password Setup Guide

## Overview
To enable email notifications for beta applications, you need to generate a Gmail App Password for the hsa@knowcap.ai account.

## Steps to Generate Gmail App Password

### 1. Enable 2-Factor Authentication (If Not Already Enabled)
1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", click on **2-Step Verification**
4. Follow the prompts to set up 2FA if not already enabled

### 2. Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. In the "Select app" dropdown, choose **Mail**
4. In the "Select device" dropdown, choose **Other (Custom name)**
5. Enter a name like "Knowcap Beta Notifications"
6. Click **Generate**
7. Google will display a 16-character password (format: xxxx xxxx xxxx xxxx)
8. **Copy this password immediately** - you won't be able to see it again!

### 3. Update the Environment Variable
1. SSH into your server or open your deployment environment
2. Edit the `.env` file in `/home/ubuntu/knowcap_landing/app/`
3. Replace the placeholder value:
   ```
   GMAIL_APP_PASSWORD=YOUR_16_CHARACTER_APP_PASSWORD
   ```
   Example:
   ```
   GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
   ```
   (Note: You can include or exclude spaces - both work)

4. Save the file
5. Restart your application for changes to take effect

### 4. Test the Email Functionality
1. Visit https://knowcap.ai/
2. Fill out the beta application form
3. Submit the form
4. Check hsa@knowcap.ai inbox for the notification email

## Troubleshooting

### Email Not Sending?
- **Check the app password**: Make sure it's correctly copied (16 characters)
- **Check 2FA**: Gmail app passwords require 2-Factor Authentication to be enabled
- **Check Gmail settings**: Make sure "Less secure app access" is not blocking the connection
- **Check server logs**: Look for error messages in the console

### Common Errors
- **"Invalid credentials"**: App password is incorrect or not set
- **"Username and Password not accepted"**: 2FA is not enabled or app password is expired
- **"Connection timeout"**: Firewall may be blocking port 587

## Security Notes
- **Never share your app password** - treat it like your account password
- **Use app-specific passwords** for each application
- **Revoke unused passwords** from https://myaccount.google.com/apppasswords
- App passwords bypass 2FA, so keep them secure

## What's New

### Database Storage
- All beta applications are now stored in a PostgreSQL database
- Applications persist even if emails fail to send
- Easy to query and export data

### Admin Dashboard
- View all applications at: https://knowcap.ai/betaapp
- Features:
  - Real-time application list
  - Search and filter capabilities
  - Export to CSV
  - Statistics and analytics
  - Direct email links to applicants

### Email Notifications
- Emails sent to: hsa@knowcap.ai
- Includes all application details
- Direct link to admin dashboard
- Application ID for reference

## Need Help?
If you encounter any issues, check the application logs or contact your system administrator.
