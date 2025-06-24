// src/controller/ExamScheduleController.js
const scheduleModel = require("../models/ExamSechedule");

exports.showSchedule = (req, res) => {
  scheduleModel.getAllSchedules((err, schedules) => {
    if (err) return res.status(500).send("Failed to load schedule.");
    res.render("StudentExamSechdule", { schedules });
  });
};