# MongoDB Atlas Setup for Permanent Deployment

## 🌐 Setting up MongoDB Atlas (Free Cloud Database)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Verify your email address

### Step 2: Create a Free Cluster
1. Choose "Create a cluster"
2. Select "M0 Sandbox" (Free tier)
3. Choose a cloud provider (AWS recommended)
4. Select a region close to your users
5. Click "Create Cluster"

### Step 3: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username: `aitm-admin`
5. Generate a secure password (save it!)
6. Set role to "Atlas admin"
7. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Databases" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `aitm-mom`

Example connection string:
```
mongodb+srv://aitm-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aitm-mom?retryWrites=true&w=majority
```

### Step 6: Update Railway Environment Variables
Run this command with your actual connection string:

```bash
railway variables --set "MONGODB_URI=mongodb+srv://aitm-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aitm-mom?retryWrites=true&w=majority"
```

### Step 7: Redeploy Your Application
```bash
railway redeploy
```

## ✅ Verification

After setup, your application will:
- ✅ Run 24/7 on Railway
- ✅ Use MongoDB Atlas cloud database
- ✅ Send emails via Gmail
- ✅ Be accessible to anyone worldwide

## 🚀 Your Live Application
- **URL**: https://aitm-mom-system-production.up.railway.app
- **Status**: Permanent deployment
- **Database**: MongoDB Atlas (Cloud)
- **Email**: Gmail integration

## 📞 Support
If you need help:
1. Check Railway logs: `railway logs`
2. Check environment variables: `railway variables`
3. Test local connection: `mongosh "YOUR_CONNECTION_STRING"`
