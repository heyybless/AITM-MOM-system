const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Meeting = require('./models/Meeting');

async function viewDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        console.log('🗄️ AITM MOM DATABASE VIEWER');
        console.log('='.repeat(50));
        
        // Get all users
        const users = await User.find().select('-password');
        console.log(`\n👥 USERS (${users.length} total):`);
        console.log('-'.repeat(30));
        
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name}`);
            console.log(`   📧 Email: ${user.email}`);
            console.log(`   👤 Role: ${user.role}`);
            if (user.department) console.log(`   🏢 Department: ${user.department}`);
            console.log(`   📅 Created: ${user.createdAt.toLocaleDateString()}`);
            console.log(`   ✅ Verified: ${user.isVerified ? 'Yes' : 'No'}`);
            console.log('');
        });
        
        // Get all meetings
        const meetings = await Meeting.find().populate('organizer', 'name email').populate('attendees', 'name email role');
        console.log(`📅 MEETINGS (${meetings.length} total):`);
        console.log('-'.repeat(30));
        
        meetings.forEach((meeting, index) => {
            console.log(`${index + 1}. ${meeting.title}`);
            console.log(`   📝 Agenda: ${meeting.agenda}`);
            console.log(`   📅 Date: ${meeting.date.toLocaleDateString()}`);
            console.log(`   ⏰ Duration: ${meeting.duration} minutes`);
            console.log(`   📍 Location: ${meeting.location}`);
            console.log(`   📊 Status: ${meeting.status}`);
            
            if (meeting.organizer) {
                console.log(`   👤 Organizer: ${meeting.organizer.name} (${meeting.organizer.email})`);
            }
            
            console.log(`   👥 Attendees (${meeting.attendees.length}):`);
            meeting.attendees.forEach((attendee, i) => {
                console.log(`      ${i + 1}. ${attendee.name} - ${attendee.role} (${attendee.email})`);
            });
            
            if (meeting.notes) {
                console.log(`   📋 Notes:`);
                if (meeting.notes.discussion) console.log(`      Discussion: ${meeting.notes.discussion}`);
                if (meeting.notes.decisions) console.log(`      Decisions: ${meeting.notes.decisions}`);
                if (meeting.notes.actionItems) console.log(`      Action Items: ${meeting.notes.actionItems}`);
            }
            
            console.log(`   📅 Created: ${meeting.createdAt.toLocaleDateString()}`);
            console.log('');
        });
        
        // Database statistics
        console.log('📊 DATABASE STATISTICS:');
        console.log('-'.repeat(30));
        console.log(`Total Users: ${users.length}`);
        console.log(`Total Meetings: ${meetings.length}`);
        console.log(`Administrators: ${users.filter(u => u.role === 'administrator').length}`);
        console.log(`Principals: ${users.filter(u => u.role === 'principal').length}`);
        console.log(`HODs: ${users.filter(u => u.role === 'hod').length}`);
        console.log(`Faculty: ${users.filter(u => u.role === 'faculty').length}`);
        console.log(`Scheduled Meetings: ${meetings.filter(m => m.status === 'scheduled').length}`);
        console.log(`Completed Meetings: ${meetings.filter(m => m.status === 'completed').length}`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
    }
}

// Run the viewer
viewDatabase();
