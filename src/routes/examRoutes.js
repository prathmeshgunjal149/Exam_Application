const express = require('express');// import express
const router = express.Router();// import express module and create router
const examCtrl = require('../controller/examController');// importing the controller

// Show exam list + form
router.get('/exam', examCtrl.getExamPage);//to call the getExamPage function in examController.js file

// Add new exam
router.post('/exam', examCtrl.postAddExam);// to call the postAddExam function in examController.js file

// Update exam 
router.get('/exam/update', examCtrl.getUpdateForm);//to call the getUpdateForm function in examController.js file
router.post('/exam/update', examCtrl.postUpdateExam);// to call the postUpdateExam function in examController.js file

// Delete exam
router.get('/exam/delete', examCtrl.deleteExam);// to call the deleteExam function in examController.js file
router.get("/exam/update", examCtrl.getUpdateForm);// to call the getUpdateForm function in examController.js file
router.post("/exam/update", examCtrl.postUpdateExam);// to call the postUpdateExam function in examController.js file

module.exports = router;// export the router module
