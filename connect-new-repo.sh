#!/bin/bash

echo "🆕 Connect AITM MOM to New GitHub Repository"
echo "============================================="
echo ""

# Get repository details
echo "📝 Please provide your new repository details:"
echo ""
read -p "👤 Enter your GitHub username: " username
read -p "📁 Enter your new repository name (e.g., aitm-mom): " repo_name

if [ -z "$username" ] || [ -z "$repo_name" ]; then
    echo "❌ Username and repository name are required!"
    exit 1
fi

echo ""
echo "🔑 Now I need your GitHub Personal Access Token"
echo "   (If you don't have one, go to: https://github.com/settings/tokens)"
echo "   Click 'Generate new token (classic)' and select 'repo' scope"
echo ""
read -p "🔐 Enter your GitHub Personal Access Token: " token

if [ -z "$token" ]; then
    echo "❌ Personal Access Token is required!"
    exit 1
fi

echo ""
echo "🔗 Setting up repository connection..."

# Add new remote with token
git remote add origin "https://$token@github.com/$username/$repo_name.git"

echo "✅ Remote repository added!"
echo ""
echo "📤 Pushing your AITM MOM project to GitHub..."

# Push to new repository
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your AITM MOM project is now on GitHub!"
    echo ""
    echo "📱 Repository URL: https://github.com/$username/$repo_name"
    echo "🌐 You can now deploy this to any platform!"
    echo ""
    echo "🚀 Recommended next steps:"
    echo "1. Deploy to Railway: https://railway.app"
    echo "2. Deploy to Render: https://render.com" 
    echo "3. Deploy to Vercel: https://vercel.com"
    echo ""
    echo "📖 Check DEPLOYMENT_GUIDE.md for detailed deployment instructions!"
    
    # Open the repository in browser
    echo ""
    echo "🌐 Opening your new repository in browser..."
    open "https://github.com/$username/$repo_name"
    
else
    echo ""
    echo "❌ Failed to push to GitHub!"
    echo ""
    echo "💡 Common solutions:"
    echo "   • Make sure your Personal Access Token has 'repo' scope"
    echo "   • Verify your username and repository name are correct"
    echo "   • Ensure the repository exists on GitHub"
    echo "   • Check your internet connection"
    echo ""
    echo "🔄 You can run this script again: ./connect-new-repo.sh"
fi
