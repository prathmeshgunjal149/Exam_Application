const express = require('express');
const router = express.Router();
const questionCtrl = require('../controller/QuestionController');

// Show question page
router.get('/admin/question', questionCtrl.getQuestionPage);

// Handle question form submission
router.post('/question/add', questionCtrl.addQuestion);

// Delete question
router.get('/question/delete/:qid', questionCtrl.deleteQuestion);
router.get('/question', (req, res) => {
  res.redirect('/admin/question');
});
module.exports = router;
