const express = require('express');
const router = express.Router();

// Requiring the controllers folder
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
	deleteBootcamp,
	getBootcampsInRadius,
	bootcampPhotoUpload
} = require('../controllers/bootcamps');

const advancedResults = require('../middlewares/advancedResults');
const Bootcamp = require('../models/Bootcamp');

// Include ohter ressources routers
const courseRouter = require('./courses.routes');

const { protect, authorize } = require('../middlewares/auth');

// ReRoute into other resources router
router.use('/:bootcampId/courses', courseRouter);

router
	.route('/:id/photo')
	.put(protect, authorize('published', 'admin'), bootcampPhotoUpload)

router
	.route('/radius/:zipcode/:distance')
	.get(getBootcampsInRadius)

router
    .route('/')
    .get( advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, authorize('publisher', 'admin'),createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, authorize('publisher', 'admin'), updateBootcamp)
	.delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router;