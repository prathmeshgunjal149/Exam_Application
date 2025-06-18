const QuestionModel = require('../models/QuestionModel');
const conn = require('../config/connection');

// Show question form and list
exports.getQuestionPage = (req, res) => {
  QuestionModel.getAllQuestions()
    .then((questions) => {
      conn.query("SELECT * FROM course", (err, courses) => {
        if (err) throw err;
        res.render('question', { questions, courses });
      });
    })
    .catch((err) => res.status(500).send(err));
};

// Add a new question
exports.addQuestion = (req, res) => {
  const { qname, op1, op2, op3, op4, answer, cid } = req.body;
  QuestionModel.addQuestion({ qname, op1, op2, op3, op4, answer, cid })
    .then(() => res.redirect('/question'))
    .catch((err) => res.status(500).send(err));
};

// Delete question
exports.deleteQuestion = (req, res) => {
  const qid = req.params.qid;
  QuestionModel.deleteQuestion(qid)
    .then(() => res.redirect('/question'))
    .catch((err) => res.status(500).send(err));
};
