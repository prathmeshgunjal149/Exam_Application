const StudentModel = require("../models/StudentProfileModel");
exports.getProfile = (req, res) => {
  const studentId = req.session.sid;

  console.log(" Session SID:", studentId); 

  if (!studentId) {
    return res.redirect("/student/login");
  }

  StudentModel.getStudentById(studentId, (err, student) => {
    if (err) {
      console.log(" DB Error:", err);
      return res.status(500).send("Error fetching profile.");
    }

   
    if (!student) {
      return res.status(404).send("Student not found.");
    }

    res.render("studentProfile", { student });
  });
};
