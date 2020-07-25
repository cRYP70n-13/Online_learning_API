const express = require('express');
const dotenv = require('dotenv');

// Requiring the routers
const bootcampsRouter = require('./routes/bootcamps.routes.js');

// The PORT constant
const PORT = process.env.PORT || 3000;

const app = express();

// Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter);

// Load env variables
dotenv.config({ path: './config/config.env' });

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));