<<<<<<< HEAD
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
=======
import PlaylistVideo from "../../models/Play_List/Playlist.js";
import Tag from "../../models/Tags/Tags.js";

// Create a new playlist video
const createPlaylist = async (req, res) => {
  try {
    const { title, description, thumbnailType, thumbnail, videoType ,tags} = req.body;
    const video = req.file ? req.file.filename : null;

    // Validation: Ensure required fields are provided
    if (!title || !description || !thumbnail || !video) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPlaylist = new PlaylistVideo({
      title,
      description,
      thumbnailType,
      thumbnail,
      tags,
      videoType,
      video,
    });

    const createPost=new Post({
      author:req.user,
      status,
      contentData: "VideoTutorial",  
      refId: newPlaylist._id
    })
    

    for (const tagName of tags) {
      const tag = await Tag.findOneAndUpdate(
        { tagname: tagName },
        {
          $setOnInsert: { tagname: tagName, createdBy: req.user },
          $push: { allposts: createPost._id },
        },
        { new: true, upsert: true }
      );

    }

    await createPost.save()
    await newPlaylist.save()

    // Save the new playlist to the database
    const savedPlaylist = await newPlaylist.save();
    res.status(201).json(savedPlaylist);
  } catch (error) {
    console.error("Error creating playlist video:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all playlists
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await find();
    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get playlist by ID
const getPlaylistById = async (req, res) => {
  try {
    const playlist = await findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete a playlist
const deletePlaylist = async (req, res) => {
  try {
    const playlist = await findByIdAndDelete(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export default {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  deletePlaylist,
};
>>>>>>> c9b06aa2af46bb232545b8e9c7a91f7707e54f3c
