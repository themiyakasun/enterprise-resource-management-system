const { Project } = require('../models');

const createProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const existingProject = await Project.findOne({
      where: { name, tenantId: req.user.tenantId },
    });

    if (existingProject)
      return res
        .status(400)
        .json({ message: 'Project already exists for this tenant' });

    const newProject = await Project.create({
      name,
      description,
      tenantId: req.user.tenantId,
    });

    return res.status(201).json({
      message: 'Project created successfully',
      project: { id: newProject.id, name, description },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { tenantId: req.user.tenantId },
      include: ['tasks'],
    });

    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const getProjectsById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findOne({
      where: { id, tenantId: req.user.tenantId },
      include: ['tasks'],
    });

    if (!project)
      return res.status(404).json({ message: 'Project cannot be found' });

    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProject = await Project.findOne({ where: { id } });
    if (!existingProject)
      return res.status(404).json({ message: 'Project cannot be found' });

    await Project.distroy({ where: { id } });

    return res.status(201).json({ message: 'Project successfully deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectsById,
  deleteProject,
};
