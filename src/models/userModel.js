// models/userModel.js

const conn = require("../config/connection");

// Admin functions
exports.createAdmin = (aname, apassword, callback) => {
  const sql = "INSERT INTO admin (aname, apassword) VALUES (?, ?)";
  conn.query(sql, [aname, apassword], callback);
};

exports.verifyAdminLogin = (aname, apassword, callback) => {
  const sql = "SELECT * FROM admin WHERE aname = ? AND apassword = ?";
  conn.query(sql, [aname, apassword], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Student functions
exports.createStudent = (sname, semail, spassword, scontact, callback) => {
  const sql = "INSERT INTO student (sname, semail, spassword, scontact) VALUES (?, ?, ?, ?)";
  conn.query(sql, [sname, semail, spassword, scontact], callback);
};

// Email-based student login verification
exports.verifyStudentLogin = (semail, spassword, callback) => {
  const sql = "SELECT * FROM student WHERE semail = ? AND spassword = ?";
  conn.query(sql, [semail, spassword], (err, results) => {
    if (err) return callback(err, null);
    if (results.length > 0) {
      return callback(null, results[0]);
    } else {
      return callback(null, null);
    }
  });
};
