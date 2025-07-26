#!/bin/bash

# AITM MOM Development Setup Script
# This script helps set up the development environment

echo "🚀 AITM MOM Development Setup"
echo "==============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongosh &> /dev/null; then
    echo "📦 Installing MongoDB..."
    if command -v brew &> /dev/null; then
        brew tap mongodb/brew
        brew install mongodb-community
    else
        echo "❌ Homebrew not found. Please install MongoDB manually."
        exit 1
    fi
fi

# Install npm dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Start MongoDB service
echo "🗄️ Starting MongoDB service..."
brew services start mongodb/brew/mongodb-community

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️ Creating .env file from template..."
    cp .env.example .env
    echo "📝 Please update the .env file with your actual credentials:"
    echo "   - EMAIL_USER: Your Gmail address"
    echo "   - EMAIL_PASS: Your Gmail app password"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update your .env file with Gmail credentials"
echo "2. Run: npm start"
echo "3. Open: http://localhost:3000"
echo ""
echo "📊 MongoDB Commands:"
echo "   mongosh aitm-mom           # Connect to database"
echo "   show collections           # View collections"
echo "   db.users.find().pretty()   # View users"
echo ""
echo "🚀 Your application is ready for development!"
