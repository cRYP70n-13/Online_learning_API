const geocoder = require('../utils/geocoder');
const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middlewares/async');

// Core nodejs module no need to install it
const path = require('path');

/**
 * @desc    Get all the bootcamps
 * @route   GET /api/v1/bootcamps
 * @access  Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
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
 * @route   DELETE /api/v1/bootcamps/:id
 * @access  Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(
			new ErrorResponse(`Bootcamp Not found with id of ${req.params.id}`, 404)
		);
	}

	bootcamp.remove();

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

/**
 * @desc    UPLOAD photo for bootcamp
 * @route   PUT /api/v1/bootcamps/:id/photo
 * @access  Private
 */
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
	const bootcamp = await Bootcamp.findById(req.params.id);
	if (!bootcamp) {
		return next(
			new ErrorResponse(`Bootcamp Not found with id of ${req.params.id}`, 404)
		);
	}

	if (!req.files) {
		return next(
			new ErrorResponse(`please upload a photo`, 400)
		);
	}

	const { file } = req.files;

	// Make sur the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(
			new ErrorResponse(`please upload an image file`, 400)
		);
	}

	// Check file size
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponse(`Please upload an image less then ${process.env.MAX_FILE_UPLOAD}`),
			400
		);
	}

	// Create custom filename
	file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			// Process upload
			return next(
				new ErrorResponse(`We have a sort of a fucking error SHIT`),
				500
			);
		}
		await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
		return res.status(200).json({
			success: true,
			data: file.name
		})
	});
});


// let str = "";
// for (const match of ch.matchAll(/<span style="color: #[0-9a-fA-F]+;">([a-zA-Z0-9'])<\/span>/gi)) {
//   str += match[1];
// }
//if (
//	parseInt(pwd.slice(-(--([, , , undefined].join()).length))[0]) * parseInt(pwd.slice(0 - - - 1 - - - - - 1 - - - - 0)[1]) * stmnt.split("All").length == ts.slice(eval("" + '' + "" + ƒ(1 < 0) + "" + "-" + '' + "" + ƒ(0 < 1) + "-" + ƒ(1 > 0))))
