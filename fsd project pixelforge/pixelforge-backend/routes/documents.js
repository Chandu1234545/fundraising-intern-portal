// routes/documents.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');
const auth = require('../middleware/auth');

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Only PDF, JPEG, PNG allowed'));
    }
    cb(null, true);
  }
});

// Upload single file with title and description
router.post('/:projectId', auth, upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const doc = new Document({
      filename: req.file.filename,
      path: req.file.path,
      project: req.params.projectId,
      title,
      description
    });

    const saved = await doc.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// List all documents for a project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const docs = await Document.find({ project: req.params.projectId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// View/download file
router.get('/file/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ msg: 'File not found' });
  }
});

// Delete document
router.delete('/:id', auth, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ msg: 'File not found' });

    if (fs.existsSync(doc.path)) fs.unlinkSync(doc.path);

    await doc.remove();
    res.json({ msg: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
