const express = require('express');
const router = express.Router({ mergeParams: true });

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users');

// The models
const User = require('../models/User');

// Require the middlewares to protect our routes
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth')

router.use(protect)
router.use(authorize('admin'))

router
    .route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;