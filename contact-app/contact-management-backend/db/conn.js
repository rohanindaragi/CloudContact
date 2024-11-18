const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGO_URI;

if (!DB) {
    console.error('MONGO_URI is undefined. Check your .env file.');
    process.exit(1);
}

mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;
