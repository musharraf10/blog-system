const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const stripePaymentController = require("../../controllers/stripePayment/stripePaymentController");
const checkUserPlan = require("../../middlewares/checkUserPlan");

const stripePaymentRouter = express.Router();

// Create Payment (Subscription & Pay-Per-View)
stripePaymentRouter.post("/checkout", isAuthenticated, stripePaymentController.payment);

// Verify Payment
stripePaymentRouter.get("/verify/:paymentId", isAuthenticated, stripePaymentController.verify);

stripePaymentRouter.get("/free-plan", isAuthenticated, stripePaymentController.free);

stripePaymentRouter.get("/current-plan", isAuthenticated, checkUserPlan, stripePaymentController.CurrentUserPlan); 

module.exports = stripePaymentRouter;
