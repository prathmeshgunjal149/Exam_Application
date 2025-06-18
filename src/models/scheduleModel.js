const conn = require('../config/connection');

// Fetch both course and exam data together
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

const getAllSchedules = (callback) => {
  conn.query('SELECT * FROM schedule', callback);
};

const insertSchedule = (data, callback) => {
  const sql = 'INSERT INTO schedule (date, starttime, endtime, cid, ex_id) VALUES (?, ?, ?, ?, ?)';
  const values = [data.date, data.starttime, data.endtime, data.cid, data.ex_id];

  conn.query(sql, values, callback);
};

module.exports = {
  getCourseExamData,
  getAllSchedules,
  insertSchedule
};
