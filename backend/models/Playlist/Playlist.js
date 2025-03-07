const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ""
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    thumbnailUrl: {
      type: String,
      default: null // Will use the first video's thumbnail by default
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public"
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    views: {
      type: Number,
      default: 0
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    isPremium: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      trim: true
    },
    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        role: {
          type: String,
          enum: ["editor", "viewer"],
          default: "viewer"
        }
      }
    ]
  },
  { timestamps: true }
);

// Virtual for getting video count
playlistSchema.virtual("videoCount").get(function () {
  return this.videos.length;
});

// Virtual for getting like count
playlistSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Calculating total duration of all videos
playlistSchema.methods.getTotalDuration = async function () {
  const Video = mongoose.model("Video");
  const videos = await Video.find({ _id: { $in: this.videos } });
  return videos.reduce((total, video) => total + (video.duration || 0), 0);
};

// Index for search functionality
playlistSchema.index({ title: "text", description: "text", tags: "text" });

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;