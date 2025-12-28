const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const packageRoutes = require('./routes/packageRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
// This is critical: It allows your frontend to access the API
app.use(cors({
    origin: 'http://localhost:5173', // Your Vite dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travel_db')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- ROUTES ---
app.use('/api/packages', packageRoutes);

// Basic health check
app.get('/', (req, res) => {
    res.send('Travel API is running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});