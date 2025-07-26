#!/bin/bash

echo "🚀 GitHub Deployment Assistant for AITM MOM"
echo "==========================================="
echo ""

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI is installed"
    
    # Check if authenticated
    if gh auth status &> /dev/null; then
        echo "✅ Already authenticated with GitHub"
        
        # Try to push
        echo "📤 Pushing to GitHub..."
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo "🎉 Successfully pushed to GitHub!"
            echo "📱 Your repository: https://github.com/heyybless/AITM-MoM"
        else
            echo "❌ Failed to push. Trying to re-authenticate..."
            gh auth login
            git push origin main
        fi
    else
        echo "🔐 Authenticating with GitHub..."
        gh auth login
        
        echo "📤 Pushing to GitHub..."
        git push origin main
    fi
else
    echo "⚠️  GitHub CLI not installed"
    echo ""
    echo "🔧 Option 1: Install GitHub CLI (Recommended)"
    echo "   Run: brew install gh"
    echo "   Then: gh auth login"
    echo "   Finally: git push origin main"
    echo ""
    echo "🔧 Option 2: Use Personal Access Token"
    echo "   1. Go to: https://github.com/settings/tokens"
    echo "   2. Generate new token (classic)"
    echo "   3. Select 'repo' scope"
    echo "   4. Copy the token"
    echo "   5. Run: git remote set-url origin https://YOUR_TOKEN@github.com/heyybless/AITM-MoM.git"
    echo "   6. Run: git push origin main"
    echo ""
    echo "🔧 Option 3: Use SSH Keys"
    echo "   1. Generate SSH key: ssh-keygen -t ed25519 -C 'your-email@gmail.com'"
    echo "   2. Add to SSH agent: ssh-add ~/.ssh/id_ed25519"
    echo "   3. Copy public key: pbcopy < ~/.ssh/id_ed25519.pub"
    echo "   4. Add to GitHub: https://github.com/settings/keys"
    echo "   5. Change remote URL: git remote set-url origin git@github.com:heyybless/AITM-MoM.git"
    echo "   6. Run: git push origin main"
    echo ""
    
    read -p "Which option would you like to use? (1/2/3): " choice
    
    case $choice in
        1)
            if command -v brew &> /dev/null; then
                echo "📦 Installing GitHub CLI..."
                brew install gh
                echo "🔐 Authenticating..."
                gh auth login
                echo "📤 Pushing to GitHub..."
                git push origin main
            else
                echo "❌ Homebrew not installed. Please install manually:"
                echo "   Visit: https://cli.github.com/"
            fi
            ;;
        2)
            echo "🔑 Please create a Personal Access Token:"
            echo "   1. Go to: https://github.com/settings/tokens"
            echo "   2. Click 'Generate new token (classic)'"
            echo "   3. Select 'repo' scope"
            echo "   4. Copy the generated token"
            echo ""
            read -p "📝 Enter your Personal Access Token: " token
            
            if [ ! -z "$token" ]; then
                git remote set-url origin "https://$token@github.com/heyybless/AITM-MoM.git"
                echo "📤 Pushing to GitHub..."
                git push origin main
                
                if [ $? -eq 0 ]; then
                    echo "🎉 Successfully pushed to GitHub!"
                else
                    echo "❌ Failed to push. Please check your token."
                fi
            else
                echo "❌ No token provided."
            fi
            ;;
        3)
            echo "🔑 Setting up SSH keys..."
            echo "📝 Enter your email address:"
            read email
            
            if [ ! -z "$email" ]; then
                ssh-keygen -t ed25519 -C "$email"
                eval "$(ssh-agent -s)"
                ssh-add ~/.ssh/id_ed25519
                
                echo "📋 Your public key (copied to clipboard):"
                pbcopy < ~/.ssh/id_ed25519.pub
                cat ~/.ssh/id_ed25519.pub
                
                echo ""
                echo "➡️  Now add this key to GitHub:"
                echo "   1. Go to: https://github.com/settings/keys"
                echo "   2. Click 'New SSH key'"
                echo "   3. Paste the key (already copied to clipboard)"
                echo "   4. Click 'Add SSH key'"
                echo ""
                read -p "Press Enter after adding the SSH key to GitHub..."
                
                git remote set-url origin "git@github.com:heyybless/AITM-MoM.git"
                echo "📤 Pushing to GitHub..."
                git push origin main
            else
                echo "❌ No email provided."
            fi
            ;;
        *)
            echo "❌ Invalid choice."
            ;;
    esac
fi

echo ""
echo "📱 Your GitHub Repository: https://github.com/heyybless/AITM-MoM"
echo "🚀 Ready for deployment to cloud platforms!"
