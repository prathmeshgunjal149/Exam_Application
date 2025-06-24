const conn = require('../config/connection');

// Get all courses and exams for dropdown selection
const getCourseExamData = (callback) => {
  const courseQuery = 'SELECT * FROM course';
  const examQuery = 'SELECT * FROM exam';

  conn.query(courseQuery, (err, courses) => {
    if (err) return callback(err);

    conn.query(examQuery, (err2, exams) => {
      if (err2) return callback(err2);

      callback(null, { courses, exams });
    });
  });
};

// Get all schedules with JOIN to course and exam
const getAllSchedules = (callback) => {
  const sql = `
    SELECT sch.*, c.cname, e.exname 
    FROM schedule sch
    JOIN course c ON sch.cid = c.cid
    JOIN exam e ON sch.ex_id = e.ex_id
  `;
  conn.query(sql, callback);
};

// Insert a new schedule into the table
const insertSchedule = (data, callback) => {
  const sql = `
    INSERT INTO schedule (date, starttime, endtime, cid, ex_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [data.date, data.starttime, data.endtime, data.cid, data.ex_id];

  conn.query(sql, values, callback);
};

// Get a single schedule by ID – useful for edit
const getScheduleById = (id, callback) => {
  const sql = `
    SELECT sch.*, c.cname, e.exname
    FROM schedule sch
    LEFT JOIN course c ON sch.cid = c.cid
    LEFT JOIN exam e ON sch.ex_id = e.ex_id
    WHERE sch.schid = ?
  `;
  conn.query(sql, [id], callback);
};

//  Update an existing schedule
const updateSchedule = (id, data, callback) => {
  const sql = `
    UPDATE schedule
    SET date = ?, starttime = ?, endtime = ?, cid = ?, ex_id = ?
    WHERE schid = ?
  `;
  const values = [data.date, data.starttime, data.endtime, data.cid, data.ex_id, id];
  conn.query(sql, values, callback);
};

//Delete a schedule
const deleteSchedule = (id, callback) => {
  conn.query("DELETE FROM schedule WHERE schid = ?", [id], callback);
};

module.exports = {
  getCourseExamData,
  getAllSchedules,
  insertSchedule,
  getScheduleById,
  updateSchedule,
  deleteSchedule
};
