const express = require('express');
const router = express.Router();
const FAQ = require('../models/FAQ');

// Get all FAQs (public)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = { isActive: true };
    if (category) query.category = category;

    let faqs = await FAQ.find(query).sort({ priority: -1 });

    // Client-side search if needed
    if (search) {
      const searchLower = search.toLowerCase();
      faqs = faqs.filter(faq => 
        faq.questionEn.toLowerCase().includes(searchLower) ||
        faq.answerEn.toLowerCase().includes(searchLower) ||
        faq.keywords?.some(k => k.toLowerCase().includes(searchLower))
      );
    }

    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get FAQ categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await FAQ.distinct('category', { isActive: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
