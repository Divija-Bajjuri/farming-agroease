const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/machines', require('./routes/machines'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/fertilizers', require('./routes/fertilizers'));
app.use('/api/diseases', require('./routes/diseases'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AgroEase API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
