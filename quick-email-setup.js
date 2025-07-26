// Quick Email Setup for AITM MOM
// This script helps you manually configure email without interactive prompts

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('⚡ AITM MOM Quick Email Setup');
console.log('='.repeat(40));

// Example configurations - REPLACE WITH YOUR ACTUAL CREDENTIALS
const emailConfigs = {
    // REPLACE THESE WITH YOUR ACTUAL EMAIL CREDENTIALS
    gmail: {
        EMAIL_USER: 'your-email@gmail.com',          // Replace with your Gmail address
        EMAIL_PASS: 'your-app-password-here',       // Replace with your Gmail App Password
        service: 'gmail'
    },
    
    // Alternative providers (uncomment and configure as needed)
    /*
    outlook: {
        EMAIL_USER: 'your-email@outlook.com',
        EMAIL_PASS: 'your-password-here',
        service: 'outlook'
    },
    
    yahoo: {
        EMAIL_USER: 'your-email@yahoo.com',
        EMAIL_PASS: 'your-password-here',
        service: 'yahoo'
    }
    */
};

async function quickSetup() {
    console.log('🔍 Current email configuration:');
    console.log(`   EMAIL_USER: ${process.env.EMAIL_USER}`);
    console.log(`   EMAIL_PASS: ${process.env.EMAIL_PASS ? '[SET]' : '[NOT SET]'}`);
    console.log('');
    
    if (process.env.EMAIL_USER === 'demo@gmail.com' || process.env.EMAIL_PASS === 'demo_password') {
        console.log('⚠️  Email not configured yet!');
        console.log('');
        console.log('📋 To configure email:');
        console.log('');
        console.log('Option 1 - Interactive Setup (Recommended):');
        console.log('   node setup-email.js');
        console.log('');
        console.log('Option 2 - Manual Setup:');
        console.log('   1. Edit this file (quick-email-setup.js)');
        console.log('   2. Replace the placeholder values in emailConfigs.gmail');
        console.log('   3. Run: node quick-email-setup.js');
        console.log('');
        console.log('Option 3 - Direct .env Edit:');
        console.log('   1. Edit .env file');
        console.log('   2. Update EMAIL_USER and EMAIL_PASS');
        console.log('   3. Run: node test-email-feature.js');
        console.log('');
        
        // Check if this file has been configured
        const config = emailConfigs.gmail;
        if (config.EMAIL_USER === 'your-email@gmail.com') {
            console.log('💡 This setup file needs configuration first!');
            console.log('   Edit quick-email-setup.js and replace:');
            console.log(`   - EMAIL_USER: "${config.EMAIL_USER}"`);
            console.log(`   - EMAIL_PASS: "${config.EMAIL_PASS}"`);
            return;
        }
    }
    
    // Test current configuration
    console.log('🧪 Testing current email configuration...');
    
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        console.log('📤 Sending test email...');
        
        const testResult = await transporter.sendMail({
            from: {
                name: 'AITM MOM System',
                address: process.env.EMAIL_USER
            },
            to: process.env.EMAIL_USER,
            subject: '✅ AITM MOM Email Test Successful',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 10px; text-align: center;">
                        <h1>✅ Email Configuration Working!</h1>
                        <p>Your AITM MOM system can now send email notifications.</p>
                    </div>
                    <div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
                        <h2>Configuration Details:</h2>
                        <p><strong>Email:</strong> ${process.env.EMAIL_USER}</p>
                        <p><strong>Status:</strong> Ready to send meeting invitations!</p>
                        <p><strong>Test Time:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `
        });
        
        console.log('✅ Email test successful!');
        console.log(`📧 Message ID: ${testResult.messageId}`);
        console.log(`📬 Test email sent to: ${process.env.EMAIL_USER}`);
        console.log('');
        console.log('🎉 Your email notifications are working!');
        console.log('📋 Meeting invitations will now be sent automatically.');
        
    } catch (error) {
        console.log('❌ Email test failed!');
        console.log(`🔍 Error: ${error.message}`);
        console.log('');
        console.log('💡 Quick fixes:');
        
        if (error.message.includes('authentication')) {
            console.log('   • Check your Gmail App Password (16 characters)');
            console.log('   • Make sure 2-Factor Authentication is enabled');
            console.log('   • Use App Password, not regular password');
        } else {
            console.log('   • Verify email address is correct');
            console.log('   • Check internet connection');
            console.log('   • Try running: node setup-email.js');
        }
    }
}

// Auto-configure if credentials are provided in this file
async function autoSetup() {
    const config = emailConfigs.gmail;
    
    if (config.EMAIL_USER !== 'your-email@gmail.com' && config.EMAIL_PASS !== 'your-app-password-here') {
        console.log('🔧 Auto-configuring email from this file...');
        
        // Update .env file
        const envPath = path.join(__dirname, '.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        envContent = envContent.replace(/EMAIL_USER=.*/, `EMAIL_USER=${config.EMAIL_USER}`);
        envContent = envContent.replace(/EMAIL_PASS=.*/, `EMAIL_PASS=${config.EMAIL_PASS}`);
        
        fs.writeFileSync(envPath, envContent);
        
        console.log('✅ .env file updated!');
        console.log('🔄 Reloading configuration...');
        
        // Reload environment
        delete require.cache[path.join(__dirname, '.env')];
        require('dotenv').config();
    }
}

// Run setup
autoSetup().then(() => quickSetup()).catch(console.error);
