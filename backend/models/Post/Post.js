const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String},

    description: { type: String, required: true, trim: true },
    image: { type: Object },
    video: {
      type: Object, // Store video file metadata or URL
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    nextEarningDate: {
      type: Date,
      default: () =>
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1), // Default to the first day of the next month
    },
    publisheddate:{type:Date},
    thisMonthEarnings: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    lastCalculatedViewsCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    viewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);