const multer = require("multer");
const path = require("path");

// Set up storage engine using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("image");

exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to upload image", details: err });
    }
    res.json({
      message: "Image uploaded successfully",
      file: req.file,
    });
  });
};
