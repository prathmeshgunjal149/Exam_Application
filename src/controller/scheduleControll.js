const scheduleModel = require("../models/scheduleModel");

// Show Schedule Page
exports.getSchedulePage = (req, res) => {
  scheduleModel.getCourseExamData((err, result) => {
    if (err) {
      console.error("Error fetching course/exam data:", err);
      return res.send("Error fetching course/exam data");
    }

    scheduleModel.getAllSchedules((err2, schedules) => {
      if (err2) {
        console.error("Error fetching schedules:", err2);
        return res.send("Error fetching schedules");
      }

      res.render("schedule", {
        courses: result.courses,
        exams: result.exams,
        schedules: schedules
      });
    });
  });
};

// Insert New Schedule
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
    res.redirect("/schedule");
  });
};

// Delete Schedule
exports.deleteSchedule = (req, res) => {
  const id = req.query.id;

  scheduleModel.deleteSchedule(id, (err) => {
    if (err) {
      console.error("Error deleting schedule:", err);
      return res.send("Error deleting schedule");
    }
    res.redirect("/schedule");
  });
};

// Edit Page Load
exports.getEditSchedule = (req, res) => {
  const id = req.query.id;

  scheduleModel.getScheduleById(id, (err, schedule) => {
    if (err) {
      console.error("Error loading schedule:", err);
      return res.send("Error loading schedule");
    }

    scheduleModel.getCourseExamData((err2, result) => {
      if (err2) {
        console.error("Error loading dropdown data:", err2);
        return res.send("Error loading dropdown data");
      }

      res.render("EditSchedule", {
        schedule: schedule[0],
        courses: result.courses,
        exams: result.exams
      });
    });
  });
};

// Update Schedule
exports.updateSchedule = (req, res) => {
  const data = {
    schid: req.body.schid,
    date: req.body.date,
    starttime: req.body.starttime,
    endtime: req.body.endtime,
    cid: req.body.cid,
    ex_id: req.body.ex_id
  };

  scheduleModel.updateSchedule(data, (err) => {
    if (err) {
      console.error("Error updating schedule:", err);
      return res.send("Error updating schedule");
    }
    res.redirect("/schedule");
  });
};
