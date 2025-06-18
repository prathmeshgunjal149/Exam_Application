const userModel = require("../models/userModel");

// Admin Registration Page
exports.showAdminRegister = (req, res) => {
  res.render("adminRegister");
};

// Admin Registration Logic
exports.adminRegister = (req, res) => {
  const { aname, apassword } = req.body;
  userModel.createAdmin(aname, apassword, (err) => {
    if (err) return res.send("Error registering admin.");
    res.redirect("/admin/login");
  });
};

// Admin Login Page
exports.showAdminLogin = (req, res) => {
  res.render("login");
};

// Admin Login Logic
exports.adminLogin = (req, res) => {
  const { aname, apassword } = req.body;
  userModel.verifyAdminLogin(aname, apassword, (err, admin) => {
    if (err || !admin) return res.send("Invalid admin credentials.");
    res.redirect("/admin/dashboard");
  });
};

// Student Registration Page
exports.showStudentRegister = (req, res) => {
  res.render("register");
};

// Student Registration Logic
exports.studentRegister = (req, res) => {
  const { sname, semail, spassword, scontact } = req.body;
  userModel.createStudent(sname, semail, spassword, scontact, (err) => {
    if (err) return res.send("Error registering student.");
    res.redirect("/student/login");
  });
};

// Student Login Page
exports.showStudentLogin = (req, res) => {
  res.render("LoginStudent");
};


exports.studentLogin = (req, res) => {
  const { semail, spassword } = req.body;

  userModel.verifyStudentLogin(semail, spassword, (err, student) => {
    if (err || !student) {
      console.log("Invalid student login:", semail);
      return res.send("Invalid student credentials.");
    }

    req.session.sid = student.sid; // Save student ID in session
    res.redirect("/student/dashboard");
  });
};
