const conn = require("../config/connection");

exports.getStudentById = (sid, callback) => {
  const query = `
    SELECT s.sid, s.sname, s.semail, s.scontact, ssj.schid
    FROM student s
    LEFT JOIN student_schedule_join ssj ON s.sid = ssj.sid
    WHERE s.sid = ?
    LIMIT 1
  `;

  conn.query(query, [sid], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0]);
  });
};
