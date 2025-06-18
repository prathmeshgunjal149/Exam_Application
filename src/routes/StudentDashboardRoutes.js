const express = require("express");
const router = express.Router();
const dashboardCtrl = require("../controller/StudentDashboardController");

// Route for student dashboard
router.get("/", dashboardCtrl.loadStudentDashboard);

module.exports = router;
