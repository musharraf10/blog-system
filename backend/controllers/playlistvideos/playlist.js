const Playlist = require("../../models/Playlistvideos/Playlistvideos");
const multer = require("multer");
const path = require("path");

// Multer configuration within the controller
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage }).single("imagedata");

const addplaylistvideos = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { imageUrl } = req.body;
      let photos = [];

      if (imageUrl) {
        photos.push({ filetype: "url", value: imageUrl });
      }

      if (req.file) {
        const filePath = `http://localhost:${
          process.env.PORT || 5000
        }/uploads/${req.file.filename}`;
        photos.push({ filetype: req.file.mimetype, value: filePath }); // Use mimetype
      }

      if (photos.length === 0) {
        return res
          .status(400)
          .json({ message: "No image URL or file uploaded" });
      }

      const newPlaylist = new Playlist({ photos });
      const savedPlaylist = await newPlaylist.save();

      res.status(201).json({
        message: "Playlist item saved successfully",
        playlist: savedPlaylist,
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  });
};

module.exports = addplaylistvideos;
