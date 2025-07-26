// MongoDB Database Viewer Script for AITM MOM
// Run this script with: mongosh view-database.js

// Connect to the aitm-mom database
use('aitm-mom');

console.log('🎓 AITM MOM - Database Viewer');
console.log('================================');

// Show database statistics
console.log('\n📊 DATABASE STATISTICS:');
console.log('Database Name:', db.getName());
console.log('Collections:', db.getCollectionNames());

// Show Users Collection
console.log('\n👥 USERS COLLECTION:');
console.log('Total Users:', db.users.countDocuments());

if (db.users.countDocuments() > 0) {
    console.log('\n--- User Details ---');
    db.users.find({}, {password: 0}).forEach(function(user, index) {
        console.log(`\n${index + 1}. User:`);
        console.log('   ID:', user._id);
        console.log('   Name:', user.name);
        console.log('   Email:', user.email);
        console.log('   Role:', user.role);
        if(user.department) console.log('   Department:', user.department);
        console.log('   Created:', user.createdAt);
        console.log('   Updated:', user.updatedAt);
    });
}

// Show Meetings Collection
console.log('\n📅 MEETINGS COLLECTION:');
console.log('Total Meetings:', db.meetings.countDocuments());

if (db.meetings.countDocuments() > 0) {
    console.log('\n--- Meeting Details ---');
    db.meetings.find({}).forEach(function(meeting, index) {
        console.log(`\n${index + 1}. Meeting:`);
        console.log('   ID:', meeting._id);
        console.log('   Title:', meeting.title);
        console.log('   Date:', meeting.date);
        console.log('   Time:', meeting.time);
        console.log('   Status:', meeting.status);
        console.log('   Organizer ID:', meeting.organizer);
        console.log('   Attendees Count:', meeting.attendees.length);
        console.log('   Location:', meeting.location);
        console.log('   Created:', meeting.createdAt);
    });
}

// Show collection indexes
console.log('\n🔍 COLLECTION INDEXES:');
console.log('\nUsers Indexes:');
db.users.getIndexes().forEach(function(index) {
    console.log('  -', JSON.stringify(index.key));
});

if (db.meetings.countDocuments() > 0) {
    console.log('\nMeetings Indexes:');
    db.meetings.getIndexes().forEach(function(index) {
        console.log('  -', JSON.stringify(index.key));
    });
}

console.log('\n✅ Database exploration complete!');
console.log('\n💡 Useful Commands:');
console.log('   - View all users: db.users.find({}, {password: 0})');
console.log('   - View all meetings: db.meetings.find({})');
console.log('   - Count documents: db.users.countDocuments()');
console.log('   - Exit mongosh: exit or Ctrl+C');
