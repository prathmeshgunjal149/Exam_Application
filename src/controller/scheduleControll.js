const scheduleModel = require("../models/scheduleModel");
exports.getSchedulePage = (req, res) => {
  scheduleModel.getCourseExamData((err, result) => {
    if (err) {
      console.error("Error fetching course/Exam:", err);
      return res.send("Error fetching data");
    }

    scheduleModel.getAllSchedules((err2, schedules) => {
      if (err2) {
        console.error("Error loading schedules:", err2);
        return res.send("Error loading schedule");
      }

      res.render("schedule", {
        courses: result.courses,
        exams: result.exams,
        schedules: schedules
      });
    });
  });
};

exports.postSchedule = (req, res) => {
  const data = {
    date: req.body.date,
    starttime: req.body.starttime,
    endtime: req.body.endtime,
    cid: req.body.cid,
    ex_id: req.body.ex_id
  };

  scheduleModel.insertSchedule(data, (err) => {
    if (err) {
      console.error("Error inserting schedule:", err);
      return res.send("Error inserting schedule");
    }
    res.redirect("schedule");
  });
};