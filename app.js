const express = require('express');
const dotenv = require('dotenv');

// Requiring middlewares
const morgan = require('morgan');

// Requiring the routers
const bootcampsRouter = require('./routes/bootcamps.routes.js');

// The PORT constant
const PORT = process.env.PORT || 3000;

// Load env variables
dotenv.config({ path: './config/config.env' });

// Starting an express application
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter);

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));