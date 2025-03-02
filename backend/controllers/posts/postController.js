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
    await Post.findByIdAndUpdate(postId, {
      $push: { reports: { reportedBy: req.user, reason } },
    });
    res.json({ message: "Post reported for review" });
  }),

  //!list all posts
  fetchAllPosts: asyncHandler(async (req, res) => {
    const { category, title, page = 1, limit = 300 } = req.query;
    //Basic filter
    let filter = { status: "approved" };
    // let filter = {};
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
      message: " Approved Post fetched successfully",
      posts,
      currentPage: page,
      perPage: limit,
      totalPages: Math.ceil(totalPosts / limit),
    });
  }),

  getallpostsinadmincontroller: asyncHandler(async (req, res) => {
    try {
      const postsdata = await Post.find({})
        .populate("author")
        .populate({
          path: "comments",
          populate: {
            path: "author",
          },
        })
        // .limit(1);

      console.log(postsdata);

      res.status(200).json({
        status: "success",
        message: "Approved Posts fetched successfully",
        posts: postsdata,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ status: "error", message: error.message });
    }
  }),

  updatePostStatus: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["pending", "approved", "rejected"].includes(status)) {
        return res
          .status(400)
          .json({ status: "error", message: "Invalid status" });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedPost) {
        return res
          .status(404)
          .json({ status: "error", message: "Post not found" });
      }

      res.status(200).json({
        status: "success",
        message: "Post status updated successfully",
        updatedPost,
      });
    } catch (error) {
      console.error("Error updating post status:", error);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }),

  //! get a post
  getPost: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    //check for login user
    const userId = req.user ? req.user : null;

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
    const postId = req.params.postId;
    const userId = req.user._id; // this comes from isAuthenticated middleware

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            status: "error",
            message: "Post not found",
        });
    }

    // Check if the logged-in user is the creator of the post
    if (post.author.toString() !== userId) {  // Make sure your Post model has 'author' field (or createdBy, owner, etc.)
        return res.status(403).json({
            status: "error",
            message: "You are not allowed to delete this post",
        });
    }

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
      {
        description: req.body.description,
        image: req.files?.image || null,
        video: req.files?.video || null,
      },
      { new: true }
    );
    if (!postUpdated) throw new Error("Post not found");
    res.json({ message: "Post updated successfully", postUpdated });
  }),

  pendingPosts: asyncHandler(async (req, res) => {
    const posts = await Post.find({ status: "pending" });

    res.json({
      status: "success",
      message: "Pending posts fetched successfully",
      posts,
    });
  }),

  updateStatus: asyncHandler(async (req, res) => {
    const {postId} = req.params;
    const { status } = req.body;
    await Post.findByIdAndUpdate(postId, { status },{new : true});
    res.json({
      status: "success",
      message: "Post status updated successfully",
    });
  }),

  changePrice: asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const { price } = req.body;
    await Post.findByIdAndUpdate(postId, { price });
    res.json({
      status: "success",
      message: "Post price updated successfully",
    });
  }),


  fetchPostAnalytics: async (req, res) => {
    try {
      const currentDate = new Date();
      const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));
      const startOfYesterday = new Date(startOfToday);
      startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  
      const startOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  
      
      const allPosts = await Post.find({});
  
      // Calculate counts
      const totalPosts = allPosts.length;
      const approvedPosts = allPosts.filter(post => post.status === "approved").length;
      const pendingPosts = allPosts.filter(post => post.status === "pending").length;
      const rejectedPosts = allPosts.filter(post => post.status === "rejected").length;
  
      const thisMonthPosts = allPosts.filter(post => post.createdAt >= startOfThisMonth).length;
      const lastMonthPosts = allPosts.filter(post => 
        post.createdAt >= startOfLastMonth && post.createdAt < startOfThisMonth
      ).length;
  
      const yesterdayPosts = allPosts.filter(post => 
        post.createdAt >= startOfYesterday && post.createdAt < startOfToday
      ).length;
  
      res.status(200).json({
        success: true,
        data: {
          totalPosts,
          approvedPosts,
          pendingPosts,
          rejectedPosts,
          thisMonthPosts,
          lastMonthPosts,
          yesterdayPosts,
        },
      });
    } catch (error) {
      console.error("Error fetching post analytics:", error);
      res.status(500).json({ success: false, message: "Failed to fetch post analytics" });
    }
  },
  

  like: asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    console.log("psot", postId);
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (post?.dislikes.includes(userId)) {
      post?.dislikes?.pull(userId);
    }

    if (post?.likes.includes(userId)) {
      post?.likes?.pull(userId);
    } else {
      post?.likes?.push(userId);
    }

    await post.save();

    res.json({
      message: "Post Liked",
    });
  }),

  dislike: asyncHandler(async (req, res) => {
    const postId = req.params.postId;

    const userId = req.user;

    const post = await Post.findById(postId);

    if (post?.likes.includes(userId)) {
      post?.likes?.pull(userId);
    }

    if (post?.dislikes.includes(userId)) {
      post?.dislikes?.pull(userId);
    } else {
      post?.dislikes?.push(userId);
    }

    await post.save();

    res.json({
      message: "Post Disliked",
    });
  }),
};

module.exports = postController;
