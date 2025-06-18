const express = require("express");
const router = express.Router();
const conn = require('../config/connection'); // for the DB connection

// Home Page
router.get("/", (req, res) => {
  res.render("home");// render the home page means render the home.ejs file
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login");//render the login page means render the login.ejs file
});

// Register Page
router.get("/register", (req, res) => {
  res.render("register");//render the register page means render the register.ejs file
});

// Admin Dashboard 
router.get("/admin", (req, res) => {
  res.render("AdminDashboard", { adminName: "Admin" }); // add the adminName variable to the AdminDashboard.ejs file
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;  /// get the username and password from the request body

  const sql = "SELECT * FROM admin WHERE aname = ? AND apassword = ?";// sql query for check name in database admin table
  conn.query(sql, [username, password], (err, result) => {
    if (err) //check if there is an error then show the error on console
      {
      console.error("Database error:", err);
      return res.send("Error during login.");
    }

    if (result.length > 0) {
      // Pass admin name to the dashboard
      res.render("AdminDashboard", { adminName: result[0].aname });// if result is ok then render the AdminDashboard page with admin name
    } else {
      res.send("Invalid credentials.");// otherwise send msg to user
    }
  });
});

// Handle Student Registration
router.post("/register", (req, res) => {
  const { fullname, email, password, contact } = req.body;

  const sql = `INSERT INTO student (sname, semail, spassword, scontact)
               VALUES (?, ?, ?, ?)`;

  conn.query(sql, [fullname, email, password, contact], (err, result) => {
    if (err) {
      console.error("Registration error:", err);
      return res.send("Registration failed — email/contact may already exist.");
    }

    res.send("Student registered successfully!");
  });
});

module.exports = router;
