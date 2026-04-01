const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

// Get all schemes (public)
router.get('/', async (req, res) => {
  try {
    const { category, state } = req.query;
    
    let query = { isActive: true };
    if (category) query.category = category;
    if (state) query.states = state;

    const schemes = await Scheme.find(query).sort({ createdAt: -1 });
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single scheme
router.get('/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create scheme (admin only - simplified)
router.post('/', async (req, res) => {
  try {
    const scheme = new Scheme(req.body);
    await scheme.save();
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Scheme.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
