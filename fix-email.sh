#!/bin/bash

echo "📧 AITM MOM Email Setup Fix"
echo "=========================="
echo ""

# Check if email is already configured
if grep -q "demo@gmail.com" .env; then
    echo "⚠️  Email not configured yet!"
    echo ""
    echo "🔧 Choose your setup method:"
    echo ""
    echo "1. 🎯 Interactive Setup (Recommended)"
    echo "   Run: node setup-email.js"
    echo ""
    echo "2. ✏️  Manual .env Edit"
    echo "   Edit .env file and update EMAIL_USER and EMAIL_PASS"
    echo ""
    echo "3. 📝 Quick File Edit"
    echo "   Edit quick-email-setup.js and run it"
    echo ""
    echo "4. 🔍 Test Current Setup"
    echo "   Run: node test-email-feature.js"
    echo ""
    
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            echo "🚀 Starting interactive setup..."
            node setup-email.js
            ;;
        2)
            echo "📝 Opening .env file for editing..."
            echo "💡 Update EMAIL_USER and EMAIL_PASS with your credentials"
            if command -v nano &> /dev/null; then
                nano .env
            elif command -v vim &> /dev/null; then
                vim .env
            else
                echo "Please edit .env file manually"
                cat .env
            fi
            ;;
        3)
            echo "📝 Opening setup file for editing..."
            echo "💡 Replace the placeholder values with your actual credentials"
            if command -v nano &> /dev/null; then
                nano quick-email-setup.js
            elif command -v vim &> /dev/null; then
                vim quick-email-setup.js  
            else
                echo "Please edit quick-email-setup.js manually"
            fi
            echo "After editing, run: node quick-email-setup.js"
            ;;
        4)
            echo "🧪 Testing current email configuration..."
            node test-email-feature.js
            ;;
        *)
            echo "Invalid choice. Run ./fix-email.sh again"
            ;;
    esac
else
    echo "✅ Email appears to be configured!"
    echo "🧪 Testing configuration..."
    node test-email-feature.js
fi
