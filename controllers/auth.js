const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

/**
 * @desc Register User
 * @route GET /api/v1/auth/register
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