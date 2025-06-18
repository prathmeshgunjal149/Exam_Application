const dashboardModel = require("../models/StudentDashboardModel");

// Controller to render student dashboard
const loadStudentDashboard = async (req, res) => {
  try {
    const sid = req.session.sid; // Store sid in session during login
    if (!sid) return res.redirect("/student/login");

    const student = await dashboardModel.getStudentDashboardData(sid);
    if (!student) return res.send("Student not found.");

    res.render("StudentDashboard", { student });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { loadStudentDashboard };
