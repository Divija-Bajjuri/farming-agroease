const express = require('express');
const router = express.Router();
const Machine = require('../models/Machine');
const Booking = require('../models/Booking');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'agroEase_secret_key_2024';

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all machines (public)
router.get('/', async (req, res) => {
  try {
    const { type, location, district } = req.query;
    
    let query = { available: true };
    if (type) query.type = type;
    if (location) query.location = new RegExp(location, 'i');
    if (district) query.district = district;

    const machines = await Machine.find(query)
      .populate('owner', 'name mobile')
      .sort({ createdAt: -1 });

    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single machine
router.get('/:id', async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id)
      .populate('owner', 'name mobile');
    
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    res.json(machine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new machine (protected)
router.post('/', auth, async (req, res) => {
  try {
    const machine = new Machine({
      ...req.body,
      owner: req.userId
    });
    await machine.save();
    res.status(201).json(machine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update machine (owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const machine = await Machine.findOne({ _id: req.params.id, owner: req.userId });
    
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found or unauthorized' });
    }

    Object.assign(machine, req.body);
    await machine.save();
    res.json(machine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete machine (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const machine = await Machine.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found or unauthorized' });
    }
    
    res.json({ message: 'Machine deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's machines
router.get('/my/machines', auth, async (req, res) => {
  try {
    const machines = await Machine.find({ owner: req.userId })
      .sort({ createdAt: -1 });
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create booking
router.post('/:id/book', auth, async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id);
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    if (!machine.available) {
      return res.status(400).json({ error: 'Machine is not available' });
    }

    const user = await User.findById(req.userId);

    const booking = new Booking({
      machine: machine._id,
      farmer: req.userId,
      farmerName: req.body.farmerName || user.name,
      contactNumber: req.body.contactNumber || user.mobile,
      location: req.body.location,
      bookingType: req.body.bookingType,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      fromTime: req.body.fromTime,
      toTime: req.body.toTime,
      totalDays: req.body.totalDays,
      totalHours: req.body.totalHours,
      totalPrice: req.body.totalPrice,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's bookings
router.get('/my/bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ farmer: req.userId })
      .populate('machine')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get owner's bookings
router.get('/owner/bookings', auth, async (req, res) => {
  try {
    const machines = await Machine.find({ owner: req.userId }).select('_id');
    const machineIds = machines.map(m => m._id);

    const bookings = await Booking.find({ machine: { $in: machineIds } })
      .populate('machine')
      .populate('farmer', 'name mobile')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update booking status
router.put('/booking/:id/status', auth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    // Find the machine owner
    const booking = await Booking.findById(req.params.id).populate('machine');
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user owns the machine
    if (booking.machine.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    booking.status = status;
    if (notes) booking.notes = notes;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
