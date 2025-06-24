const conn = require("../config/connection");

// Fetch student details only
exports.getStudentOnly = (sid) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM student WHERE sid = ?", [sid], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

// Get all available exam schedules (for dropdown)
exports.getAllExams = () => {
  const sql = `
    SELECT sch.schid, c.cname, e.exname, sch.date, sch.starttime, sch.endtime
    FROM schedule sch
    JOIN course c ON sch.cid = c.cid
    JOIN exam e ON sch.ex_id = e.ex_id
  `;
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get student dashboard data (exam schedule assigned)
exports.getStudentDashboardData = async (sid) => {
  const student = await exports.getStudentOnly(sid);
  const exams = await exports.getScheduledExamsForStudent(sid);
  return { student, exams };
};

//  Existing: Get assigned schedule info for student
exports.getScheduledExamsForStudent = (sid) => {
  const sql = `
    SELECT s.sname, c.cname, sch.date, sch.starttime, sch.endtime, e.exname, e.totalmark, e.passingmark, sch.schid
    FROM student s
    JOIN student_schedule_join ssj ON s.sid = ssj.sid
    JOIN schedule sch ON ssj.schid = sch.schid
    JOIN course c ON sch.cid = c.cid
    JOIN exam e ON sch.ex_id = e.ex_id
    WHERE s.sid = ?
  `;
  return new Promise((resolve, reject) => {
    conn.query(sql, [sid], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

//  NEW: Insert schedule mapping for student
exports.assignScheduleToStudent = (sid, schid) => {
  const sql = "INSERT INTO student_schedule_join (sid, schid) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    conn.query(sql, [sid, schid], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          // Already assigned, just resolve silently
          return resolve(null);
        }
        return reject(err);
      }
      resolve(result);
    });
  });
};
