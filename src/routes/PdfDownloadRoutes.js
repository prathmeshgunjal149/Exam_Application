// src/routes/pdfDownloadRoutes.js
const express = require("express");
const router = express.Router();
const pdfDownloadController = require("../controller/PdfDownloadController");

router.get("/student/download", pdfDownloadController.showDownloadPage);
router.post("/exam/download-pdf", pdfDownloadController.generatePdf);

module.exports = router;
