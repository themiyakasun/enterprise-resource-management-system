const express = require('express');

const checkPermission = require('../middlewares/checkPermission.js');
const {
  createProject,
  getProjects,
  getProjectsById,
  deleteProject,
} = require('../controllers/projectController.js');

const router = express.Router();

router.post('/create', checkPermission('projects', 'create'), createProject);
router.get('/', getProjects);
router.get('/:id', getProjectsById);
router.delete('/:id', checkPermission('projects', 'delete'), deleteProject);
