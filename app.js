const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const colors = require('colors');

// configuration files
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Error handler middlewares
const errorHandler = require('./middlewares/error');

// Connect to database
connectDB();

const PORT = process.env.PORT || 3000;

// Routers
const bootcampsRouter = require('./routes/bootcamps.routes.js');

// Starting an express application
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser
app.use(express.json());

// Mount routers ==> Filters
app.use('/api/v1/bootcamps', bootcampsRouter);

// using our error handler
app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	// catching the errors if the server failed to load
	console.log(`Error ${err.message}`.red);
	// Close the server & exit process
	server.close(() => process.exit(1));
});