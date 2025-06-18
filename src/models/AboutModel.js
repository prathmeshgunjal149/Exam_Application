const express = require('express');
const router = express.Router();

// Controller logic inline or imported
router.get('/about', (req, res) => {
  res.render('about'); // Renders views/about.ejs
});

module.exports = router;
