const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// 1. GET ALL (Default view)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ADVANCED SEARCH
// Usage: /api/packages/search?query=Paris&date=2024-12-25&adults=2&children=1
router.get('/search', async (req, res) => {
  const { query, date, adults, children } = req.query;
  
  try {
    let filter = {};

    // A. Text Search (Destination or Title)
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { destination: { $regex: query, $options: 'i' } }
      ];
    }

    // B. Date Logic 
    // Checks if the package is available on or after the requested date
    if (date) {
      const searchDate = new Date(date);
      filter.availableFrom = { $lte: searchDate }; // Package starts before or on this date
      filter.availableTo = { $gte: searchDate };   // Package ends after or on this date
    }

    // C. Capacity Logic
    // Ensures the package can hold the total number of people
    const totalTravelers = parseInt(adults || 1) + parseInt(children || 0);
    if (totalTravelers) {
      filter.maxTravelers = { $gte: totalTravelers };
    }

    const results = await Package.find(filter).sort({ price: 1 });
    res.json(results);

  } catch (err) {
    res.status(500).json({ message: "Search Error: " + err.message });
  }
});

module.exports = router;