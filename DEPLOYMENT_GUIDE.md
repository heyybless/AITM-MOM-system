# 🚀 AITM MOM Deployment Guide

This guide will help you deploy your AITM MOM application to various cloud platforms and make it publicly accessible.

## 📋 Pre-Deployment Checklist

### ✅ **Required Setup**
- [ ] MongoDB Atlas account (for cloud database)
- [ ] Gmail App Password configured
- [ ] GitHub account
- [ ] Code pushed to GitHub repository

### ✅ **Environment Variables Needed**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail App Password
- `PORT` - Server port (usually set by platform)
- `NODE_ENV` - Set to "production"

## 🌐 Deployment Options

### 🚀 **Option 1: Railway (Recommended - Easiest)**

Railway offers free hosting with databases and is perfect for Node.js applications.

**Steps:**
1. **Sign up**: Go to [Railway](https://railway.app) and sign up with GitHub
2. **New Project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select Repository**: Choose your AITM MOM repository
4. **Environment Variables**: Add all required environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aitm-mom
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   NODE_ENV=production
   ```
5. **Deploy**: Railway will automatically build and deploy your app
6. **Custom Domain**: Optionally add a custom domain

**✅ Pros**: Free tier, automatic deployments, includes database hosting
**❌ Cons**: Limited free tier usage

---

### 🌊 **Option 2: Render**

Render provides free web hosting with easy deployment from GitHub.

**Steps:**
1. **Sign up**: Go to [Render](https://render.com) and connect GitHub
2. **New Web Service**: Click "New" → "Web Service"
3. **Connect Repository**: Select your AITM MOM repository
4. **Configuration**:
   - **Name**: aitm-mom
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. **Environment Variables**: Add in dashboard:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-gmail-app-password
   NODE_ENV=production
   ```
6. **Deploy**: Render will build and deploy automatically

**✅ Pros**: Free tier, SSL included, custom domains
**❌ Cons**: Spins down after inactivity (free tier)

---

### ⚡ **Option 3: Vercel**

Vercel is excellent for serverless deployments.

**Steps:**
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Login**: `vercel login`
3. **Deploy**: `vercel --prod`
4. **Environment Variables**: Add via Vercel dashboard or CLI:
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASS
   ```

**✅ Pros**: Fast deployments, excellent performance, free tier
**❌ Cons**: Serverless limitations, function timeouts

---

### ☁️ **Option 4: Heroku**

Traditional cloud platform with good Node.js support.

**Steps:**
1. **Install Heroku CLI**: Download from [Heroku](https://devcenter.heroku.com/articles/heroku-cli)
2. **Login**: `heroku login`
3. **Create App**: `heroku create your-app-name`
4. **Set Environment Variables**:
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set EMAIL_USER="your-email@gmail.com"
   heroku config:set EMAIL_PASS="your-gmail-app-password"
   heroku config:set NODE_ENV="production"
   ```
5. **Deploy**: `git push heroku main`

**✅ Pros**: Mature platform, good documentation
**❌ Cons**: No free tier anymore, requires payment

## 🗄️ Database Setup (MongoDB Atlas)

### **Step 1: Create MongoDB Atlas Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (free tier available)

### **Step 2: Configure Database**
1. **Whitelist IP Addresses**: Add `0.0.0.0/0` (allow from anywhere)
2. **Create Database User**: Create username/password for your app
3. **Get Connection String**: Copy the connection string
4. **Replace placeholders**: Update username, password, and database name

Example connection string:
```
mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/aitm-mom?retryWrites=true&w=majority
```

## 📧 Email Configuration for Production

### **Gmail App Password Setup**
1. **Enable 2FA**: Go to [Google Security](https://myaccount.google.com/security)
2. **Generate App Password**: Select "Mail" and generate 16-character password
3. **Use in Environment Variables**: Use this password, not your regular Gmail password

## 🔐 Security Considerations

### **Production Security Checklist**
- [ ] Use strong, random JWT_SECRET (32+ characters)
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Enable IP whitelisting in MongoDB Atlas
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS (most platforms do this automatically)
- [ ] Regularly rotate passwords and secrets

## 📝 Quick Deployment Script

Create this script to prepare for deployment:

```bash
#!/bin/bash
echo "🚀 Preparing AITM MOM for deployment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Copy .env.example and configure it first."
    exit 1
fi

# Add all files to git
git add .

# Commit changes
echo "📝 Enter commit message:"
read commit_message
git commit -m "$commit_message"

# Push to GitHub
git push origin main

echo "✅ Code pushed to GitHub!"
echo "🌐 Now deploy using your chosen platform (Railway, Render, Vercel, etc.)"
```

## 🧪 Testing Your Deployment

### **After Deployment, Test These:**
1. **Home Page**: Visit your deployed URL
2. **User Registration**: Create a test account
3. **User Login**: Sign in with test account
4. **Meeting Creation**: Create a test meeting
5. **Email Notifications**: Check if emails are sent
6. **Database Dashboard**: Visit `/db/dashboard`

### **Common Issues & Solutions**

**"Application Error" or 500 Error:**
- Check environment variables are set correctly
- Verify MongoDB connection string
- Check application logs

**Email Not Working:**
- Verify Gmail App Password is correct
- Check EMAIL_USER and EMAIL_PASS variables
- Ensure 2FA is enabled on Gmail

**Database Connection Error:**
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user has correct permissions

## 📱 Custom Domain Setup

### **For Railway:**
1. Go to project settings
2. Add custom domain
3. Update DNS records as instructed

### **For Render:**
1. Go to service settings
2. Add custom domain
3. Update DNS CNAME record

### **For Vercel:**
1. Go to project settings
2. Add domain
3. Update DNS records

## 🔄 Continuous Deployment

Most platforms support automatic deployment when you push to GitHub:

1. **Enable Auto-Deploy**: In platform dashboard
2. **Push Changes**: `git push origin main`
3. **Automatic Build**: Platform rebuilds and deploys automatically

## 🎉 Success!

Once deployed, your AITM MOM application will be:
- ✅ **Publicly accessible** via your deployment URL
- ✅ **Secure** with HTTPS encryption
- ✅ **Scalable** on cloud infrastructure  
- ✅ **Professional** with custom domain (optional)

**Your meeting management system is now live and ready for users! 🚀**

---

**Need Help?** 
- Check platform-specific documentation
- Review application logs for errors
- Ensure all environment variables are set correctly
