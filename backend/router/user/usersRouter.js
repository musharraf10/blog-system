const express = require("express");
const multer = require("multer");
const userController = require("../../controllers/users/userController");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const roleCheck = require("../../middlewares/roleCheck");
const storage = require("../../utils/fileupload");

const usersRouter = express.Router();
const upload = multer({ storage });

// Authentication Routes
usersRouter.post("/register", userController.register);
usersRouter.post("/login", userController.login);
usersRouter.get("/auth/google", userController.googleAuth);
usersRouter.get("/auth/google/callback", userController.googleAuthCallback);
usersRouter.get("/check-auth", userController.checkAuthenticated);
usersRouter.post("/logout", userController.logout);

// Profile & Account Management
usersRouter.get("/profile", isAuthenticated, userController.profile);
usersRouter.patch("/update-email", isAuthenticated, userController.updateEmail);
usersRouter.patch("/upload-profile-picture", isAuthenticated, upload.single("image"), userController.updateProfilePic);

// Follow & Unfollow Routes
usersRouter.put("/follow/:followId", isAuthenticated, userController.followUser);
usersRouter.put("/unfollow/:unfollowId", isAuthenticated, userController.unFollowUser);

// Account Verification
usersRouter.put("/send-verification-email", isAuthenticated, userController.verifyEmailAccount);
usersRouter.put("/verify-account/:verifyToken", userController.verifyEmailAcc);

// Password Reset
usersRouter.post("/forgot-password", userController.forgotPassword);
usersRouter.post("/reset-password/:verifyToken", userController.resetPassword);

// Admin Privileges
usersRouter.delete("/delete-user/:userId", isAuthenticated, roleCheck(["admin"]), userController.deleteUser);

module.exports = usersRouter;
