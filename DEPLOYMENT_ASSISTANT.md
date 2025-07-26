# 🚀 AITM MOM Deployment Assistant

## 📋 **Step-by-Step Deployment Guide**

You now have **two browser tabs open**:
1. **Railway** (https://railway.app) - For hosting your application
2. **MongoDB Atlas** (https://www.mongodb.com/cloud/atlas) - For your database

Let's deploy your application step by step!

---

## 🗄️ **STEP 1: Set Up MongoDB Atlas (Database)**

### **In the MongoDB Atlas tab:**

1. **Sign Up/Login**
   - Click "Try Free" or "Sign In"
   - Use your Google account or create new account

2. **Create a Cluster**
   - Choose **"M0 Sandbox"** (FREE tier)
   - Select **AWS** as provider
   - Choose **region closest to you**
   - Name your cluster: `aitm-mom-cluster`
   - Click **"Create Cluster"**

3. **Set Up Database Access**
   - Go to **"Database Access"** in left sidebar
   - Click **"Add New Database User"**
   - **Username**: `aitm-user`
   - **Password**: Generate a secure password (save it!)
   - **Role**: `Atlas admin`
   - Click **"Add User"**

4. **Set Up Network Access**
   - Go to **"Network Access"** in left sidebar
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**

5. **Get Connection String**
   - Go to **"Database"** in left sidebar
   - Click **"Connect"** on your cluster
   - Choose **"Connect your application"**
   - Copy the connection string (looks like):
   ```
   mongodb+srv://aitm-user:<password>@aitm-mom-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - **Replace `<password>`** with your actual password
   - **Add database name** at the end: `/aitm-mom`

### **Your final connection string should look like:**
```
mongodb+srv://aitm-user:YOUR_PASSWORD@aitm-mom-cluster.xxxxx.mongodb.net/aitm-mom?retryWrites=true&w=majority
```

---

## 🚀 **STEP 2: Deploy to Railway**

### **In the Railway tab:**

1. **Sign Up with GitHub**
   - Click **"Login with GitHub"**
   - Authorize Railway to access your repositories

2. **Create New Project**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your repository: **`AITM-MOM-system`**

3. **Configure Environment Variables**
   Railway will start building. While it builds, set up environment variables:
   - Click on your project
   - Go to **"Variables"** tab
   - Add these variables:

   ```
   MONGODB_URI=mongodb+srv://aitm-user:YOUR_PASSWORD@aitm-mom-cluster.xxxxx.mongodb.net/aitm-mom?retryWrites=true&w=majority
   
   JWT_SECRET=super-secret-jwt-key-for-production-change-this-to-something-random-and-long
   
   EMAIL_USER=abhijayamon@gmail.com
   
   EMAIL_PASS=hzewdeffjytjmqaa
   
   NODE_ENV=production
   
   PORT=3000
   ```

4. **Deploy and Test**
   - Railway will automatically build and deploy
   - Once deployed, you'll get a URL like: `https://your-app-name.railway.app`
   - Click the URL to test your application

---

## ✅ **STEP 3: Verify Deployment**

### **Test these features:**

1. **Home Page** - Should load without errors
2. **User Registration** - Create a test account
3. **User Login** - Sign in with test account
4. **Create Meeting** - Test meeting creation
5. **Email Notifications** - Check if emails are sent
6. **Database Dashboard** - Visit `/db/dashboard`

---

## 🎯 **Environment Variables Explained**

| Variable | Purpose | Your Value |
|----------|---------|------------|
| `MONGODB_URI` | Database connection | Your Atlas connection string |
| `JWT_SECRET` | Security for login tokens | Random long string |
| `EMAIL_USER` | Your Gmail address | abhijayamon@gmail.com |
| `EMAIL_PASS` | Gmail App Password | Your 16-character password |
| `NODE_ENV` | Production mode | production |
| `PORT` | Server port | 3000 |

---

## 🔧 **Common Issues & Solutions**

### **"Application Error" on Railway:**
- Check the logs in Railway dashboard
- Verify all environment variables are set
- Make sure MongoDB connection string is correct

### **Database Connection Failed:**
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check username/password in connection string
- Ensure database user has correct permissions

### **Emails Not Working:**
- Verify Gmail App Password is correct
- Check EMAIL_USER and EMAIL_PASS variables
- Test with a simple meeting creation

---

## 🎉 **Success Checklist**

Once deployed successfully, you should have:

- ✅ **Live URL** from Railway
- ✅ **Database** connected and working
- ✅ **User registration/login** functioning
- ✅ **Meeting creation** working
- ✅ **Email notifications** sending
- ✅ **Professional application** running in production

---

## 📱 **Next Steps After Deployment**

1. **Custom Domain** (Optional)
   - In Railway, go to Settings → Domains
   - Add your custom domain

2. **Share Your Application**
   - Add the live URL to your GitHub repository
   - Share with colleagues and friends
   - Add to your portfolio

3. **Monitor and Maintain**
   - Check Railway logs for any issues
   - Monitor MongoDB Atlas usage
   - Keep environment variables secure

---

## 🆘 **Need Help?**

If you encounter any issues:

1. **Check Railway Logs**
   - Go to your Railway project
   - Click "View Logs" to see error messages

2. **Verify Environment Variables**
   - Make sure all 6 variables are set correctly
   - No extra spaces or quotes

3. **Test Database Connection**
   - Use MongoDB Compass to test your connection string
   - Verify your IP is whitelisted

4. **Email Issues**
   - Double-check your Gmail App Password
   - Ensure 2FA is enabled on Gmail

---

**Your AITM MOM application will be live and accessible to the world! 🌟**
