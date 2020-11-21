const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const errorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// The middleware to Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // The token construction from the header
        token = req.headers.authorization.split(' ')[1];
    }

    // Is the token exists
    if (!token) {
        return next(new errorResponse(`Not authorized to access the route`, 401));
    }

    try {
        // Verif the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new errorResponse(error, 401));
    }
})

// Grant the acccess to some specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return next(new errorResponse(`The user role ${req.user.role} not authorized to access this route`, 403));
        }
        next();
    }
}