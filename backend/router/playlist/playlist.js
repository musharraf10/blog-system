const express = require("express");
const { uploadSingle, uploadMultiple } = require("../../controllers/playlistvideos/multer");
const {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  deletePlaylist,
} = require("../../controllers/playlistvideos/playlist").default;

const router = express.Router();

// Route to create a new playlist video (Single video upload)
router.post("/create", uploadSingle, createPlaylist);

// Route to get all playlists
router.get("/", getAllPlaylists);

// Route to get a single playlist by ID
router.get("/:id", getPlaylistById);

// Route to delete a playlist
router.delete("/:id", deletePlaylist);

module.exports = router;
