const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Plan = require("../../models/Plan/Plan");
const User = require("../../models/User/User");
const Payment = require("../../models/Payment/Payment");
const Post = require("../../models/Post/Post");

const stripePaymentController = {
  payment: asyncHandler(async (req, res) => {
    const { subscriptionPlanId, postId } = req.body;
    let amount = 0, metadata = {};
    
    if (subscriptionPlanId) {
      const plan = await Plan.findById(subscriptionPlanId);
      if (!plan) throw new Error("Plan not found");
      amount = plan.price * 100;
      metadata = { userId: req.user._id.toString(), subscriptionPlanId };
    } else if (postId) {
      const post = await Post.findById(postId);
      if (!post) throw new Error("Post not found");
      amount = post.price * 100;
      metadata = { userId: req.user._id.toString(), postId };
    } else {
      throw new Error("Invalid payment request");
    }
    
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency: "usd", metadata });
    res.json({ clientSecret: paymentIntent.client_secret });
  }),

  verify: asyncHandler(async (req, res) => {
    const { paymentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    if (paymentIntent.status !== "succeeded") throw new Error("Payment verification failed");
    
    const { userId, subscriptionPlanId, postId } = paymentIntent.metadata;
    const amount = paymentIntent.amount / 100;
    const currency = paymentIntent.currency;
    
    const newPayment = await Payment.create({ user: userId, subscriptionPlan: subscriptionPlanId || null, post: postId || null, status: "completed", amount, currency, reference: paymentId });
    
    if (subscriptionPlanId) {
      await User.findByIdAndUpdate(userId, { hasSelectedPlan: true, plan: subscriptionPlanId });
    }
    
    res.json({ status: true, message: "Payment verified, user updated", newPayment });
  }),

  free: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    // console.log("Hello",user);
    if (!user) throw new Error("User not found");
    
    user.hasSelectedPlan = true;
    await user.save();
    res.json({ status: true, message: "User updated to free plan" });
  }),
};

module.exports = stripePaymentController;
