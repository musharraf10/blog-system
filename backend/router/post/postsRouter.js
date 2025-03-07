const express = require("express");
const multer = require("multer");
const postController = require("../../controllers/posts/postController");
const storage = require("../../utils/fileupload");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const checkUserPlan = require("../../middlewares/checkUserPlan");
const optionalAuth = require("../../middlewares/optionalAuth");
const isAccountVerified = require("../../middlewares/isAccountVerified");
const roleCheck = require("../../middlewares/roleCheck");

const upload = multer({ storage });
const postRouter = express.Router();

// Create Post (Restricted to Curators & Admins)
postRouter.post(
  "/create",
  isAuthenticated,
  roleCheck(["curator", "admin"]),
  checkUserPlan,
  isAccountVerified,
  upload.single("file"), 
  // upload.single("image"),
  postController.createPost
);


// List all approved posts
postRouter.get("/", postController.fetchAllPosts);

postRouter.get("/pendingposts", postController.pendingPosts);

postRouter.patch("/updatestatus/:postId", postController.updateStatus);



///gettingposts in conetnetmaganement in adminpanel

postRouter.get("/getallposts", postController.getallpostsinadmincontroller);
postRouter.put("/updatepoststatus/:id", postController.updatePostStatus );
postRouter.get("/getallpublishedposts", postController.getallpublishedpostscontroller );
postRouter.get("/managecontent/getpost",isAuthenticated,postController.getallpost);
postRouter.delete("/managecontent/deletepost/:id",postController.deletepost);
postRouter.put("/managecontent/updatepost/:id",postController.updatepost);
postRouter.put("/managecontent/getpost/:id",postController.getonepost);
postRouter.get("/bookmarked", isAuthenticated, postController.getBookmarkedPosts);
postRouter.get("/:postId", isAuthenticated, optionalAuth, postController.getPost);

postRouter.post("/:postId/bookmark", isAuthenticated, postController.BookMarkPost);
postRouter.post("/:postId/unbookmark", isAuthenticated, postController.unBookMarkPost);


postRouter.patch("/likes/:postId", isAuthenticated, postController.like);
postRouter.patch("/dislikes/:postId", isAuthenticated, postController.dislike);



//newly added routes


// Update a post (Restricted to Curators & Admins)
postRouter.patch(
  "/:postId",
  isAuthenticated,
  roleCheck(["curator", "admin"]),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  postController.update
);

// Delete a post (Restricted to Curators & Admins)
postRouter.delete(
  "/:postId",
  isAuthenticated,
  roleCheck(["curator", "admin"]),
  postController.delete
);

postRouter.get("/analytics", postController.fetchPostAnalytics);

// Like & Dislike Post









module.exports = postRouter;
