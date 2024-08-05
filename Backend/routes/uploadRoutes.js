const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const path = require("path");
const fs = require("fs");
router.post("/upload", uploadController.uploadImage);

router.get("/images", (req, res) => {
    const uploadsDir = path.join(__dirname, "../uploads");
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: "Failed to list images", details: err });
      }
      const imageUrls = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file}`);
      res.json({ images: imageUrls });
    });
  });
  
module.exports = router;
