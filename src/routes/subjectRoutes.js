const express = require('express');
const router = express.Router();
const subjectCtrl = require('../controller/subjectController');

// Subject listing
router.get('/subject', subjectCtrl.getSubjects);// to call the getSubjects function in subjectController.js

// Add subject
router.post('/subject', subjectCtrl.postAddSubject);// to call the postAddSubject function in subjectController.js

// POST method for delete with :id
router.post('/subject/delete/:id', subjectCtrl.postDeleteSubject); // to call the postDeleteSubject function in subjectController.js

module.exports = router; // Export router to use in other files
