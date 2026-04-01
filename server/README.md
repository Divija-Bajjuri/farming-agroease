# AgroEase Backend - MongoDB Setup

This directory contains the MongoDB backend for the AgroEase Farm Machinery Booking application.

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (v4.4 or higher) - Can be local or MongoDB Atlas

## Installation

```bash
cd server
npm install
```

## Configuration

1. Copy the `.env.example` to `.env`:

```bash
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/agroEase

# For MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/agroEase
```

2. Update other settings in `.env` if needed:
   - `PORT` - Server port (default: 5000)
   - `JWT_SECRET` - Secret key for JWT tokens
   - `JWT_EXPIRE` - Token expiration time

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Seeding Database with Sample Data
```bash
npm run seed
```

This will populate the database with:
- 3 sample machine owners
- 5 sample machines (tractors and harvesters)
- 4 government schemes
- 5 FAQs
- 4 fertilizer types
- 4 crop diseases

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Machines
- `GET /api/machines` - Get all machines
- `GET /api/machines/:id` - Get machine by ID
- `GET /api/machines/search` - Search machines
- `POST /api/machines/book` - Create booking (protected)
- `GET /api/machines/bookings` - Get user's bookings (protected)

### Schemes
- `GET /api/schemes` - Get all government schemes

### FAQs
- `GET /api/faqs` - Get all FAQs

### Fertilizers
- `GET /api/fertilizers` - Get all fertilizers

### Diseases
- `GET /api/diseases` - Get all disease information

## Testing the API

You can test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all machines
curl http://localhost:5000/api/machines

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

## Project Structure

```
server/
├── config/
│   └── db.js          # MongoDB connection
├── models/
│   ├── User.js        # User model
│   ├── Machine.js     # Machine model
│   ├── Booking.js     # Booking model
│   ├── Scheme.js      # Government scheme model
│   ├── FAQ.js        # FAQ model
│   ├── Fertilizer.js # Fertilizer model
│   └── Disease.js     # Disease model
├── routes/
│   ├── auth.js       # Authentication routes
│   ├── machines.js   # Machine & booking routes
│   ├── schemes.js    # Scheme routes
│   ├── faqs.js       # FAQ routes
│   ├── fertilizers.js # Fertilizer routes
│   └── diseases.js   # Disease routes
├── index.js          # Main server entry
├── seed.js           # Database seeding script
├── package.json      # Dependencies
└── .env             # Environment variables
```

## Connecting Frontend

The frontend is already configured to connect to `http://localhost:5000`. 

To change the backend URL, edit `src/lib/api-config.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Features

- JWT-based authentication
- Role-based user types (farmer, owner, admin)
- Machine rental booking system
- Government scheme information
- FAQ system
- Fertilizer recommendations
- Disease information database
