# AgroEase - Farm Machinery Booking System

A comprehensive agricultural platform for farmers to book machinery, access government schemes, get fertilizer recommendations, and identify crop diseases.

## ⚠️ IMPORTANT: Fix "Failed to fetch" Error

If you're getting a **"Failed to fetch"** error when trying to login or register, it means the backend server is not running.

### Quick Fix:

**Option 1: Use the startup script (Recommended)**
```bash
# Windows
start-servers.bat

# Mac/Linux
chmod +x start-servers.sh
./start-servers.sh
```

**Option 2: Manual startup**
```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
npm run dev
```

**Option 3: Detailed guide**
See [BACKEND_STARTUP.md](BACKEND_STARTUP.md) for comprehensive troubleshooting.

---

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication

## Project Structure

```
farming-weather-voice/
├── src/
│   ├── components/       # React components
│   │   ├── MachineryRental.tsx
│   │   ├── BookingModal.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Weather.tsx
│   │   ├── GovernmentSchemes.tsx
│   │   ├── DiseaseDetection.tsx
│   │   └── ...
│   ├── contexts/         # React contexts
│   │   ├── AuthContext.tsx
│   │   └── LanguageContext.tsx
│   ├── lib/             # Utilities and API
│   │   ├── api-config.ts
│   │   ├── api-service.ts
│   │   └── ...
│   └── App.tsx
├── server/              # MongoDB Backend
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── seed.js
└── package.json
```

## Getting Started

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (v4.4 or higher) - Local or Atlas
3. **npm** or **yarn**

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### Backend Setup (MongoDB)

```bash
cd server

# Install dependencies
npm install

# Configure environment
# Edit .env file with your MongoDB URI
# For local: mongodb://localhost:27017/agroEase
# For Atlas: mongodb+srv://<user>:<pass>@cluster.mongodb.net/agroEase

# Start the server
npm run dev
```

The backend API will be available at `http://localhost:5000`

**⚠️ You MUST start the backend server before using the frontend!**

See [BACKEND_STARTUP.md](BACKEND_STARTUP.md) for detailed troubleshooting.

### Seed Database

```bash
cd server
npm run seed
```

This will populate the database with sample:
- Machine owners
- Agricultural machinery
- Government schemes
- FAQs
- Fertilizer information
- Disease data

## Features

### 1. Machinery Rental
- Browse available farm machinery
- Filter by type and location
- View owner details and ratings
- Book machines hourly or daily
- Real-time price calculation

### 2. Government Schemes
- Browse central and state schemes
- Filter by category and state
- View eligibility criteria
- Direct application links

### 3. Disease Detection
- Upload plant images
- AI-powered disease identification
- Treatment recommendations

### 4. Fertilizer Recommendation
- Get fertilizer suggestions based on crops
- View NPK ratios and application methods

### 5. Weather Information
- Current weather conditions
- 5-day forecast
- Agricultural alerts

## API Integration

The frontend uses the new MongoDB API (`src/lib/api-config.ts`). Key endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/machines` - List all machines
- `POST /api/machines/book` - Create booking
- `GET /api/schemes` - Get government schemes
- `GET /api/diseases` - Get disease information

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agroEase
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
```

## Building for Production

```bash
# Frontend build
npm run build

# Backend (optional)
cd server
npm install --production
npm start
```

## License

MIT
