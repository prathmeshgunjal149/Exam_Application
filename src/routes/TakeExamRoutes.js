// routes/takeExamRoutes.js
const express = require("express");
const router = express.Router();
const takeExamCtrl = require("../controller/StudentTakeExamController");

router.get("/student/exams", takeExamCtrl.getScheduledExams);
router.get("/student/start-test/:schid", takeExamCtrl.startTest);

module.exports = router;
