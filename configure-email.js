const fs = require('fs');
const readline = require('readline');
const nodemailer = require('nodemailer');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 AITM MOM Email Configuration Assistant');
console.log('=========================================');
console.log('');
console.log('📧 Your email: abhijayamon@gmail.com');
console.log('');
console.log('Now I need your Gmail App Password...');
console.log('');

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function configureEmail() {
    try {
        console.log('🔑 Please paste your Gmail App Password below:');
        console.log('   (It should be 16 characters like: abcd efgh ijkl mnop)');
        console.log('');
        
        const appPassword = await question('📝 Gmail App Password: ');
        
        // Clean up the password (remove spaces)
        const cleanPassword = appPassword.replace(/\s/g, '');
        
        console.log('');
        console.log('💾 Updating configuration...');
        
        // Update .env file
        const envPath = '.env';
        let envContent = fs.readFileSync(envPath, 'utf8');
        
        envContent = envContent.replace(
            'EMAIL_PASS=REPLACE_WITH_YOUR_GMAIL_APP_PASSWORD', 
            `EMAIL_PASS=${cleanPassword}`
        );
        
        fs.writeFileSync(envPath, envContent);
        
        console.log('✅ Configuration updated!');
        console.log('');
        console.log('🧪 Testing email configuration...');
        
        // Test the configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'abhijayamon@gmail.com',
                pass: cleanPassword
            }
        });
        
        console.log('📤 Sending test email...');
        
        const testResult = await transporter.sendMail({
            from: {
                name: 'AITM MOM System',
                address: 'abhijayamon@gmail.com'
            },
            to: 'abhijayamon@gmail.com',
            subject: '🎉 AITM MOM Email Setup Complete!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">🎉 Success!</h1>
                        <p style="margin: 10px 0 0 0; font-size: 16px;">Your AITM MOM email notifications are now working!</p>
                    </div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <h2 style="color: #4CAF50; margin-top: 0;">✅ Email Configuration Complete</h2>
                        <p><strong>📧 Email:</strong> abhijayamon@gmail.com</p>
                        <p><strong>📊 Status:</strong> Ready to send meeting invitations!</p>
                        <p><strong>🕒 Configured:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <p style="margin: 0; color: #1976d2;"><strong>🚀 What's Next:</strong></p>
                        <p style="margin: 5px 0 0 0;">Meeting attendees will now receive beautiful email invitations automatically when you schedule meetings!</p>
                    </div>
                </div>
            `,
            text: `
                AITM MOM Email Setup Complete!
                
                ✅ Email Configuration Successful
                📧 Email: abhijayamon@gmail.com
                📊 Status: Ready to send meeting invitations!
                🕒 Configured: ${new Date().toLocaleString()}
                
                Meeting attendees will now receive email invitations automatically!
            `
        });
        
        console.log('');
        console.log('🎉 SUCCESS! Email configuration is working!');
        console.log(`📧 Message ID: ${testResult.messageId}`);
        console.log('📬 Check your inbox at abhijayamon@gmail.com');
        console.log('');
        console.log('✨ Your email notifications are now ready!');
        console.log('📋 Meeting invitations will be sent automatically.');
        console.log('');
        console.log('🔄 Next step: Restart your application');
        console.log('   Run: ./stop-server.sh && ./start-server.sh');
        
    } catch (error) {
        console.log('');
        console.log('❌ Configuration failed!');
        console.log(`🔍 Error: ${error.message}`);
        console.log('');
        
        if (error.message.includes('authentication') || error.message.includes('Username and Password not accepted')) {
            console.log('💡 Common solutions:');
            console.log('   • Double-check your App Password (16 characters)');
            console.log('   • Make sure 2-Factor Authentication is enabled');
            console.log('   • Generate a new App Password if needed');
            console.log('   • Remove any spaces from the password');
        } else {
            console.log('💡 Try these solutions:');
            console.log('   • Check your internet connection');
            console.log('   • Verify the App Password is correct');
            console.log('   • Run this script again: node configure-email.js');
        }
    }
    
    rl.close();
}

configureEmail();
