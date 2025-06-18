// Import core modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

// Initialize app
const app = express();

// Database connection (ensure connection.js exports a working `conn`)
const conn = require("./config/connection.js");

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (CSS, images, JS)

// Session config (optional but added for login flow support)
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Set EJS as view engine
app.set("view engine", "ejs");

// ------------------------------------
// ROUTES SETUP
// ------------------------------------

// Home/Login/Register routes
const homeRoutes = require("./routes/homeRouts");
app.use("/", homeRoutes);
const authRoutes = require('./routes/authRoutes');
app.use("/", authRoutes);

// Subject management
const subjectRoutes = require('./routes/subjectRoutes');
app.use("/", subjectRoutes); // All subject URLs start with `/subject`

// Exam management
const examRoutes = require('./routes/examRoutes');
app.use("/", examRoutes); // All exam URLs start with `/exam`

// Question management
const questionRoutes = require('./routes/Question'); // (e.g. /admin/questions)
app.use("/", questionRoutes);

// Contact page (e.g. /contact)
const contactRoutes = require('./routes/ContactRoutes');
app.use("/", contactRoutes);

// About page (e.g. /about)
const aboutRoutes = require('./routes/AboutRoutes');
app.use("/", aboutRoutes);

// ------------------------------------
 const schedule = require('./routes/scheduleroutes');
app.use("/", schedule); 
const studentDashboardRoutes = require("./routes/StudentDashboardRoutes");
app.use("/student/dashboard", studentDashboardRoutes);

module.exports = app;
