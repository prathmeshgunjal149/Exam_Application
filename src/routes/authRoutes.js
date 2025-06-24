const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// Admin Routes
router.get("/admin/register", authController.showAdminRegister);
router.post("/admin/register", authController.adminRegister);
router.get("/admin/login", authController.showAdminLogin);
router.post("/admin/login", authController.adminLogin);

// Student Routes
router.get("/student/register", authController.showStudentRegister);
router.post("/student/register", authController.studentRegister);
router.get("/student/login", authController.showStudentLogin);
router.post("/student/login", authController.studentLogin);

// Alias route to support /LoginStudent manually
router.get("/LoginStudent", (req, res) => res.redirect("/student/login"));

module.exports = router;
