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

// 2. GET UNIQUE DESTINATIONS (For Search Autocomplete)
router.get('/destinations', async (req, res) => {
  try {
    // Finds all unique distinct destination names
    const destinations = await Package.distinct('destination');
    // Finds min and max price for the budget slider
    const minPrice = await Package.findOne().sort({ price: 1 }).select('price');
    const maxPrice = await Package.findOne().sort({ price: -1 }).select('price');
    
    res.json({
      destinations,
      priceRange: {
        min: minPrice ? minPrice.price : 0,
        max: maxPrice ? maxPrice.price : 10000
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. ADVANCED SEARCH
// Usage: /search?query=Paris&minPrice=100&maxPrice=500&adults=2
router.get('/search', async (req, res) => {
  const { query, date, adults, children, minPrice, maxPrice } = req.query;
  
  try {
    let filter = {};

    // A. Text Search
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { destination: { $regex: query, $options: 'i' } }
      ];
    }

    // B. Date Logic
    if (date) {
      const searchDate = new Date(date);
      filter.availableFrom = { $lte: searchDate };
      filter.availableTo = { $gte: searchDate };
    }

    // C. Travelers (Capacity Check)
    const totalTravelers = parseInt(adults || 0) + parseInt(children || 0);
    if (totalTravelers > 0) {
      filter.maxTravelers = { $gte: totalTravelers };
    }

    // D. Budget Filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    const results = await Package.find(filter).sort({ price: 1 });
    res.json(results);

  } catch (err) {
    res.status(500).json({ message: "Search Error: " + err.message });
  }
});

module.exports = router;