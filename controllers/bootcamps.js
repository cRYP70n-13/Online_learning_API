/**
 * @desc    Get all the bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = (req, res, next) => {
    res
        .status(200)
        .json({ success: true, message: 'Show all the bootcamps mr cRYP70N', hello: req.hello });
}

/**
 * @desc    Get single bootcamp
 * @route   GET /api/v1/bootcamp/:id
 * @access  Public
 */
exports.getBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({success: true, message: `show the bootcamp ${req.params.id}`});
}

/**
 * @desc    Create new bootcamp
 * @route   POST /api/v1/bootcamp/:id
 * @access  Private
 */
exports.createBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({success: true, message: `Create a new bootcamp`});
}

/**
 * @desc    update a bootcamp
 * @route   PUT /api/v1/bootcamp/:id
 * @access  Private
 */
exports.updateBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({success: true, message: `Update the bootcamp ${req.params.id}`});
}

/**
 * @desc    Delete a bootcamp
 * @route   DELETE /api/v1/bootcamp/:id
 * @access  Private
 */
exports.deleteBootcamp = (req, res, next) => {
    res
        .status(200)
        .json({success: true, message: `Deleting the bootcamp ${req.params.id}`});
}