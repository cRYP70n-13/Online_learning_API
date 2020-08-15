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

// Include ohter ressources routers
const courseRouter = require('./courses.routes');

// ReRoute into other resources router
router.use('/:bootcampId/courses', courseRouter);

router
	.route('/:id/photo')
	.put(bootcampPhotoUpload)

router
	.route('/radius/:zipcode/:distance')
	.get(getBootcampsInRadius)

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
	.delete(deleteBootcamp)

module.exports = router;