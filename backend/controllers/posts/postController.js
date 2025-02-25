
  // createPost: asyncHandler(async (req, res) => {
  //   const { description, category } = req.body;
  //   const categoryFound = await Category.findById(category);
  //   if (!categoryFound) throw new Error("Category not found");
  //   const userFound = await User.findById(req.user);
  //   if (!userFound) throw new Error("User not found");
    
  //   const postCreated = await Post.create({
  //     description,
  //     image: req.files?.image || null,
  //     video: req.files?.video || null,
  //     author: req.user,
  //     category,
  //     status: "pending", // Default status for moderation
  //   });
    
  //   await Category.findByIdAndUpdate(category, { $push: { posts: postCreated._id } });
  //   await User.findByIdAndUpdate(req.user, { $push: { posts: postCreated._id } });
  //   await Notification.create({ userId: req.user, postId: postCreated._id, message: `New post created by ${userFound.username}` });
    
  //   res.json({ message: "Post submitted for review", postCreated });
  // }),

  // fetchAllPosts: asyncHandler(async (req, res) => {
  //   const { category, title, page = 1, limit = 10 } = req.query;
  //   let filter = {  };
  //   if (category) filter.category = category;
  //   if (title) filter.description = { $regex: title, $options: "i" };
    
  //   const posts = await Post.find(filter).populate("category").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
  //   const totalPosts = await Post.countDocuments(filter);
  //   res.json({ posts, currentPage: page, totalPages: Math.ceil(totalPosts / limit) });
  // }),


const asyncHandler = require("express-async-handler");
const Post = require("../../models/Post/Post");
const Category = require("../../models/Category/Category");
const User = require("../../models/User/User");
const Notification = require("../../models/Notification/Notification");
const sendNotificatiomMsg = require("../../utils/sendNotificatiomMsg");

const postController = {
  //!Create post
  createPost: asyncHandler(async (req, res) => {
    //get the payload
    const { description, category } = req.body;
    // find the category
    const categoryFound = await Category.findById(category);
    if (!categoryFound) {
      throw new Error("Category not found");
    }
    // find the user
    const userFound = await User.findById(req.user._id);
    if (!userFound) {
      throw new Error("User not found");
    }
    const postCreated = await Post.create({
      description,
      image: req.file.path,
      author: req.user,
      category,
      status: "pending", 
    });
    
    categoryFound.posts.push(categoryFound?._id);
    //resave the category
    await categoryFound.save();
    //push the posts into user
    userFound.posts.push(postCreated?._id);
    await userFound.save();
    //Create notification
    await Notification.create({
      userId: req.user,
      postId: postCreated._id,
      message: `New post created by ${userFound.username}`,
    });

    //Send email to all hus/her followers
    userFound.followers.forEach(async (follower) => {
      //find the users by ids
      const users = await User.find({ _id: follower });
      //loop through the users
      users.forEach((user) => {
        //send email
        sendNotificatiomMsg(user.email, postCreated._id);
      });
    });

    res.json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  }),

  approvePost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    await Post.findByIdAndUpdate(postId, { status: "approved" });
    res.json({ message: "Post approved successfully" });
  }),

  reportPost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const { reason } = req.body;
    await Post.findByIdAndUpdate(postId, { $push: { reports: { reportedBy: req.user, reason } } });
    res.json({ message: "Post reported for review" });
  }),

  //!list all posts
  fetchAllPosts: asyncHandler(async (req, res) => {
    const { category, title, page = 1, limit = 300 } = req.query;
    //Basic filter
    // let filter = {status: "approved"};
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (title) {
      filter.description = { $regex: title, $options: "i" }; //case insensitive
    }

    const posts = await Post.find(filter)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    //total posts
    const totalPosts = await Post.countDocuments(filter);
    res.json({
      status: "success",
      message: "Post fetched successfully",
      posts,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalPosts / limit),
    });
  }),
  //! get a post
  getPost: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //check for login user
    const userId = req.user ? req.user : null;
    //find the post
    const postFound = await Post.findById(postId).populate({
      path: "comments",
      populate: {
        path: "author",
      },
    });
    if (!postFound) {
      throw new Error("Post not found");
    }
    if (userId) {
      await Post.findByIdAndUpdate(
        postId,
        {
          $addToSet: { viewers: userId },
        },
        {
          new: true,
        }
      );
    }
    res.json({
      status: "success",
      message: "Post fetched successfully",
      postFound,
    });
  }),
  //! delete
  delete: asyncHandler(async (req, res) => {
    //get the post id from params
    const postId = req.params.postId;
    //find the post
    await Post.findByIdAndDelete(postId);
    res.json({
      status: "success",
      message: "Post deleted successfully",
    });
  }),
  //! pdate post
  update: asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const postUpdated = await Post.findByIdAndUpdate(
      postId,
      { description: req.body.description, image: req.files?.image || null, video: req.files?.video || null },
      { new: true }
    );
    if (!postUpdated) throw new Error("Post not found");
    res.json({ message: "Post updated successfully", postUpdated });
  }),
  //like post
  like: asyncHandler(async (req, res) => {
    //Post id
    const postId = req.params.postId;
    //user liking a post
    console.log("psot",postId);
    const userId = req.user._id;
    //Find the post
    const post = await Post.findById(postId);
    //Check if a user has already disliked the post
    if (post?.dislikes.includes(userId)) {
      post?.dislikes?.pull(userId);
    }
    //Check if a user has already liked the post
    if (post?.likes.includes(userId)) {
      post?.likes?.pull(userId);
    } else {
      post?.likes?.push(userId);
    }
    //resave the post
    await post.save();
    //send the response
    res.json({
      message: "Post Liked",
    });
  }),
  //like post
  dislike: asyncHandler(async (req, res) => {
    //Post id
    const postId = req.params.postId;
    //user liking a post
    const userId = req.user;
    //Find the post
    const post = await Post.findById(postId);
    //Check if a user has already liked the post
    if (post?.likes.includes(userId)) {
      post?.likes?.pull(userId);
    }
    //Check if a user has already disliked the post
    if (post?.dislikes.includes(userId)) {
      post?.dislikes?.pull(userId);
    } else {
      post?.dislikes?.push(userId);
    }
    //resave the post
    await post.save();
    //send the response
    res.json({
      message: "Post Disliked",
    });
  }),
};

module.exports = postController;
