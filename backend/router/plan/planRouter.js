const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const planController = require("../../controllers/plan/planController");
const roleCheck = require("../../middlewares/roleCheck");

const planRouter = express.Router();

// Create Plan (Only Admins)
planRouter.post("/create", isAuthenticated, roleCheck(["admin"]), planController.createPlan);

// List All Plans
planRouter.get("/", planController.lists);

// Get Single Plan
planRouter.get("/:planId", planController.getPlan);

// Update Plan (Only Admins)
planRouter.patch("/:planId", isAuthenticated, roleCheck(["admin"]), planController.update);

// Delete Plan (Only Admins)
planRouter.delete("/:planId", isAuthenticated, roleCheck(["admin"]), planController.delete);

module.exports = planRouter;