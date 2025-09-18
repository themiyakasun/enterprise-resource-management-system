const express = require('express');

const { addUser, login } = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/add', authMiddleware, addUser);
router.post('/login', login);

module.exports = router;
