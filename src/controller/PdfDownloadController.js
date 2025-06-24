// src/controllers/pdfDownloadController.js
const pdfDownloadService = require("../services/PdfDownloadService");

exports.showDownloadPage = (req, res) => {
  res.render("pdfdownload");
};

exports.generatePdf = async (req, res) => {
  try {
    const resultData = req.session.lastResult;
    if (!resultData) return res.status(400).send("No result found to generate PDF.");

    await pdfDownloadService.createResultPdf(resultData, res);
  } catch (err) {
    console.error("PDF error:", err);
    res.status(500).send("Failed to generate PDF.");
  }
};
