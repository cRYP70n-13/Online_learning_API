const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const colors = require('colors');

// Requiring files 
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// The PORT constant
const PORT = process.env.PORT || 3000;

// Requiring the routers
const bootcampsRouter = require('./routes/bootcamps.routes.js');

// Starting an express application
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter);

const server = app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error ${err.message}`.red);
	// Close the server & exit process
	server.close(() => process.exit(1));
})