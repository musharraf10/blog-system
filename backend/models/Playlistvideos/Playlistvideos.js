// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const PlaylistSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Playlist name is required"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       trim: true,
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected", "draft"],
//       default: "draft",
//       index: true,
//     },
//     videos: [
//       {
//         title: {
//           type: String,
//           required: [true, "Title is required"],
//           trim: true,
//         },
//         description: {
//           type: String,
//           required: [true, "Description is required"],
//           trim: true,
//         },
//         thumbnail: {
//           type: String,
//           required: [true, "Thumbnail is required"],
//         },
//         videoType: {
//           type: String,
//           enum: ["external", "uploaded"],
//           required: [true, "Video type is required"],
//         },
//         videoUrl: {
//           type: String,
//           validate: {
//             validator: function (v) {
//               if (this.videoType === "external") {
//                 return /^https?:\/\/.+\..+$/.test(v); // Validate only for external links
//               }
//               return true;
//             },
//             message: "Invalid video URL",
//           },
//         },
//         videoFile: {
//           type: String, // Store the file path in the database
//           required: function () {
//             return this.videoType === "uploaded"; // Required only for uploaded videos
//           },
//         },
//         duration: {
//           type: Number,
//           required: [true, "Duration is required"],
//         },
//         tags: [
//           {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Tag",
//           },
//         ],
//       },
//     ],
//     playlisttags: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Tag",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Playlist = mongoose.model("Playlist", PlaylistSchema);
// module.exports =  Playlist ;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  photos: [
    {
      filetype: { type: String, required: true }, // MIME type or "url"
      value: { type: String, required: true }, // Stores filename or URL
    },
  ],
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
