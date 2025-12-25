const mongoose = require('mongoose');
const Package = require('./models/Package');

mongoose.connect('mongodb://127.0.0.1:27017/travel-basic');

const seedData = [
  {
    title: "City of City",
    price: 299,
    summary: "A budget-friendly urban escape in the heart of the city.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000",
    destination: "New York"
  },
  {
    title: "Mountain Trail",
    price: 299,
    summary: "Breathtaking views and fresh air on a budget hike.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000",
    destination: "Alps"
  }
];

const seedDB = async () => {
  await Package.deleteMany({});
  await Package.insertMany(seedData);
  console.log("Data Seeded!");
  process.exit();
};

seedDB();