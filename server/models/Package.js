const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  summary: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, default: 'Budget' },
  destination: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Package', packageSchema);