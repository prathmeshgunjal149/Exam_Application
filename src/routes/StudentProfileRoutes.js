const express = require("express");
const router = express.Router();
const profileController = require("../controller/StudentProfileControll");

router.get("/student/profile", profileController.getProfile);

module.exports = router;
