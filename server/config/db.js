const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agroEase';

  if (!process.env.MONGODB_URI) {
    console.warn('WARNING: MONGODB_URI is not set. Falling back to local MongoDB at mongodb://localhost:27017/agroEase');
  }

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4 // Use IPv4, skip trying IPv6
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:');
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
