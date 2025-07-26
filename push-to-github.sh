#!/bin/bash

echo "🚀 Push AITM MOM to GitHub"
echo "=========================="
echo ""
echo "📋 Make sure you have created a GitHub Personal Access Token!"
echo "   Go to: https://github.com/settings/tokens"
echo "   Generate new token (classic) with 'repo' scope"
echo ""
read -p "📝 Enter your GitHub Personal Access Token: " token

if [ -z "$token" ]; then
    echo "❌ No token provided. Exiting."
    exit 1
fi

echo ""
echo "🔧 Updating remote URL with token..."
git remote set-url origin "https://$token@github.com/heyybless/AITM-MoM.git"

echo "📤 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your AITM MOM project is now on GitHub!"
    echo "📱 Repository: https://github.com/heyybless/AITM-MoM"
    echo ""
    echo "🚀 Next steps for deployment:"
    echo "1. Railway: https://railway.app (easiest)"
    echo "2. Render: https://render.com"
    echo "3. Vercel: https://vercel.com"
    echo ""
    echo "📖 Check DEPLOYMENT_GUIDE.md for detailed instructions!"
else
    echo ""
    echo "❌ Failed to push to GitHub."
    echo "💡 Please check:"
    echo "   - Token is correct and has 'repo' scope"
    echo "   - Repository exists: https://github.com/heyybless/AITM-MoM"
    echo "   - You have push access to the repository"
fi
