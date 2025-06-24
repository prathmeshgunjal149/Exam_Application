const conn = require("../config/connection");

exports.createAdmin = (aname, apassword, callback) => {
  conn.query("INSERT INTO admin (aname, apassword) VALUES (?, ?)", [aname, apassword], callback);
};

exports.verifyAdminLogin = (aname, apassword, callback) => {
  conn.query("SELECT * FROM admin WHERE aname = ? AND apassword = ?", [aname, apassword], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0] || null);
  });
};

exports.createStudent = (sname, semail, spassword, scontact, callback) => {
  conn.query("INSERT INTO student (sname, semail, spassword, scontact) VALUES (?, ?, ?, ?)", [sname, semail, spassword, scontact], callback);
};

exports.verifyStudentLogin = (semail, spassword, callback) => {
  conn.query("SELECT * FROM student WHERE semail = ? AND spassword = ?", [semail, spassword], (err, result) => {
    if (err) return callback(err);
    callback(null, result[0] || null);
  });
};
