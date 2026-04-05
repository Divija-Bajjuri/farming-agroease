const express = require('express');
const router = express.Router();
const Disease = require('../models/Disease');

// Get all diseases (public)
router.get('/', async (req, res) => {
  try {
    const { crop, severity } = req.query;

    let query = { isActive: true };
    if (crop) query.crop = new RegExp(String(crop), 'i');
    if (severity) query.severity = String(severity);

    const diseases = await Disease.find(query).sort({ nameEn: 1 });
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
