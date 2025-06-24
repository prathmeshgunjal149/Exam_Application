const express = require('express');
const router = express.Router();
const questionController = require('../controller/QuestionController');

// Route to show all questions with pagination
router.get('/', questionController.getQuestionPage);

// Route to add a new question
router.post('/add', questionController.addQuestion);

// Route to delete a question
router.get('/delete/:qid', questionController.deleteQuestion);

// Route to load the edit form
router.get('/edit/:qid', questionController.editQuestionForm);
router.get('/question/edit/:qid', questionController.editQuestionForm);

// Route to handle update after editing
router.post('/update/:qid', questionController.updateQuestion);

module.exports = router;
