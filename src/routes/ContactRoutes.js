const express = require('express');
const router = express.Router();
const contactCtrl = require('../controller/contactControll');

router.get('/Contact', contactCtrl.contactForm);
router.post('/Contact', contactCtrl.handleContactSubmission);

module.exports = router;
