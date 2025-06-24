const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// GET route for admin register page
router.get("/adminRegister", authController.showAdminRegister);

module.exports = router;
