const ErrorResponse = require('../utils/errorResponse');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const asyncHandler = require('../middlewares/async');

/**
 * @description	GET all the courses
 * @route		GET /api/v1/courses
 * 				GET /api/v1/bootcamps/:bootcampId/courses
 * @access		public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
	if (req.params.bootcampId) {
		const course = await Course.find({ bootcamp: req.params.bootcampId });
		
		return res.status(200).json({
			success: true,
			count: courses.length,
			data: courses
		})
	} else {
		res.status(200).json(res.advancedResults);
	}
});

/**
 * @description	GET single course
 * @route		GET /api/v1/courses/:id
 * @access		public
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id).populate({
		path: 'Bootcamp',
		select: 'name description'
	});

	if (!course) {
		return next( new ErrorResponse(`No course with this id of ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: course
	});
});

/**
 * @description	Add a course
 * @route		POST /api/v1/bootcamps/:bootcampId/courses
 * @access		Private
 */
exports.addCourse = asyncHandler(async (req, res, next) => {
	req.body.bootcamp = req.params.bootcampId;

	// Getting the user ID and put it in the body
	req.body.user = req.user.id;

	const bootcamp = await Bootcamp.findById(req.params.bootcampId);

	if (!bootcamp) {
		return next(new ErrorResponse(`No bootcamp with this id of ${req.params.bootcampId}`, 404));
	}
	
	// Check if the user is the owner of the course
	if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(`User ${req.params.id} is not authorized to add a course to the bootcamp ${bootcamp._id}`, 401)
		)
	}

	const course = await Course.create(req.body);

	res.status(200).json({
		success: true,
		data: course
	});
});

/**
 * @description	Update course
 * @route		PUT /api/v1/courses/:id
 * @access		Private
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
	let course = await Course.findById(req.params.id);

	if (!course) {
		return next(new ErrorResponse(`No bootcamp with this id of ${req.params.id}`, 404));
	}
	
	// Make sur that the user is the course owner
	if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(
			new ErrorResponse(`The User ${req.user.id} is not authorized to update the course in the bootcamp ${bootcamp._id}`, 401)
		)
	}

	course = await Course.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true
	})

	res.status(200).json({
		success: true,
		data: course
	});
});

/**
 * @description	Delete a course
 * @route		DELETE /api/v1/courses/:id
 * @access		Private
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
	const course = await Course.findById(req.params.id);

	if (!course) {
		return next(new ErrorResponse(`No bootcamp with this id of ${req.params.id}`, 404));
	}
	
	// Check if the user is the bootcamp owner so that he can delete a specific course
	if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next (
			new ErrorResponse(`The user ${req.user.id} is not authorized to delete this course in the bootcamp ${bootcamp._id}`, 401)
		)
	}

	await course.remove();

	res.status(200).json({
		success: true,
		data: {}
	});
});