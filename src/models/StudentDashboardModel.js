const conn = require("../config/connection");

// Get student basic info
exports.getStudentOnly = (sid) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM student WHERE sid = ?", [sid], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

// Assign student to schedule
exports.assignScheduleToStudent = (sid, schid) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO student_schedule_join (sid, schid) VALUES (?, ?)";
    conn.query(sql, [sid, schid], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Load student dashboard data
exports.getStudentDashboardData = (sid) => {
  return new Promise((resolve, reject) => {
    const sqlStudent = "SELECT * FROM student WHERE sid = ?";
    const sqlExams = `
      SELECT sch.schid, c.cname, e.exname, sch.date, sch.starttime, sch.endtime
      FROM student_schedule_join ssj
      JOIN schedule sch ON ssj.schid = sch.schid
      JOIN course c ON sch.cid = c.cid
      JOIN exam e ON sch.ex_id = e.ex_id
      WHERE ssj.sid = ?
    `;

    conn.query(sqlStudent, [sid], (err, studentResult) => {
      if (err) return reject(err);
      conn.query(sqlExams, [sid], (err2, examsResult) => {
        if (err2) return reject(err2);
        resolve({ student: studentResult[0], exams: examsResult });
      });
    });
  });
};
