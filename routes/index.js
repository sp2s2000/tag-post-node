const express = require('express');
const path = require('path');
const router = express.Router();

// Serve the index.html file for the root route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/tag-data', (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: 'Tag data received',
  });
});

module.exports = router;
