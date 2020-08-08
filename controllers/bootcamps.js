const geocoder = require('../utils/geocoder');
const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middlewares/async')

/**
 * @desc    Get all the bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	// copy req.query
	const reqQuery = {...req.query};

	// Fields to exclude
	const removeFields = ['select', 'sort'];

	// Loops over the remove fields and delete them from reqQuery
	removeFields.forEach(param => delete reqQuery[param]);

	let query;
	//Create a query string
	let queryStr = JSON.stringify(reqQuery);

	// Create operators like lte gt gte lt in using regExpressions
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

	// finding the resource
	query = Bootcamp.find(JSON.parse(queryStr));

	// Select fields
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ');
		query = query.select(fields);
	}

	// Sort fields
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ');
		query = query.sort(sortBy);
	} else {
		query = query.sort('-createdAt');
	}

	// Executing the query
	const bootcamps = await query;
	res.status(200).json({ 
		succes: true,
		data: bootcamps
	});
});

/**
 * @desc    Get single bootcamp
 * @route   GET /api/v1/bootcamp/:id
 * @access  Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
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
});

/**
 * @desc    Create new bootcamp
 * @route   POST /api/v1/bootcamp/:id
 * @access  Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.create(req.body);
	res.status(201).json({
		success: true,
		data: bootcamp
	});
});

/**
 * @desc    update a bootcamp
 * @route   PUT /api/v1/bootcamp/:id
 * @access  Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
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
});

/**
 * @desc    Delete a bootcamp
 * @route   DELETE /api/v1/bootcamp/:id
 * @access  Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const toDelete = await Bootcamp.findByIdAndDelete(req.params.id);
	if (!toDelete) {
		return next(
			new ErrorResponse(`Bootcamp Not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true });
});

/**
 * @desc    GET bootcamps within a radius
 * @route   GET /api/v1/bootcamps/:zipcode/:distance
 * @access  Private
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
	const { zipcode, distance } = req.params;

	// Get lag/lang from the geocoder
	const loc = await geocoder.geocode(zipcode);
	const lat = loc[0].latitude;
	const lng = loc[0].longitude;

	// Calc radius by dividing the distance by radius
	// Earch radius 6378.1 KM 3963 mi (miles);
	const radius = distance / 3963;
	const bootcamps = await Bootcamp.find({
		location: { $geoWithin: { $centerSphere: [ [lng, lat], radius ]}}
	});
	res.status(200).json({ success: true, count: bootcamps.length, data: bootcamps });
});