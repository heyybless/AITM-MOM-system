const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Meeting = require('./models/Meeting');

async function exportDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');
        
        // Get all data
        const users = await User.find().select('-password');
        const meetings = await Meeting.find().populate('organizer', 'name email').populate('attendees', 'name email role');
        
        // Create export directory
        if (!fs.existsSync('./exports')) {
            fs.mkdirSync('./exports');
        }
        
        // Export users
        fs.writeFileSync('./exports/users.json', JSON.stringify(users, null, 2));
        console.log(`📄 Exported ${users.length} users to ./exports/users.json`);
        
        // Export meetings
        fs.writeFileSync('./exports/meetings.json', JSON.stringify(meetings, null, 2));
        console.log(`📅 Exported ${meetings.length} meetings to ./exports/meetings.json`);
        
        // Create summary
        const summary = {
            exportDate: new Date().toISOString(),
            totalUsers: users.length,
            totalMeetings: meetings.length,
            usersByRole: {
                administrators: users.filter(u => u.role === 'administrator').length,
                principals: users.filter(u => u.role === 'principal').length,
                hods: users.filter(u => u.role === 'hod').length,
                faculty: users.filter(u => u.role === 'faculty').length
            },
            meetingsByStatus: {
                scheduled: meetings.filter(m => m.status === 'scheduled').length,
                completed: meetings.filter(m => m.status === 'completed').length,
                cancelled: meetings.filter(m => m.status === 'cancelled').length
            }
        };
        
        fs.writeFileSync('./exports/summary.json', JSON.stringify(summary, null, 2));
        console.log('📊 Exported database summary to ./exports/summary.json');
        
        console.log('\n✅ Database export completed successfully!');
        console.log('📁 Files created in ./exports/ directory:');
        console.log('   - users.json (User data)');
        console.log('   - meetings.json (Meeting data)');
        console.log('   - summary.json (Database statistics)');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
}

// Run the export
exportDatabase();
