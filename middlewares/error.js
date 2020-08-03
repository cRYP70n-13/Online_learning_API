const errorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;
	console.log(err.stack.red);

	// Mongoose bad object ID
	if (err.name === 'CastError') {
		const message = `Ressource not found with the id off ${err.value}`;
		error = new errorResponse(message, 404);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'server Error'
	});
};

module.exports = errorHandler;