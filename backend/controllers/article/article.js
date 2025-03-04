const Tag =require("../../models/tags/tags.js");

const Article = require("../../models/article/article.js");
const Post = require("../../models/Post/Post.js");

const addarticleconroller = async (req, res) => {
  const { title, content, status, tags } = req.body;

  if (!title || !content || !status) {
    return res.status(400).json({
      status: "error",
      message: "Title, content, and status are required.",
    });
  }

  try {
    const newArticle = new Article({
      title,
      description: content
    });

    const createPost=new Post({
      author:req.user,
      status,
      contentData: "Article",  
      refId: newArticle._id
    })
    await newArticle.save()
    await createPost.save()




   
    for (const tagName of tags) {
      const tag = await Tag.findOneAndUpdate(
        { tagname: tagName },
        {
          $setOnInsert: { tagname: tagName, createdBy: req.user },
          $push: { allposts: createPost._id },
        },
        { new: true, upsert: true }
      );
      await newArticle.save()

      
    }
    await createPost.save()

    return res.status(201).json({
      status: "success",
      message: "Article created successfully!",
      article: newArticle,
      post: createPost,  // Returning the post as well
    });
  } catch (error) {
    console.error("Error saving article:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create article. Please try again.",
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


module.exports={addarticleconroller,getAllArticles}