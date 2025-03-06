const express = require("express");
<<<<<<< HEAD

const isAuthenticated = require("../../middlewares/isAuthenticated.js");
const  addplaylistvideos = require("../../controllers/playlistvideos/playlist.js");
const upload = require("../../controllers/playlistvideos/multer.js");

const playlistRouter = express.Router();



playlistRouter.post(
    "/addplaylist",
    isAuthenticated,
    // (req, res, next) => {
    //     if (req.body.imageUrl) {
    //         next();
    //     } else {
    //         upload.single("imagedata")(req, res, next);
    //     }
    // },
    addplaylistvideos
);
module.exports = playlistRouter;
=======
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
>>>>>>> c9b06aa2af46bb232545b8e9c7a91f7707e54f3c
