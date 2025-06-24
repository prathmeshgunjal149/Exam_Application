// src/models/ExamSechedule.js
const conn = require("../config/connection");

exports.getAllSchedules = (callback) => {
  const sql = `
    SELECT schid, date, starttime, endtime, cname, exname 
    FROM schedule 
    JOIN course ON schedule.cid = course.cid 
    JOIN exam ON schedule.ex_id = exam.ex_id
    ORDER BY date ASC
  `;
  conn.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
