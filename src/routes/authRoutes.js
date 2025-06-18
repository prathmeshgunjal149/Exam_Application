// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/authController");

// Admin
router.get("/admin/register", authCtrl.showAdminRegister);
router.post("/admin/register", authCtrl.adminRegister);
router.get("/admin/login", authCtrl.showAdminLogin);
router.post("/admin/login", authCtrl.adminLogin);

// Student
router.get("/student/register", authCtrl.showStudentRegister);
router.post("/student/register", authCtrl.studentRegister);
router.get("/student/login", authCtrl.showStudentLogin);
router.post("/student/login", authCtrl.studentLogin);





router.get("/adminRegister", (req, res) => res.redirect("/admin/register"));
router.get("/LoginStudent", (req, res) => res.redirect("/student/login"));
router.get("/register", (req, res) => res.redirect("/student/register"));
router.get("/login", (req, res) => res.redirect("/admin/login"));

module.exports = router;
