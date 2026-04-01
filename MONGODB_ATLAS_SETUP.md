# MongoDB Atlas Setup Guide (Free Tier)

Follow these steps to set up MongoDB Atlas for your AgroEase project:

## Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** button
3. Create an account using:
   - Email address
   - Password (min 10 characters)
4. Verify your email

## Step 2: Create Free Cluster

1. After login, click **"Create a Deployment"**
2. Select **"Free"** (M0 Sandbox) tier
3. Choose a cloud provider:
   - **Google Cloud** (recommended) or AWS
4. Select region closest to you (e.g., Mumbai - `ap-south-1`)
5. Click **"Create Deployment"**
6. Wait 1-2 minutes for deployment

## Step 3: Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Create credentials:
   - **Username**: `agroEase` (or any name)
   - **Password**: `agroEase123` (remember this!)
4. Under **"Database User Privileges"**, select **"Read and Write to any database"**
5. Click **"Add User"**

## Step 4: Network Access (Allow All)

1. In left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**
5. Wait 2-3 minutes for activation

## Step 5: Get Connection String

1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Select **"Drivers"**
4. Copy the connection string:
```
mongodb+srv://agroEase:agroEase123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Note**: Replace `agroEase` and `agroEase123` with your actual username and password from Step 3.

## Step 6: Update Server Configuration

Open `server/.env` and update the MongoDB URI:

```env
PORT=5000
NODE_ENV=development

# Replace with your Atlas connection string
MONGODB_URI=mongodb+srv://agroEase:agroEase123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

JWT_SECRET=agroEase_super_secret_jwt_key_2024
JWT_EXPIRE=30d
```

**Important**: Replace:
- `agroEase` → your database username
- `agroEase123` → your database password
- `cluster0.xxxxx` → your actual cluster name

## Step 7: Run the Backend

```bash
cd server
npm install
npm run dev
```

If successful, you'll see:
```
Connected to MongoDB
Server running on port 5000
```

## Step 8: Seed Sample Data

Open a new terminal and run:

```bash
cd server
npm run seed
```

This will populate your database with sample machines, schemes, FAQs, etc.

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection timeout | Wait 2-3 mins after creating cluster |
| Authentication failed | Check username/password in URI |
| Network error | Add 0.0.0.0/0 in Network Access |
| Cluster not ready | Wait 1-2 minutes after creation |

## Your Connection Info

Once you create your Atlas account and cluster, update this:

```
Cluster Name: ________________
Database Username: ________________
Database Password: ________________
Connection String: mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority
```

Copy this string to `server/.env` and you're ready to go!
