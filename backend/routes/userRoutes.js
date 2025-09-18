const express = require('express');

const {
  addUser,
  login,
  deleteUser,
} = require('../controllers/userController.js');
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
router.delete(
  '/:id',
  authMiddleware,
  checkPermission('users', 'delete'),
  deleteUser
);

module.exports = router;
