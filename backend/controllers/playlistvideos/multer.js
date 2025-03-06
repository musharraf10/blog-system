const multer = require("multer");
const path = require("path");

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure that the "uploads/" folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Timestamp for unique filenames
  },
});

// Single file upload middleware (for video)
const uploadSingle = multer({ storage }).single("video");

// Multiple file upload middleware (for multiple videos)
const uploadMultiple = multer({ storage }).array("videos", 10);

module.exports = { uploadSingle, uploadMultiple };
