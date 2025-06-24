// controllers/StudentTakeExamController.js
const studentExamModel = require("../models/StudentExamModel");

exports.getScheduledExams = async (req, res) => {
  try {
    const sid = req.session.sid;
    console.log("SID in session:", req.session.sid); 

    if (!sid) return res.redirect("/student/login");

    const exams = await studentExamModel.getScheduledExamsForStudent(sid);
    res.render("StudentExamView", { exams });
  } catch (err) {
    console.error("Error loading student exams:", err);
    res.status(500).send("Internal server error");
  }
};


exports.startTest = (req, res) => {
  const schid = req.params.schid;
  res.send(`Starting test for schedule ID: ${schid}`);
};
