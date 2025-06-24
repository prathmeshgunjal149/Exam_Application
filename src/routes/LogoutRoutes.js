// routes/logoutRoutes.js (or similar)
const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Logout error:", err);
      return res.send("Error logging out.");
    }
    //  Redirect to Home page after logout
    res.redirect("/");
  });
});

module.exports = router;
