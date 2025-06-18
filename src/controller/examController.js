const examModel = require('../models/examModel');
const conn = require("../config/connection");

exports.getExamPage = // getExamPage function 
(req, res) => {
  examModel.fetchAllExams()// fetch all exams from database fetchallaexam stored in exam model
    .then // then function to handle the data
    (examList => 
        {
      res.render('exam', { examList });// render the exam page with the exam list
    })
    .catch(err => res.send("Error loading exams"));// catch any errors and send error message
};

exports.postAddExam = (req, res) =>  // postAddExam function
     {
  const { ename, total, passing } = req.body;
  examModel.addExam(ename, total, passing)// add exam to database using exam model
    .then(() => res.redirect('/exam'))
    .catch(err => res.send("Failed to add exam")); // redirect to exam page after adding exam
};

exports.getUpdateForm = (req, res) => // getUpdateForm function
    {
  const id = req.query.id;
  // Optional: load update form with current values
};

exports.postUpdateExam = (req, res) => {
  const { id, ename, total, passing } = req.body;// get the id and other fields from the request body
  examModel.updateExam(id, ename, total, passing) // update exam in database using exam model
    .then(() => res.redirect('/exam'))
    .catch(err => res.send("Failed to update exam"));// redirect to exam page after updating exam
};

exports.deleteExam = (req, res) =>// deleteExam function
    {
  const id = req.query.id;// get id from query string
  examModel.deleteExam(id) // delete exam from database using exam model
    .then(() => res.redirect('/exam'))
    .catch(err => res.send("Failed to delete exam"));
};
// Render the update form
exports.getUpdateForm = (req, res) => // getUpdateForm function
    {
  const examId = req.query.id;
  conn.query("SELECT * FROM exam WHERE ex_id = ?", [examId], (err, results) => {
    if (err) return res.status(500).send("Error loading exam"); // Return 500 error if query fails
    res.render("updateExam", { exam: results[0] }); // Render the update form with the exam data
  });
};
// Handle the update form POST
exports.postUpdateExam = (req, res) => // postUpdateExam function
    {
  const { examId, ename, totalMarks, passingMarks } = req.body;// get the exam id and other details from the request body
  const sql = "UPDATE exam SET exname = ?, totalmark = ?, passingmark = ? WHERE ex_id = ?";// SQL query to update exam details
  conn.query(sql, [ename, totalMarks, passingMarks, examId], (err, result) => { // update the exam in the database
    if (err) return res.status(500).send("Error updating exam"); // return an error if there is an error
    res.redirect("/exam"); // redirect to the exam page after updating the exam
  });
};
