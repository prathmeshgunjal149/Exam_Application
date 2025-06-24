const express = require("express");
const router = express.Router();
const examStartController = require("../controller/ExamStartControll");

router.get("/exam/start/:schid", examStartController.startExam); 
router.post("/exam/submit", examStartController.submitExam);     

module.exports = router;
