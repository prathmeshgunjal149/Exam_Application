const examStartServices = require("../services/examStartServices");

//  Start Exam Handler
exports.startExam = async (req, res) => {
  try {
    const schid = req.params.schid;
    req.session.schid = schid; // Save in session for later use
    const questions = await examStartServices.fetchQuestionsBySchedule(schid);

    res.render("ExamStart", {
      questions,
      currentPage: 1
    });
  } catch (error) {
    console.error("Error starting exam:", error);
    res.status(500).send("Internal Server Error");
  }
};

//  Submit Exam Handler with session store for PDF
exports.submitExam = async (req, res) => {
  try {
    const submittedAnswers = req.body;
    const schid = req.session.schid;
    const allQuestions = await examStartServices.fetchQuestionsBySchedule(schid);

    let correct = 0;
    let wrong = 0;
    const resultDetails = [];

    allQuestions.forEach((q) => {
      const submitted = submittedAnswers[`q${q.qid}`];
      const isCorrect = parseInt(submitted) === q.correctop;

 resultDetails.push({
  question: q.qname,
  submitted: submitted || "Not Attempted",
  correctOptionNumber: q.correctop,                        // this is 1,2,3,4
  correctOptionText: q[`op${q.correctop}`],                // this gets op1, op2...
  isCorrect
});

      if (isCorrect) correct++;
      else wrong++;
    });

    //  Store result in session for PDF download
 req.session.lastResult = {
  studentName: req.session.studentName || "Student",
  studentEmail: req.session.studentEmail || "Not Provided",
  studentContact: req.session.studentContact || "Not Provided",
  total: allQuestions.length,
  correct,
  wrong,
  resultDetails
};

    res.render("ExamResult", req.session.lastResult);

  } catch (err) {
    console.error("Error in submitExam:", err);
    res.status(500).send("Submission failed.");
  }
};