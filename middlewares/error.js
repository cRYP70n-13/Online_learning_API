const errorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	// Mongoose bad object ID
	if (err.name === 'CastError') {
		const message = `Ressource not found`;
		error = new errorResponse(message, 404);
	}

	// Mongoose dupliacte key
	if (err.code === 11000) {
		const message = `Duplicate field value entered`
		error = new errorResponse(message, 400);
	}

	// Mongoose validation Error
	if (err.name === 'VaidationError') {
		const message = Object.values(err.errors).map(value => val.message);
		error = new errorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'server Error'
	});
};

module.exports = errorHandler;