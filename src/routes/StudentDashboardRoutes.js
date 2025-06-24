const express = require("express");
const router = express.Router();
const dashboardCtrl = require("../controller/StudentDashboardController");

// Step 1: Welcome screen
router.get("/", dashboardCtrl.loadStudentWelcome);

// Step 2: Assign schedule
router.post("/select-exam", dashboardCtrl.assignScheduleToStudent);

// Step 3: Dashboard
router.get("/dashboard", dashboardCtrl.loadStudentDashboard);

module.exports = router;
