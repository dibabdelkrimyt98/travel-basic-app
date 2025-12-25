const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// 1. GET ALL (Default view)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. SEARCH (The new part)
// Usage: /api/packages/search?query=New York
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    // If no query, return all
    if (!query) {
      const packages = await Package.find();
      return res.json(packages);
    }

    // Search inside 'title' OR 'destination'
    const results = await Package.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { destination: { $regex: query, $options: 'i' } }
      ]
    });
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;