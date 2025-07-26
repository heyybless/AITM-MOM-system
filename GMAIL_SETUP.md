# 📧 Quick Gmail Setup for AITM MOM

## 🚀 Option 1: Use the Interactive Setup (Recommended)

Run the interactive setup wizard:
```bash
node setup-email.js
```

This will guide you through the entire process step by step!

## 🔧 Option 2: Manual Gmail Setup

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", select "2-Step Verification"
3. Follow the prompts to enable 2FA if not already enabled

### Step 2: Generate App Password
1. Go back to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", select "App passwords"
3. Select "Mail" from the app dropdown
4. Select "Other (Custom name)" from device dropdown
5. Enter "AITM MOM" as the name
6. Click "Generate"
7. **Copy the 16-character password** (e.g., "abcd efgh ijkl mnop")

### Step 3: Update .env File
Edit your `.env` file and update:
```env
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Step 4: Test and Restart
```bash
# Test the configuration
node test-email-feature.js

# Restart the application
./stop-server.sh
./start-server.sh
```

## ⚠️ Important Notes

- **Use App Password, NOT your regular Gmail password**
- **The App Password is 16 characters long**
- **2-Factor Authentication must be enabled first**
- **Remove spaces from App Password if copying with spaces**

## 🧪 Verification

After setup, you should see:
```
📧 Email service configured successfully
```

And when creating meetings, you'll see:
```
📧 Meeting invitation emails sent to: user@example.com
```

## ❌ Troubleshooting

**"Username and Password not accepted"**
- You're using regular password instead of App Password
- Generate a new App Password and try again

**"Less secure app access"**
- This doesn't apply to App Passwords
- App Passwords bypass less secure app restrictions

**Still having issues?**
- Run the interactive setup: `node setup-email.js`
- It will test your configuration and provide specific error messages
