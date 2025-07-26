const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

console.log('📧 AITM MOM Email Feature Test');
console.log('='.repeat(40));

async function testEmailFeature() {
    console.log('🔍 Checking email configuration...');
    
    // Check environment variables
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'demo@gmail.com') {
        console.log('❌ EMAIL_USER not configured properly');
        console.log('💡 Please update EMAIL_USER in .env file with your actual email');
        return;
    }
    
    if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'demo_password') {
        console.log('❌ EMAIL_PASS not configured properly');
        console.log('💡 Please update EMAIL_PASS in .env file with your app password');
        return;
    }
    
    console.log(`✅ EMAIL_USER configured: ${process.env.EMAIL_USER}`);
    console.log('✅ EMAIL_PASS configured: [hidden]');
    
    try {
        console.log('🔧 Creating email transporter...');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        console.log('📤 Sending test email...');
        
        // Create a sample meeting invitation email
        const testEmailTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Meeting Invitation Test</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
                    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                    .header h1 { margin: 0; font-size: 24px; }
                    .content { padding: 30px; }
                    .meeting-details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
                    .detail-row { display: flex; margin-bottom: 10px; }
                    .detail-label { font-weight: bold; color: #667eea; min-width: 100px; }
                    .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
                    .highlight { color: #667eea; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>📧 Email Test Successful!</h1>
                        <p>Your AITM MOM email feature is working perfectly</p>
                    </div>
                    <div class="content">
                        <h2 style="color: #667eea; margin-top: 0;">Test Meeting Invitation</h2>
                        
                        <div class="meeting-details">
                            <div class="detail-row">
                                <span class="detail-label">📋 Agenda:</span>
                                <span>Test email notification system</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">📅 Date:</span>
                                <span class="highlight">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">⏰ Time:</span>
                                <span class="highlight">${new Date().toLocaleTimeString()}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">📍 Location:</span>
                                <span>Email Testing Suite</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">👤 Organizer:</span>
                                <span>AITM MOM System (Automated Test)</span>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <p><strong>🎉 Congratulations! Your email notification feature is ready to use.</strong></p>
                            <p>Attendees will now receive beautiful meeting invitations like this one.</p>
                        </div>
                    </div>
                    <div class="footer">
                        <p>📧 This test email was sent from <strong>AITM MOM</strong> (Minutes of Meeting Management System)</p>
                        <p>🎓 Academic Institute of Technology and Management</p>
                        <p><em>Test completed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</em></p>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        const mailOptions = {
            from: {
                name: 'AITM MOM System',
                address: process.env.EMAIL_USER
            },
            to: process.env.EMAIL_USER, // Send to yourself for testing
            subject: '🧪 AITM MOM Email Feature Test - Success!',
            html: testEmailTemplate,
            text: `
                AITM MOM EMAIL TEST
                
                ✅ Email configuration is working correctly!
                
                Your meeting invitation system is ready to send:
                - Beautiful HTML formatted emails
                - Professional meeting details
                - Automatic notifications to attendees
                
                Test completed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
                
                This test email was sent from AITM MOM System.
            `
        };
        
        const result = await transporter.sendMail(mailOptions);
        
        console.log('✅ Test email sent successfully!');
        console.log(`📧 Message ID: ${result.messageId}`);
        console.log(`📬 Email sent to: ${process.env.EMAIL_USER}`);
        console.log('');
        console.log('🎉 Email feature is working perfectly!');
        console.log('📱 Check your email inbox for the test message');
        console.log('✨ Your meeting invitations will now be sent automatically');
        
    } catch (error) {
        console.log('❌ Email test failed!');
        console.log('🔍 Error details:', error.message);
        console.log('');
        console.log('💡 Common solutions:');
        
        if (error.message.includes('authentication')) {
            console.log('   - Enable 2-Factor Authentication on Gmail');
            console.log('   - Generate and use an App Password');
            console.log('   - Double-check EMAIL_USER and EMAIL_PASS');
        } else if (error.message.includes('ENOTFOUND')) {
            console.log('   - Check your internet connection');
            console.log('   - Verify Gmail service is accessible');
        } else {
            console.log('   - Review EMAIL_SETUP_GUIDE.md for detailed instructions');
            console.log('   - Ensure all environment variables are correct');
        }
    }
}

// Run the test
testEmailFeature().then(() => {
    console.log('\n🏁 Email feature test completed');
}).catch(console.error);
