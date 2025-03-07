// server/routes/playlists.js
const express = require('express');
const Playlistrouter = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');

// Models
const Playlist = require('../models/Playlist');
const Video = require('../models/Video');
const User = require('../models/User');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'videos',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'png', 'mp4', 'mov', 'avi', 'wmv'],
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`
  }
});

const upload = multer({ storage });

// Get all public playlists
Playlistrouter.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find({ isPublished: true })
      .populate('creator', 'name avatar')
      .select('title description thumbnailUrl videoCount createdAt');
    
    res.json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get creator's playlists
Playlistrouter.get('/creator', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ creator: req.user.id })
      .select('title description thumbnailUrl isPublished videoCount createdAt');
    
    res.json(playlists);
  } catch (error) {
    console.error('Error fetching creator playlists:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get playlist by ID (with videos)
Playlistrouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findById(id)
      .populate('creator', 'name avatar')
      .populate({
        path: 'videos',
        select: 'title description thumbnailUrl videoUrl duration views likes dislikes createdAt'
      });
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    // If playlist is not published, only creator can access it
    if (!playlist.isPublished) {
      // Check if user is authenticated and is the creator
      if (!req.user || req.user.id !== playlist.creator._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
    }
    
    res.json(playlist);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new playlist
Playlistrouter.post('/', auth, async (req, res) => {
  try {
    const { title, description, isPublished } = req.body;
    
    const newPlaylist = new Playlist({
      title,
      description,
      creator: req.user.id,
      isPublished: isPublished || false,
      videos: []
    });
    
    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update playlist
Playlistrouter.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isPublished } = req.body;
    
    // Find playlist and verify ownership
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    if (playlist.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this playlist' });
    }
    
    // Update fields
    playlist.title = title || playlist.title;
    playlist.description = description !== undefined ? description : playlist.description;
    playlist.isPublished = isPublished !== undefined ? isPublished : playlist.isPublished;
    
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    console.error('Error updating playlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle publish status
Playlistrouter.put('/:id/publish', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;
    
    // Find playlist and verify ownership
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    if (playlist.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this playlist' });
    }
    
    playlist.isPublished = isPublished;
    await playlist.save();
    
    res.json({ success: true, isPublished });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reorder videos in playlist
Playlistrouter.put('/:id/reorder', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { videoIds } = req.body;
    
    if (!videoIds || !Array.isArray(videoIds)) {
      return res.status(400).json({ message: 'Video IDs array is required' });
    }
    
    // Find playlist and verify ownership
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    if (playlist.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this playlist' });
    }
    
    // Verify all videos exist in the playlist
    const currentVideoIds = playlist.videos.map(v => v.toString());
    const allVideosExist = videoIds.every(id => currentVideoIds.includes(id));
    
    if (!allVideosExist || videoIds.length !== currentVideoIds.length) {
      return res.status(400).json({ message: 'Invalid video IDs provided' });
    }
    
    // Update order
    playlist.videos = videoIds;
    await playlist.save();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error reordering videos:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add video to playlist
Playlistrouter.post('/:id/videos', auth, upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    // Find playlist and verify ownership
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    if (playlist.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this playlist' });
    }
    
    // Check if video file was uploaded
    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: 'Video file is required' });
    }
    
    // Get file info
    const videoFile = req.files.video[0];
    let thumbnailUrl = null;
    
    if (req.files.thumbnail) {
      thumbnailUrl = req.files.thumbnail[0].path;
    } else {
      // Generate thumbnail from video or use a default
      thumbnailUrl = '/default-thumbnail.jpg';
    }
    
    // Calculate video duration (you may want to use ffprobe or similar)
    // This is a placeholder
    const duration = 0; // Will be updated when video is processed
    
    // Create new video
    const newVideo = new Video({
      title,
      description,
      creator: req.user.id,
      videoUrl: videoFile.path,
      thumbnailUrl,
      duration,
      views: 0,
      likes: [],
      dislikes: []
    });
    
    await newVideo.save();
    
    // Add video to playlist
    playlist.videos.push(newVideo._id);
    playlist.videoCount = playlist.videos.length;
    
    // Update playlist thumbnail if it doesn't have one
    if (!playlist.thumbnailUrl) {
      playlist.thumbnailUrl = thumbnailUrl;
    }
    
    await playlist.save();
    
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error adding video to playlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove video from playlist
Playlistrouter.delete('/:playlistId/videos/:videoId', auth, async (req, res) => {
  try {
    const { playlistId, videoId } = req.params;
    
    // Find playlist and verify ownership
    const playlist = await Playlist.findById(playlistId);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    if (playlist.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this playlist' });
    }
    
    // Check if video exists in playlist
    const videoIndex = playlist.videos.findIndex(vid => vid.toString() === videoId);
    
    if (videoIndex === -1) {
      return res.status(404).json({ message: 'Video not found in playlist' });
    }
    
    // Remove video from playlist
    playlist.videos.splice(videoIndex, 1);
    playlist.videoCount = playlist.videos.length;
    
    // Update thumbnail if needed
    if (playlist.videos.length > 0 && playlist.videoCount === 0) {
      const firstVideo = await Video.findById(playlist.videos[0]);
      playlist.thumbnailUrl = firstVideo ? firstVideo.thumbnailUrl : null;
    } else if (playlist.videos.length === 0) {
      playlist.thumbnailUrl = null;
    }
    
    await playlist.save();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing video from playlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete playlist
Playlistrouter.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find playlist and verify ownership
    const playlist = await Playlist.findById(id);
    
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    
    if (playlist.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this playlist' });
    }
    
    // NOTE: We're only deleting the playlist, not the videos within it
    // Videos can be part of multiple playlists
    await Playlist.deleteOne({ _id: id });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting playlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trending playlists
Playlistrouter.get('/discover/trending', async (req, res) => {
  try {
    // Get playlists with most views in last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    // You would need to track views on playlists or calculate based on video views
    // This is a simplified version that just gets recently active playlists
    const trendingPlaylists = await Playlist.find({ 
      isPublished: true,
      updatedAt: { $gte: oneWeekAgo }
    })
    .populate('creator', 'name avatar')
    .sort({ videoCount: -1 }) // Sort by most videos as a proxy for activity
    .limit(10);
    
    res.json(trendingPlaylists);
  } catch (error) {
    console.error('Error fetching trending playlists:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recommended playlists for user
Playlistrouter.get('/discover/recommended', auth, async (req, res) => {
  try {
    // Find user's playlists to get their interests
    const userPlaylists = await Playlist.find({ creator: req.user.id });
    
    // Simple recommendation: find playlists with similar titles/descriptions
    // In a real app, you'd want a more sophisticated recommendation system
    let recommendedPlaylists = [];
    
    if (userPlaylists.length > 0) {
      // Get keywords from user's playlists
      const keywords = userPlaylists.map(p => p.title.split(' ')).flat();
      
      // Find playlists with similar keywords
      const searchPromises = keywords.map(keyword => 
        Playlist.find({ 
          isPublished: true,
          creator: { $ne: req.user.id },
          $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } }
          ]
        })
        .populate('creator', 'name avatar')
        .limit(2)
      );
      
      const results = await Promise.all(searchPromises);
      recommendedPlaylists = Array.from(new Set(results.flat())).slice(0, 10);
    }
    
    // If we don't have enough recommendations, add some popular playlists
    if (recommendedPlaylists.length < 10) {
      const popularPlaylists = await Playlist.find({ 
        isPublished: true,
        creator: { $ne: req.user.id },
        _id: { $nin: recommendedPlaylists.map(p => p._id) }
      })
      .populate('creator', 'name avatar')
      .sort({ videoCount: -1 })
      .limit(10 - recommendedPlaylists.length);
      
      recommendedPlaylists = [...recommendedPlaylists, ...popularPlaylists];
    }
    
    res.json(recommendedPlaylists);
  } catch (error) {
    console.error('Error fetching recommended playlists:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = Playlistrouter;