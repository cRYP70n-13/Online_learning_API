const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const cookieParser = require('cookie-parser');

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
const coursesRouter = require('./routes/courses.routes.js');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const reveiwsRouter = require('./routes/reviews.routes');

// Starting an express application
const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser
app.use(express.json());

// file upload middleware
app.use(fileupload());

// Set up the cookie parser
app.use(cookieParser());

// Mount routers ==> Filters
app.use('/api/v1/bootcamps', bootcampsRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reveiwsRouter);

// using our error handler
app.use(errorHandler);

// Setting up the public folder to be our static folder
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	// catching the errors if the server failed to load
	console.log(`Error ${err.message}`.red);
	// Close the server & exit process
	server.close(() => process.exit(1));
});
