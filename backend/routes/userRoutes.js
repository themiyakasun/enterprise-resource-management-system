const express = require('express');

const { addUser, login } = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const checkPermission = require('../middlewares/checkPermission.js');

const router = express.Router();

router.post(
  '/add',
  authMiddleware,
  checkPermission('users', 'create'),
  addUser
);
router.post('/login', login);

module.exports = router;
