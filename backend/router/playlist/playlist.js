const express = require("express");

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
