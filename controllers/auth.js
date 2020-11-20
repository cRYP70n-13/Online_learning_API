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

    // Create a token
    const token = user.getSignedJwtToken();

    res
        .status(200)
        .json({
            success: true,
            token
        });
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

    // Create a token
    const token = user.getSignedJwtToken();

    res
        .status(200)
        .json({
            success: true,
            token
        });
})