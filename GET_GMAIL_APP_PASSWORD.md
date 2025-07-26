# 🔑 How to Get Gmail App Password for AITM MOM

## 📧 Current Issue
Your Gmail account (`abhijayamon@gmail.com`) needs an **App Password** instead of your regular password.

## 🛠️ Step-by-Step Solution

### Step 1: Enable 2-Factor Authentication
1. **Go to**: [Google Account Security](https://myaccount.google.com/security)
2. **Sign in** with your Gmail account (`abhijayamon@gmail.com`)
3. **Look for**: "Signing in to Google" section
4. **Click on**: "2-Step Verification"
5. **Follow prompts** to enable 2FA (use your phone number)

### Step 2: Generate App Password
1. **Go back to**: [Google Account Security](https://myaccount.google.com/security)
2. **Under "Signing in to Google"**, click **"App passwords"**
3. **You might need to sign in again**
4. **Select app**: Choose "Mail" 
5. **Select device**: Choose "Other (Custom name)"
6. **Enter name**: Type "AITM MOM"
7. **Click**: "Generate"
8. **Copy the password**: You'll see a 16-character password like: `abcd efgh ijkl mnop`

### Step 3: Use App Password in Setup
1. **Run the setup again**:
   ```bash
   node setup-email.js
   ```

2. **Enter your email**: `abhijayamon@gmail.com`

3. **Enter the App Password**: Use the 16-character password (not `lasarabhi`)

## 🎯 Quick Fix Command

Once you have your App Password, you can also directly update your .env file:

```bash
# Edit .env file
nano .env
```

Update these lines:
```env
EMAIL_USER=abhijayamon@gmail.com
EMAIL_PASS=your-16-character-app-password-here
```

Then test:
```bash
node test-email-feature.js
```

## ⚠️ Important Notes

- **Don't use your regular Gmail password** (`lasarabhi` won't work)
- **App Password is 16 characters** (like: `abcd efgh ijkl mnop`)
- **You need 2-Factor Authentication enabled first**
- **The App Password is generated once** and can't be viewed again

## 🧪 After Setup

Once configured correctly, you should see:
```
✅ Test email sent successfully!
📧 Message ID: <some-id>
📬 Test email sent to: abhijayamon@gmail.com
```

## 🔄 Alternative: Use Different Email

If you prefer not to use Gmail, you can use:
- **Outlook/Hotmail**: Usually works with regular password
- **Yahoo**: Might need app password too
- **Other email providers**: Various requirements

Run `node setup-email.js` and choose option 2, 3, or 4 for other providers.

## 🆘 Still Having Issues?

If you continue having problems:
1. **Make sure 2FA is fully enabled**
2. **Generate a new App Password**
3. **Remove spaces from App Password**
4. **Try copy-pasting the password carefully**

The App Password setup is a one-time process and then your email notifications will work perfectly! 🎉
