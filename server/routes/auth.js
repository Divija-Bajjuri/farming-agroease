const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'agroEase_secret_key_2024';

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, mobile, password, village, district, state, farmSize, cropTypes, preferredLanguage } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this mobile number already exists' });
    }

    // Create user
    const user = new User({
      name,
      mobile,
      password,
      village,
      district,
      state,
      farmSize,
      cropTypes: cropTypes || [],
      preferredLanguage: preferredLanguage || 'en'
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        village: user.village,
        district: user.district,
        state: user.state,
        farmSize: user.farmSize,
        cropTypes: user.cropTypes,
        preferredLanguage: user.preferredLanguage
      },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // Find user
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({ error: 'Invalid mobile number or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid mobile number or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        village: user.village,
        district: user.district,
        state: user.state,
        farmSize: user.farmSize,
        cropTypes: user.cropTypes,
        preferredLanguage: user.preferredLanguage
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Update profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const updates = req.body;
    
    // Don't allow updating sensitive fields
    delete updates.password;
    delete updates.mobile;

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $set: updates },
      { new: true }
    ).select('-password');

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
