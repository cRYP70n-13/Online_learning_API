const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

/**
 * @desc    Get all the bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = async (req, res, next) => {
	try {
		const bootcamps = await Bootcamp.find();
		res.status(200).json({ 
			succes: true,
			data: bootcamps
		})
	} catch (error) {
		next(error)
	}
}

/**
 * @desc    Get single bootcamp
 * @route   GET /api/v1/bootcamp/:id
 * @access  Public
 */
exports.getBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findById(req.params.id);
		if (!bootcamp) {
			return next(
				new ErrorResponse(`Bootcamp Not found with id of ${req.params.id}`, 404)
			);
		}
		res.status(200).json({
			status: 200,
			data: bootcamp
		});
	} catch (error) {
		next(error);
	}
}

/**
 * @desc    Create new bootcamp
 * @route   POST /api/v1/bootcamp/:id
 * @access  Private
 */
exports.createBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.create(req.body);
		res.status(201).json({
			success: true,
			data: bootcamp
		});
	} catch (error) {
		next(error);
	}
}

/**
 * @desc    update a bootcamp
 * @route   PUT /api/v1/bootcamp/:id
 * @access  Private
 */
exports.updateBootcamp = async (req, res, next) => {
	try {
		const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		if (!bootcamp) {
			return next(
				new ErrorResponse(`Bootcamp Not found with id of ${req.params.id}`, 404)
			);
		}
		res.status(200).json({ success: true, data: bootcamp });
	} catch (err) {
		next(err);
	}
}

/**
 * @desc    Delete a bootcamp
 * @route   DELETE /api/v1/bootcamp/:id
 * @access  Private
 */
exports.deleteBootcamp = async (req, res, next) => {
	try {
		const toDelete = await Bootcamp.findByIdAndDelete(req.params.id);
		if (!toDelete) {
			return next(
				new ErrorResponse(`Bootcamp Not found with id of ${req.params.id}`, 404)
			);
		}
		res.status(200).json({ success: true });
 	} catch (err) {
		next(err);
	 }
}