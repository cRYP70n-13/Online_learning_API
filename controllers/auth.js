const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

/**
 * @desc Register User
 * @route POST /api/v1/auth/register
 * @access Public
 */
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Create the user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // Sending back the token inside of the cookie
    sendTokenResponse(user, 200, res);
})

/**
 * @desc Login User
 * @route POST /api/v1/auth/register
 * @access Public
 */
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email and Password
    if (!email || !password) {
        return next(new ErrorResponse(`Please provid an email and a pass`, 400));
    }

    // Check for the user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse(`No user created with this email`), 401);
    }
    
    // Check the if the two password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    sendTokenResponse(user, 200, res);
})

// Get the token from Model, also create cookie and send the response
const sendTokenResponse = (user, statusCode, res) => {
    // Create the token
    const token = user.getSignedJwtToken();

    const options = {
        // The math is just to convert it to days
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}