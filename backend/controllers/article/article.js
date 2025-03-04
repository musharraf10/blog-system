const Article = require("../../models/article/article.js");


const addarticleconroller = async (req, res) => {
  const { title, content, status, tags } = req.body;
  console.log("requested")

  // Validate required fields
  if (!title || !content || !status) {
    return res.status(400).json({
      status: "error",
      message: "Title, content, and status are required.",
    });
  }

  try {
    const newarticle = new Article({
      title,
      description: content,
      status,
      // author: req.user,

    });


    // const categoryIds = [];

    // for (const categoryName of tags) {
    //   let categoryFound = await Category.findOne({ categoryName });

    //   if (!categoryFound) {
    //     categoryFound = await Category.create({
    //       categoryName,

    //       posts: [newarticle._id],
    //       // createdBy: req.user,
    //     });
    //   } else {
    //     await categoryFound.updateOne({ $push: { posts: newarticle._id } });
    //   }

    //   categoryIds.push(categoryFound._id);
    //   await categoryFound.save();
    // }

    // newarticle.categorylist = categoryIds;
    await newarticle.save();

    return res.status(201).json({
      status: "success",
      message: "Post created successfully!",
      post: newarticle,
    });
  } catch (error) {
    console.error("Error saving post:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to create post. Please try again.",
    });
  }
};

module.exports = {addarticleconroller};