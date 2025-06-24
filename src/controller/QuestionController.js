const QuestionModel = require('../models/QuestionModel');
const conn = require('../config/connection');

// Add new question
exports.addQuestion = (req, res) => {
  const { qname, op1, op2, op3, op4, answer, cid } = req.body;

  QuestionModel.addQuestion({ qname, op1, op2, op3, op4, answer, cid })
    .then(() => res.redirect('/question?page=1'))
    .catch((err) => {
      console.error("Add Question Error:", err);
      res.status(500).send("Failed to add question");
    });
};

// Delete question
exports.deleteQuestion = (req, res) => {
  const qid = req.params.qid;

  QuestionModel.deleteQuestion(qid)
    .then(() => res.redirect('/question?page=1'))
    .catch((err) => {
      console.error("Delete Question Error:", err);
      res.status(500).send("Failed to delete question");
    });
};

// Paginated question list
exports.getQuestionPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  try {
    const [questions] = await QuestionModel.getPaginatedQuestions(limit, offset);
    const [countResult] = await QuestionModel.getTotalQuestionCount();
    const totalQuestions = countResult[0].count;
    const totalPages = Math.ceil(totalQuestions / limit);
    const [courses] = await conn.promise().query("SELECT * FROM course");

    res.render("question", {
      questions,
      courses,
      currentPage: page,
      totalPages
    });
  } catch (err) {
    console.error("Load Questions Error:", err);
    res.status(500).send("Error loading questions");
  }
};

// Show edit form
exports.editQuestionForm = async (req, res) => {
  const qid = req.params.qid;

  try {
    const [questionData] = await QuestionModel.getQuestionById(qid);
    const [courses] = await conn.promise().query("SELECT * FROM course");

    if (!questionData || questionData.length === 0) {
      return res.status(404).send("Question not found");
    }

    res.render("EditQuestion", {
      question: questionData[0],
      courses
    });
  } catch (err) {
    console.error("Edit Question Load Error:", err);
    res.status(500).send("Error loading question for editing");
  }
};

// Update question
exports.updateQuestion = (req, res) => {
  const qid = req.params.qid;
  const updatedData = req.body;

  QuestionModel.updateQuestion(qid, updatedData)
    .then(() => res.redirect('/question?page=1'))
    .catch((err) => {
      console.error("Update Question Error:", err);
      res.status(500).send("Failed to update question");
    });
};
