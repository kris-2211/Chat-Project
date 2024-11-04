const express = require('express');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatControllers');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// This route is used for accessing or creating the chat (Only logged in user can access this route)
router.route('/').post(protect, accessChat); 

// This route is used for getting all of the chats from our database for that particular user
router.route('/').get(protect, fetchChats);

// This route is used for creation of our group
router.route('/group').post(protect, createGroupChat);

// For renaming a particular group
router.route('/rename').put(protect, renameGroup);

// For adding someone to the group
router.route('/groupadd').put(protect, addToGroup);

// For removing someone from the group or leave the group
router.route('/groupremove').put(protect, removeFromGroup);


module.exports = router;