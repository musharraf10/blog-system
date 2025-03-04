const mongoose = require("mongoose");
const Content = require("../Content/Content");

const postSchema = new mongoose.Schema(
  { 
    contentData:{
      type:String,
      enum:["Article","Webinar"],
    },
    refId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      refPath:'contentData'
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookmarkedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    price: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected","draft"],
      default: "pending",
    },
    category:[ {
        enum:["article","webinar","video","step-by-step-guide","video-tutorials"]
    }],
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
    sample  : { type: String},
  },
  { timestamps: true },

);

module.exports = mongoose.model("Post", postSchema);