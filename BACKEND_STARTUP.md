# Backend Server Startup Guide

## Quick Start

The "Failed to fetch" error occurs because the backend server is not running. Follow these steps to start it:

### Step 1: Open a New Terminal

Open a **new terminal window** (keep your frontend terminal running).

### Step 2: Navigate to the Server Directory

```bash
cd server
```

### Step 3: Install Dependencies (if not already done)

```bash
npm install
```

### Step 4: Start the Backend Server

**Option A: Development Mode (with auto-reload)**
```bash
npm run dev
```

**Option B: Production Mode**
```bash
npm start
```

### Step 5: Verify the Server is Running

You should see output like:
```
Server running on port 5000
MongoDB Connected: ac-lrs1rv0-shard-00-00.a7nwqzb.mongodb.net
```

### Step 6: Test the API

Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "ok",
  "message": "AgroEase API is running"
}
```

---

## Troubleshooting

### Issue 1: MongoDB Connection Failed

**Error:** `MongoDB connection error` or `ECONNREFUSED`

**Solutions:**
1. **Check your internet connection** - MongoDB Atlas requires internet access
2. **Test MongoDB connection:**
   ```bash
   cd server
   node test-connection.js
   ```
3. **Use a different network** - Try mobile hotspot if your network blocks MongoDB
4. **Check firewall settings** - Ensure port 27017 is not blocked

### Issue 2: Port 5000 Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
1. **Find and kill the process using port 5000:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   
   # Mac/Linux
   lsof -i :5000
   kill -9 <PID_NUMBER>
   ```
2. **Or change the port** in `server/.env`:
   ```
   PORT=5001
   ```
   Then update `src/lib/api-config.ts`:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
   ```

### Issue 3: Missing Dependencies

**Error:** `Cannot find module 'express'` or similar

**Solution:**
```bash
cd server
npm install
```

### Issue 4: Environment Variables Not Loaded

**Error:** `MONGODB_URI is not set`

**Solution:**
Ensure `server/.env` file exists with correct values:
```
PORT=5000
MONGODB_URI=mongodb://divijabajjuri7_db_user:Divi_0204@ac-lrs1rv0-shard-00-00.a7nwqzb.mongodb.net:27017,...
JWT_SECRET=agroEase_super_secret_jwt_key_2024
```

---

## Running Both Frontend and Backend

You need **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
# From project root
npm run dev
```

---

## Verifying Everything Works

1. **Backend running:** Visit `http://localhost:5000/api/health`
2. **Frontend running:** Visit `http://localhost:5173` (or your Vite port)
3. **Try login/registration** - Should work without "Failed to fetch" error

---

## Still Having Issues?

1. Check the browser console (F12) for detailed error messages
2. Check the backend terminal for server errors
3. Run the MongoDB connection test: `cd server && node test-connection.js`
4. Ensure both servers are running simultaneously
