const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Article Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',  
  //   required: true
  // },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected","draft"]
  },
  categorylist:[ {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Category",
     }],

  
 
  viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  
  }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

  publishedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
  }
});

// Create the Article model
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
