const conn = require("../config/connection");

// Fetch student data by ID
const getStudentDashboardData = (sid) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM student WHERE sid = ?", [sid], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]); // Return single student
    });
  });
};

module.exports = { getStudentDashboardData };
