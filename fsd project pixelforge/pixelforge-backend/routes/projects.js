const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// @route   POST /api/projects
// @desc    Create new project (auth required)
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      createdBy: req.user.id
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'name email');
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
