const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [200, "Title cannot be more than 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  
  
});


const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;