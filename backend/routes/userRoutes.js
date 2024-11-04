const express = require('express');
const { registerUser, authUser, allUsers, sendOTP } = require('../controllers/userControllers')
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/* Controllers */
router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);
router.post('/sendOTP', sendOTP);

module.exports = router;