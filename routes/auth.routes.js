const express = require('express');
const { getMe, register, login } = require('../controllers/auth');

const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;