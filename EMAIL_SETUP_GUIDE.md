# 📧 Email Notification Setup Guide for AITM MOM

## ✨ Email Features Available

Your AITM MOM application now includes **enhanced email notifications** with the following features:

### 📩 **Meeting Invitations**
- **When**: Automatically sent when a meeting is scheduled
- **To**: All selected attendees 
- **Contains**: 
  - Beautiful HTML email template
  - Meeting title, agenda, date, time, location
  - Organizer information
  - Professional styling with AITM branding

### 📋 **Meeting Reports** 
- **When**: Sent after meeting completion with notes
- **To**: All attendees + organizer
- **Contains**: 
  - Meeting summary
  - Decisions made
  - Action items assigned

## 🛠️ How to Setup Email Notifications

### Option 1: Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/security
   - Select "2-Step Verification" 
   - Scroll to "App passwords"
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Update .env file**:
```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Option 2: Other Email Providers

Update the email service in `routes/meetings.js`:

```javascript
transporter = nodemailer.createTransport({
    service: 'outlook', // or 'yahoo', 'hotmail', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

### Option 3: Custom SMTP Server

```javascript
transporter = nodemailer.createTransport({
    host: 'smtp.your-domain.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## 🧪 Testing Email Setup

### 1. Test Email Configuration
Create a test file `test-email.js`:

```javascript
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function testEmail() {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself for testing
            subject: 'AITM MOM Email Test',
            html: '<h2>✅ Email setup successful!</h2><p>Your AITM MOM system can now send emails.</p>'
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', result.messageId);
    } catch (error) {
        console.error('❌ Email test failed:', error.message);
    }
}

testEmail();
```

Run the test:
```bash
node test-email.js
```

### 2. Restart Your Application
After updating email configuration:

```bash
# Stop the server
./stop-server.sh

# Start the server
./start-server.sh
```

## 🎨 Email Template Features

### Professional Design
- **Responsive HTML template**
- **AITM branding and colors**
- **Professional layout with meeting details**
- **Mobile-friendly design**

### Smart Content
- **Formatted dates** (e.g., "Monday, July 26, 2025")
- **Role-based organizer information**
- **Duration and location details**
- **Plain text fallback** for compatibility

### Example Email Content:
```
📅 Meeting Invitation: Weekly Team Sync - July 26, 2025

Title: Weekly Team Sync
📋 Agenda: Discuss project progress and blockers
📅 Date: Monday, July 26, 2025  
⏰ Time: 10:00 AM
⏱️ Duration: 60 minutes
📍 Location: Conference Room A
👤 Organizer: John Smith (Administrator)

📝 Please mark your calendar and prepare for the meeting.
```

## 🔍 Troubleshooting Email Issues

### Common Issues & Solutions:

**1. "Authentication failed"**
- ✅ Enable 2-Factor Authentication on Gmail
- ✅ Use App Password, not regular password
- ✅ Double-check EMAIL_USER and EMAIL_PASS

**2. "Service not available"**
- ✅ Check internet connection
- ✅ Verify Gmail service is working
- ✅ Try different email service

**3. "Invalid recipients"**
- ✅ Ensure attendee emails are valid
- ✅ Check user registration emails

**4. Emails go to spam**
- ✅ Add sender to contacts
- ✅ Check spam folder
- ✅ Use proper from name

## 📊 Email Status Monitoring

The application provides email status in API responses:

```json
{
  "message": "Meeting created successfully",
  "emailStatus": "Invitations sent successfully to 3 attendees",
  "attendeeCount": 3
}
```

### Status Messages:
- `"Email not configured"` - Setup required
- `"Invitations sent successfully to X attendees"` - Success
- `"Failed to send invitations: [error]"` - Error occurred

## 🔒 Security Best Practices

1. **Never commit email credentials** to version control
2. **Use App Passwords** instead of main password
3. **Regularly rotate** email passwords
4. **Monitor email usage** for suspicious activity
5. **Use environment variables** for all sensitive data

## 📈 Advanced Features Available

### 1. **Bulk Email Support**
- Sends to all attendees simultaneously
- Handles large attendee lists efficiently

### 2. **Error Recovery**
- Meeting still created even if email fails
- Detailed error logging for troubleshooting

### 3. **Professional Templates**
- HTML and plain text versions
- Branded with AITM identity
- Mobile responsive design

## ✅ Quick Setup Checklist

- [ ] Gmail 2FA enabled
- [ ] App password generated  
- [ ] .env file updated with real credentials
- [ ] Test email sent successfully
- [ ] Application restarted
- [ ] Meeting invitation tested
- [ ] Email received and formatted correctly

## 🎯 What Happens After Setup

Once configured, the system will automatically:

1. **📧 Send meeting invitations** when meetings are scheduled
2. **📋 Send meeting reports** when notes are added
3. **📊 Log email status** in server logs
4. **🔄 Handle errors gracefully** without breaking the application

Your attendees will receive professional, beautifully formatted meeting invitations instantly! 🎉
