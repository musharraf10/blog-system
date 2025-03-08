const Tag =require("../../models/Tags/Tags.js");

const Article = require("../../models/article/article.js");
const Post = require("../../models/Post/Post.js");

const addarticleconroller = async (req, res) => {
  try {
    const { title, content, status, tags, price } = req.body;
    const thumbnail = req.file ? req.file.path : null; 

    if (!title || !content || !status) {
      return res.status(400).json({
        status: "error",
        message: "Title, content, and status are required.",
      });
    }

    // Create new article
    const newArticle = new Article({
      title,
      description: content,
      tags,
      thumbnail,
    });

    
    const createPost = new Post({
      author: req.user,
      status,
      contentData: "Article",
      refId: newArticle._id,
      price,
      thumbnail, 
    });

    await newArticle.save();
    await createPost.save();

    return res.status(201).json({
      status: "success",
      message: "Article created successfully!",
      article: newArticle,
      post: createPost,
    });
  } catch (error) {
    console.error("Error saving article:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create article. Please try again.",
    });
  }
};

const updateArticleController = async (req, res) => {
  try {
    const { title, content, status, tags, price } = req.body;
    const { id } = req.params;
    const thumbnail = req.file ? req.file.path : null;

    // Find the article
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({
        status: "error",
        message: "Article not found.",
      });
    }

    article.title = title || article.title;
    article.description = content || article.description;
    article.tags = tags || article.tags;
    if (thumbnail) article.thumbnail = thumbnail;

    const post = await Post.findOne({ refId: id, contentData: "Article" });
    if (post) {
      post.status = status || post.status;
      post.price = price || post.price;
      if (thumbnail) post.thumbnail = thumbnail;
      await post.save();
    }

    await article.save();

    return res.status(200).json({
      status: "success",
      message: "Article updated successfully!",
      article,
      post,
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update article. Please try again.",
    });
  }
};





 const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      

    return res.status(200).json({
      status: "success",
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch articles. Please try again.",
    });
  }
};


module.exports={addarticleconroller,getAllArticles,updateArticleController}