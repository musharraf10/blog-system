const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const earningsController = require("../../controllers/earnings/earningsController");
const roleCheck = require("../../middlewares/roleCheck");

const earningsRouter = express.Router();

// Fetch all earnings (Admin only)
earningsRouter.get("/", isAuthenticated, roleCheck(["admin", "curator"]) , earningsController.fetchAllEarnings);

// Fetch logged-in user's earnings
earningsRouter.get("/my-earnings", isAuthenticated,  earningsController.getUserEarnings);

// Fetch earnings by date range
earningsRouter.get("/filter", isAuthenticated, earningsController.filterEarningsByDate);

module.exports = earningsRouter;
