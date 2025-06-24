const dashboardModel = require("../models/StudentDashboardModel");
const examModel = require("../models/examModel");

// STEP 1: Show exam schedule dropdown
exports.loadStudentWelcome = async (req, res) => {
  try {
    const sid = req.session.sid;
    if (!sid) return res.redirect("/student/login");

    const student = await dashboardModel.getStudentOnly(sid);
    const exams = await examModel.getAllExamsWithSchedule(); //  show cname, exname, schid

    res.render("AfterStudentLogin", { student, exams });
  } catch (err) {
    console.error("Error loading welcome:", err);
    res.status(500).send("Server error");
  }
};

// STEP 2: After schedule selection, assign schedule to student
exports.assignScheduleToStudent = async (req, res) => {
  const sid = req.session.sid;
  const schid = req.body.selectedExam;

  if (!sid) return res.redirect("/student/login");

  try {
    await dashboardModel.assignScheduleToStudent(sid, schid);
    res.redirect("/student/dashboard");
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.redirect("/student/dashboard"); // Already joined
    }
    console.error("Error assigning schedule:", err);
    res.status(500).send("Schedule assignment failed.");
  }
};

// STEP 3: Show dashboard with exam schedule
exports.loadStudentDashboard = async (req, res) => {
  try {
    const sid = req.session.sid;
    if (!sid) return res.redirect("/student/login");

    const data = await dashboardModel.getStudentDashboardData(sid);
    if (!data || data.exams.length === 0) {
      return res.send("No exams scheduled.");
    }

    res.render("StudentDashboard", { student: data.student, exams: data.exams });
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Server error");
  }
};
exports.loadStudentDashboard = (req, res) => {
  // Check if student is logged in
  if (!req.session.sid) {
    return res.redirect("/student/login");
  }

  // Send student info to EJS
  const student = {
    sid: req.session.sid,
    name: req.session.studentName,
    email: req.session.studentEmail,
    contact: req.session.studentContact
  };

  res.render("StudentDashboard", { student });
};
