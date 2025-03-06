const PlaylistVideo =require( "../../models/Play_List/Playlist.js");
const Tag = require("../../models/Tags/Tags.js");

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

module.exports= {
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  deletePlaylist,
};