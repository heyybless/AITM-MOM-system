#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('📧 AITM MOM Email Setup Wizard');
console.log('='.repeat(50));
console.log('This wizard will help you configure email notifications for your application.\n');

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function setupEmail() {
    try {
        console.log('🔧 Let\'s set up your email configuration!\n');
        
        // Choose email provider
        console.log('📮 Choose your email provider:');
        console.log('1. Gmail (Recommended)');
        console.log('2. Outlook/Hotmail');
        console.log('3. Yahoo Mail');
        console.log('4. Custom SMTP');
        
        const providerChoice = await question('\nEnter your choice (1-4): ');
        
        let emailUser = '';
        let emailPass = '';
        let service = 'gmail';
        
        switch(providerChoice) {
            case '1':
                service = 'gmail';
                console.log('\n📧 Gmail Setup:');
                console.log('⚠️  Important: You need a Gmail App Password, not your regular password!');
                console.log('');
                console.log('📋 Steps to get Gmail App Password:');
                console.log('1. Go to: https://myaccount.google.com/security');
                console.log('2. Enable "2-Step Verification" if not already enabled');
                console.log('3. Scroll down to "App passwords"');
                console.log('4. Generate a new app password for "Mail"');
                console.log('5. Copy the 16-character password (e.g., "abcd efgh ijkl mnop")');
                console.log('');
                break;
            case '2':
                service = 'outlook';
                console.log('\n📧 Outlook/Hotmail Setup:');
                break;
            case '3':
                service = 'yahoo';
                console.log('\n📧 Yahoo Mail Setup:');
                break;
            case '4':
                service = 'custom';
                console.log('\n📧 Custom SMTP Setup:');
                break;
            default:
                console.log('Invalid choice. Using Gmail as default.');
                service = 'gmail';
        }
        
        emailUser = await question('📧 Enter your email address: ');
        
        if (service === 'gmail') {
            emailPass = await question('🔑 Enter your Gmail App Password (16 characters): ');
        } else {
            emailPass = await question('🔑 Enter your email password: ');
        }
        
        console.log('\n🧪 Testing email configuration...');
        
        // Test the email configuration
        const transporter = nodemailer.createTransport({
            service: service === 'custom' ? undefined : service,
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });
        
        // Send test email
        console.log('📤 Sending test email...');
        
        const testMailOptions = {
            from: {
                name: 'AITM MOM System',
                address: emailUser
            },
            to: emailUser,
            subject: '✅ AITM MOM Email Setup Successful!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 20px;">
                        <h1 style="margin: 0;">🎉 Email Setup Complete!</h1>
                        <p style="margin: 10px 0 0 0;">Your AITM MOM system is ready to send notifications</p>
                    </div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                        <h2 style="color: #667eea; margin-top: 0;">✅ Configuration Successful</h2>
                        <p><strong>Email Provider:</strong> ${service.charAt(0).toUpperCase() + service.slice(1)}</p>
                        <p><strong>Email Address:</strong> ${emailUser}</p>
                        <p><strong>Status:</strong> Ready to send meeting invitations!</p>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
                        <p style="margin: 0; color: #1976d2;"><strong>🚀 What's Next:</strong></p>
                        <p style="margin: 5px 0 0 0;">Your meeting attendees will now receive beautiful email invitations automatically when meetings are scheduled!</p>
                    </div>
                </div>
            `,
            text: `
                AITM MOM Email Setup Complete!
                
                ✅ Configuration Successful
                Email Provider: ${service}
                Email Address: ${emailUser}
                Status: Ready to send meeting invitations!
                
                Your meeting attendees will now receive email invitations automatically!
            `
        };
        
        await transporter.sendMail(testMailOptions);
        
        console.log('✅ Test email sent successfully!');
        console.log(`📬 Check your inbox at ${emailUser}`);
        
        // Update .env file
        console.log('\n💾 Updating .env file...');
        
        const envPath = path.join(__dirname, '.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        // Update email configuration
        envContent = envContent.replace(/EMAIL_USER=.*/, `EMAIL_USER=${emailUser}`);
        envContent = envContent.replace(/EMAIL_PASS=.*/, `EMAIL_PASS=${emailPass}`);
        
        fs.writeFileSync(envPath, envContent);
        
        console.log('✅ .env file updated successfully!');
        console.log('\n🎉 Email setup complete!');
        console.log('\n📋 Summary:');
        console.log(`   📧 Email: ${emailUser}`);
        console.log(`   🔧 Provider: ${service}`);
        console.log(`   ✅ Status: Ready to send notifications`);
        console.log('\n🚀 Next steps:');
        console.log('   1. Restart your application: ./stop-server.sh && ./start-server.sh');
        console.log('   2. Create a meeting to test email invitations');
        console.log('   3. Check attendee emails for invitations!');
        
    } catch (error) {
        console.log('\n❌ Email setup failed!');
        console.log(`🔍 Error: ${error.message}`);
        console.log('\n💡 Troubleshooting tips:');
        
        if (error.message.includes('authentication') || error.message.includes('Username and Password not accepted')) {
            console.log('   • For Gmail: Make sure you\'re using an App Password, not your regular password');
            console.log('   • Enable 2-Factor Authentication first, then generate App Password');
            console.log('   • The App Password should be 16 characters (with or without spaces)');
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
            console.log('   • Check your internet connection');
            console.log('   • Verify the email service is accessible');
        } else {
            console.log('   • Double-check your email address and password');
            console.log('   • Try a different email provider');
        }
        
        console.log('\n🔄 You can run this setup again: node setup-email.js');
    }
    
    rl.close();
}

setupEmail();
