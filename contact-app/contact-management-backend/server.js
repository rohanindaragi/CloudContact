const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db/conn'); // Initialize DB connection
const contactRoutes = require('./routes/router');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use(contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
