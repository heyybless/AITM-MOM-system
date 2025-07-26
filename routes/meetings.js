const express = require('express');
const Meeting = require('../models/Meeting');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email configuration (you'll need to configure this with your email service)
let transporter = null;

try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && 
        process.env.EMAIL_USER !== 'your_gmail_address@gmail.com') {
        transporter = nodemailer.createTransport({
            service: 'gmail', // or your email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        console.log('📧 Email service configured successfully');
    } else {
        console.log('📧 Email service not configured - update EMAIL_USER and EMAIL_PASS in .env file');
    }
} catch (emailError) {
    console.error('📧 Email configuration error:', emailError.message);
}

// Create a new meeting
router.post('/create', async (req, res) => {
    try {
        const { title, agenda, date, time, duration, organizerId, attendeeIds, location } = req.body;

        // Create meeting
        const meeting = new Meeting({
            title,
            agenda,
            date: new Date(date),
            time,
            duration,
            organizer: organizerId,
            attendees: attendeeIds.map(id => ({ user: id })),
            location
        });

        await meeting.save();

        // Populate organizer and attendees for email
        await meeting.populate('organizer attendees.user');

        // Send email notifications to attendees (if email is configured)
        let emailStatus = 'Email not configured';
        if (transporter) {
            try {
                const attendeeEmails = meeting.attendees.map(attendee => attendee.user.email);
                
                // Enhanced email template
                const emailTemplate = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Meeting Invitation</title>
                        <style>
                            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f4f4f4; }
                            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                            .header h1 { margin: 0; font-size: 24px; }
                            .content { padding: 30px; }
                            .meeting-details { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
                            .detail-row { display: flex; margin-bottom: 10px; }
                            .detail-label { font-weight: bold; color: #667eea; min-width: 100px; }
                            .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
                            .btn { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 25px; margin: 10px; }
                            .highlight { color: #667eea; font-weight: bold; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>📅 Meeting Invitation</h1>
                                <p>You are cordially invited to attend</p>
                            </div>
                            <div class="content">
                                <h2 style="color: #667eea; margin-top: 0;">${title}</h2>
                                
                                <div class="meeting-details">
                                    <div class="detail-row">
                                        <span class="detail-label">📋 Agenda:</span>
                                        <span>${agenda}</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="detail-label">📅 Date:</span>
                                        <span class="highlight">${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="detail-label">⏰ Time:</span>
                                        <span class="highlight">${time}</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="detail-label">⏱️ Duration:</span>
                                        <span>${duration || 60} minutes</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="detail-label">📍 Location:</span>
                                        <span>${location}</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="detail-label">👤 Organizer:</span>
                                        <span>${meeting.organizer.name} (${meeting.organizer.role})</span>
                                    </div>
                                </div>
                                
                                <div style="text-align: center; margin: 30px 0;">
                                    <p><strong>📝 Please mark your calendar and prepare for the meeting.</strong></p>
                                    <p>If you have any questions, please contact the organizer.</p>
                                </div>
                            </div>
                            <div class="footer">
                                <p>📧 This invitation was sent from <strong>AITM MOM</strong> (Minutes of Meeting Management System)</p>
                                <p>🎓 Academic Institute of Technology and Management</p>
                                <p><em>Sent on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</em></p>
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
                    to: attendeeEmails,
                    subject: `📅 Meeting Invitation: ${title} - ${new Date(date).toLocaleDateString()}`,
                    html: emailTemplate,
                    // Also include plain text version for compatibility
                    text: `
                        MEETING INVITATION
                        
                        Title: ${title}
                        Agenda: ${agenda}
                        Date: ${new Date(date).toLocaleDateString()}
                        Time: ${time}
                        Duration: ${duration || 60} minutes
                        Location: ${location}
                        Organizer: ${meeting.organizer.name} (${meeting.organizer.role})
                        
                        Please mark your calendar and prepare for the meeting.
                        
                        This invitation was sent from AITM MOM System.
                    `
                };

                await transporter.sendMail(mailOptions);
                emailStatus = `Invitations sent successfully to ${attendeeEmails.length} attendees`;
                console.log(`📧 Meeting invitation emails sent to: ${attendeeEmails.join(', ')}`);
                
            } catch (emailError) {
                console.error('📧 Failed to send meeting invitations:', emailError.message);
                emailStatus = `Failed to send invitations: ${emailError.message}`;
            }
        }

        res.status(201).json({
            message: 'Meeting created successfully',
            meeting,
            emailStatus,
            attendeeCount: meeting.attendees.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating meeting' });
    }
});

// Get meetings for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const meetings = await Meeting.find({
            $or: [
                { organizer: userId },
                { 'attendees.user': userId }
            ]
        })
        .populate('organizer', 'name email role')
        .populate('attendees.user', 'name email role')
        .sort({ date: 1 });

        res.json(meetings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching meetings' });
    }
});

// Update meeting status and add meeting notes
router.put('/:meetingId/notes', async (req, res) => {
    try {
        const { meetingId } = req.params;
        const { discussionSummary, decisionsMade, actionItems } = req.body;

        const meeting = await Meeting.findByIdAndUpdate(
            meetingId,
            {
                status: 'completed',
                meetingNotes: {
                    discussionSummary,
                    decisionsMade,
                    actionItems
                }
            },
            { new: true }
        ).populate('organizer attendees.user');

        // Send meeting report to all attendees (if email is configured)
        let emailStatus = 'Email not configured';
        if (transporter) {
            try {
                const attendeeEmails = meeting.attendees.map(attendee => attendee.user.email);
                
                const reportHtml = `
                    <h2>Meeting Report: ${meeting.title}</h2>
                    <p><strong>Date:</strong> ${meeting.date.toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${meeting.time}</p>
                    
                    <h3>Discussion Summary</h3>
                    <p>${discussionSummary}</p>
                    
                    <h3>Decisions Made</h3>
                    <ul>
                        ${decisionsMade.map(decision => `<li>${decision}</li>`).join('')}
                    </ul>
                    
                    <h3>Action Items</h3>
                    <ul>
                        ${actionItems.map(item => `<li>${item.item} - Assigned to: ${item.assignedTo ? 'TBD' : 'TBD'}</li>`).join('')}
                    </ul>
                `;

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: attendeeEmails,
                    subject: `Meeting Report: ${meeting.title}`,
                    html: reportHtml
                };

                await transporter.sendMail(mailOptions);
                emailStatus = 'Meeting report sent successfully';
            } catch (emailError) {
                console.error('📧 Failed to send meeting report:', emailError.message);
                emailStatus = 'Failed to send meeting report';
            }
        }

        res.json({
            message: 'Meeting notes saved and report sent',
            meeting
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating meeting notes' });
    }
});

// Get eligible attendees based on organizer role
router.get('/eligible-attendees/:organizerId', async (req, res) => {
    try {
        const { organizerId } = req.params;
        const organizer = await User.findById(organizerId);

        let eligibleUsers = [];

        switch (organizer.role) {
            case 'administrator':
                // Administrator can invite principals
                eligibleUsers = await User.find({ role: 'principal' }).select('-password');
                break;
            case 'principal':
                // Principal can invite HODs
                eligibleUsers = await User.find({ role: 'hod' }).select('-password');
                break;
            case 'hod':
                // HOD can invite faculty from same department
                eligibleUsers = await User.find({ 
                    role: 'faculty', 
                    department: organizer.department 
                }).select('-password');
                break;
            default:
                eligibleUsers = [];
        }

        res.json(eligibleUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching eligible attendees' });
    }
});

module.exports = router;
