// MongoDB Atlas Connection Setup Helper
const mongoose = require('mongoose');

async function testAtlasConnection(connectionString) {
    try {
        console.log('🔍 Testing MongoDB Atlas connection...');
        console.log('Connection string:', connectionString.replace(/\/\/.*:.*@/, '//***:***@'));
        
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000 // 10 second timeout
        });
        
        console.log('✅ Successfully connected to MongoDB Atlas!');
        
        // Test basic operations
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('📊 Available collections:', collections.map(c => c.name));
        
        // Create a test document
        const testCollection = db.collection('connectiontest');
        const testDoc = {
            message: 'AITM MOM System - Connection Test',
            timestamp: new Date(),
            status: 'success'
        };
        
        await testCollection.insertOne(testDoc);
        console.log('✅ Test document inserted successfully');
        
        // Verify the document
        const foundDoc = await testCollection.findOne({message: 'AITM MOM System - Connection Test'});
        if (foundDoc) {
            console.log('✅ Test document retrieved successfully');
            console.log('📄 Document ID:', foundDoc._id);
        }
        
        console.log('🎉 MongoDB Atlas is ready for your application!');
        
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        
        if (error.message.includes('authentication failed')) {
            console.log('💡 Check your username and password in the connection string');
        } else if (error.message.includes('timeout')) {
            console.log('💡 Check your network access settings in MongoDB Atlas');
        } else if (error.message.includes('ENOTFOUND')) {
            console.log('💡 Check your connection string format');
        }
        
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Verify username and password are correct');
        console.log('2. Check Network Access settings (allow 0.0.0.0/0)');
        console.log('3. Ensure cluster is active and running');
        console.log('4. Wait a few minutes if cluster was just created');
    } finally {
        await mongoose.connection.close();
        console.log('📡 Connection closed');
    }
}

// Usage instructions
if (process.argv.length < 3) {
    console.log('🚀 MongoDB Atlas Connection Tester');
    console.log('=====================================');
    console.log('');
    console.log('Usage: node setup-atlas-connection.js "YOUR_CONNECTION_STRING"');
    console.log('');
    console.log('Example:');
    console.log('node setup-atlas-connection.js "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/aitm-mom"');
    console.log('');
    console.log('📝 Steps to get your connection string:');
    console.log('1. Go to MongoDB Atlas dashboard');
    console.log('2. Click "Connect" on your cluster');
    console.log('3. Choose "Connect your application"');
    console.log('4. Copy the connection string');
    console.log('5. Replace <password> with your database password');
    console.log('6. Replace <dbname> with "aitm-mom"');
} else {
    const connectionString = process.argv[2];
    testAtlasConnection(connectionString);
}

module.exports = { testAtlasConnection };
