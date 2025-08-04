const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/me', auth, (req, res) => {
  res.json({
    userId: req.user.id,
    role: req.user.role
  });
});

module.exports = router;
