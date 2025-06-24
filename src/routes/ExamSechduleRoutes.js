
const express = require("express");
const router = express.Router();


const scheduleController = require("../controller/ExamSecheduleController");


router.get("/student/schedule", scheduleController.showSchedule);

module.exports = router;
