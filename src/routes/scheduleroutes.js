const express = require("express");
const router = express.Router();
const scheduleController = require("../controller/scheduleControll");

router.get("/schedule", scheduleController.getSchedulePage);
router.post("/schedule", scheduleController.postSchedule);

module.exports = router;