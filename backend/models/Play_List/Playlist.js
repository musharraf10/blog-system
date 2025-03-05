const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailType: {
    type: String,
    enum: ['url', 'upload'],
    default: 'url',
  },
  thumbnail: {
    type: String, // Stores the URL for a thumbnail or a path for uploaded images
  },
  videoType: {
    type: String,
    enum: ['url', 'upload'],
    default: 'url',
  },
  video: {
    type: String, // Stores the URL for a video or path for an uploaded video
  },
});

// Schema for the playlist (including an array of video objects)
const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailType: {
    type: String,
    enum: ['url', 'upload'],
    default: 'url',
  },
  thumbnail: {
    type: String,
  },
  videoType: {
    type: String,
    enum: ['url', 'upload'],
    default: 'url',
  },
  video: {
    type: String,
  },
  videos: [videoSchema], // Array of video objects to store the added videos
  type: {
    type: String,
    enum: ['draft', 'submit'],
    default: 'draft',
  },
}, { collection: 'playlists' }); // Explicitly set collection name to 'playlists'

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
