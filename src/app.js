// Import core modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

// Initialize app
const app = express();

// Database connection
const conn = require("./config/connection.js");

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public"))); // Static files (CSS, JS, images)

// Session setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // views folder is outside src/

// ------------------------------------
// ROUTES SETUP
// ------------------------------------

// Home/Login/Register routes
const homeRoutes = require("./routes/homeRouts");
app.use("/", homeRoutes);

const authRoutes = require('./routes/authRoutes');
app.use("/", authRoutes);

// Student dashboard
const studentDashboardRoutes = require("./routes/StudentDashboardRoutes");
app.use("/student", studentDashboardRoutes);

// Take exam functionality
const takeExamRoutes = require("./routes/TakeExamRoutes");
app.use("/", takeExamRoutes); // for e.g. /take-exam

// Subject management
const subjectRoutes = require('./routes/subjectRoutes');
app.use("/", subjectRoutes);

// Exam management
const examRoutes = require('./routes/examRoutes');
app.use("/", examRoutes);

// Question management
const questionRoutes = require('./routes/Question');
app.use("/question", questionRoutes); 

// Schedule management
const scheduleRoutes = require('./routes/scheduleroutes');
app.use("/", scheduleRoutes);

// Misc (contact, about, etc.)
const contactRoutes = require('./routes/ContactRoutes');
app.use("/", contactRoutes);

const aboutRoutes = require('./routes/AboutRoutes');
app.use("/", aboutRoutes);

// ------------------------------------
// const examStartRoutes = require("./routes/ExamStartRoutes");
// app.use("/", examStartRoutes);
const examStartRoutes = require("./routes/ExamStartRoutes");
app.use("/", examStartRoutes); 

const pdfDownloadRoutes = require("./routes/PdfDownloadRoutes");
app.use("/", pdfDownloadRoutes); 
// const pdfDownloadRoutes = require("./routes/PdfDownloadRoutes");
// app.use("/", pdfDownloadRoutes);
const studentProfileRoutes = require("./routes/StudentProfileRoutes");
app.use("/", studentProfileRoutes);
const scheduleRoutess = require("./routes/ExamSechduleRoutes");
app.use("/", scheduleRoutess);
const logoutRoutes = require("./routes/LogoutRoutes"); 
app.use("/", logoutRoutes);

module.exports = app;
