const express = require('express');

const { addUser, login } = require('../controllers/userController.js');

const router = express.Router();

router.post('/add', addUser);
router.post('/login', login);

module.exports = router;
