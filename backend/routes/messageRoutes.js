const express = require('express');
const { sendMessage, allMessages } = require('../controllers/messageControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// First route is for sending the message
router.route('/').post(protect, sendMessage);

// Second route is to fetch all of the message in a particular chat
router.route('/:chatId').get(protect, allMessages);

module.exports = router;

