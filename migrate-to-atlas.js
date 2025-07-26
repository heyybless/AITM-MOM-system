// Data Migration Script: Local MongoDB to Atlas
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Meeting = require('./models/Meeting');

async function migrateToAtlas(atlasConnectionString) {
    console.log('🚀 AITM MOM Data Migration');
    console.log('==========================');
    console.log('From: Local MongoDB');
    console.log('To: MongoDB Atlas');
    console.log('');

    try {
        // Connect to local MongoDB first
        console.log('📡 Connecting to local MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to local database');

        // Get all data from local database
        console.log('📊 Fetching data from local database...');
        const localUsers = await User.find().lean();
        const localMeetings = await Meeting.find().lean();
        
        console.log(`📄 Found ${localUsers.length} users`);
        console.log(`📅 Found ${localMeetings.length} meetings`);

        // Close local connection
        await mongoose.connection.close();
        console.log('📡 Disconnected from local database');

        // Connect to Atlas
        console.log('🌐 Connecting to MongoDB Atlas...');
        await mongoose.connect(atlasConnectionString);
        console.log('✅ Connected to Atlas database');

        // Check if data already exists
        const existingUsers = await User.countDocuments();
        const existingMeetings = await Meeting.countDocuments();
        
        console.log(`📊 Atlas database status:`);
        console.log(`   Users: ${existingUsers}`);
        console.log(`   Meetings: ${existingMeetings}`);

        if (existingUsers > 0 || existingMeetings > 0) {
            console.log('⚠️  Atlas database already contains data.');
            console.log('   Migration will add to existing data (no duplicates created)');
        }

        // Migrate users
        if (localUsers.length > 0) {
            console.log('👥 Migrating users...');
            let userCount = 0;
            
            for (const userData of localUsers) {
                // Check if user already exists (by email)
                const existingUser = await User.findOne({ email: userData.email });
                
                if (!existingUser) {
                    // Remove _id to let MongoDB generate a new one
                    delete userData._id;
                    const newUser = new User(userData);
                    await newUser.save();
                    userCount++;
                    console.log(`   ✅ Migrated user: ${userData.name} (${userData.email})`);
                } else {
                    console.log(`   ⏭️  User already exists: ${userData.name} (${userData.email})`);
                }
            }
            console.log(`📄 Migrated ${userCount} new users`);
        }

        // Migrate meetings
        if (localMeetings.length > 0) {
            console.log('📅 Migrating meetings...');
            let meetingCount = 0;
            
            for (const meetingData of localMeetings) {
                // Check if meeting already exists (by title and date)
                const existingMeeting = await Meeting.findOne({ 
                    title: meetingData.title,
                    date: meetingData.date 
                });
                
                if (!existingMeeting) {
                    // Remove _id to let MongoDB generate a new one
                    delete meetingData._id;
                    const newMeeting = new Meeting(meetingData);
                    await newMeeting.save();
                    meetingCount++;
                    console.log(`   ✅ Migrated meeting: ${meetingData.title}`);
                } else {
                    console.log(`   ⏭️  Meeting already exists: ${meetingData.title}`);
                }
            }
            console.log(`📅 Migrated ${meetingCount} new meetings`);
        }

        // Final verification
        const finalUsers = await User.countDocuments();
        const finalMeetings = await Meeting.countDocuments();
        
        console.log('');
        console.log('🎉 Migration completed successfully!');
        console.log('==================================');
        console.log(`📊 Final Atlas database status:`);
        console.log(`   Users: ${finalUsers}`);
        console.log(`   Meetings: ${finalMeetings}`);
        console.log('');
        console.log('✅ Your data is now available in MongoDB Atlas');
        console.log('🌐 Ready for production deployment!');

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        
        if (error.message.includes('authentication failed')) {
            console.log('💡 Check your Atlas username and password');
        } else if (error.message.includes('timeout')) {
            console.log('💡 Check your Atlas network access settings');
        }
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
            console.log('📡 Database connection closed');
        }
    }
}

// Usage instructions
if (process.argv.length < 3) {
    console.log('🚀 AITM MOM Data Migration Tool');
    console.log('===============================');
    console.log('');
    console.log('This script migrates your local data to MongoDB Atlas');
    console.log('');
    console.log('Usage: node migrate-to-atlas.js "ATLAS_CONNECTION_STRING"');
    console.log('');
    console.log('Example:');
    console.log('node migrate-to-atlas.js "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/aitm-mom"');
    console.log('');
    console.log('⚠️  Make sure to:');
    console.log('1. Test the connection first with setup-atlas-connection.js');
    console.log('2. Have your local MongoDB running');
    console.log('3. Backup your local data (run export-database.js)');
} else {
    const atlasConnectionString = process.argv[2];
    migrateToAtlas(atlasConnectionString);
}

module.exports = { migrateToAtlas };
