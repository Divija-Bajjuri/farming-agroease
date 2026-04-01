const express = require('express');
const router = express.Router();
const Fertilizer = require('../models/Fertilizer');

// Get all fertilizers (public)
router.get('/', async (req, res) => {
  try {
    const { type, crop, organic } = req.query;
    
    let query = { isActive: true };
    if (type) query.type = type;
    if (organic === 'true') query.isOrganic = true;
    if (crop) query.crops = crop;

    const fertilizers = await Fertilizer.find(query).sort({ nameEn: 1 });
    res.json(fertilizers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recommendation
router.get('/recommend', async (req, res) => {
  try {
    const { crop, stage } = req.query;
    
    let query = { isActive: true };
    if (crop) query.crops = crop;
    if (stage) query.stages = stage;

    const fertilizers = await Fertilizer.find(query);
    res.json(fertilizers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get types
router.get('/meta/types', async (req, res) => {
  try {
    const types = await Fertilizer.distinct('type', { isActive: true });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
