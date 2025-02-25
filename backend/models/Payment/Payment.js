const mongoose = require("mongoose");

// Schema
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Optimized for user-based queries
    },
    reference: {
      type: String,
      required: true,
      unique: true,
      index: true, // Ensure quick lookups
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Stripe", "PayPal", "Credit Card", "Crypto"],
      required: true, // Track how payment was made
    },
    subscriptionPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: false,
    },
    adminShare: {
      type: Number,
      default: 0, // Admin's share of revenue
    },
    content: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // Content reference for pay-per-view (PPV)
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      default: null, // External payment processor transaction ID
    },
    refundStatus: {
      type: String,
      enum: ["not_requested", "processing", "completed", "denied"],
      default: "not_requested",
    },
  },
  {
    timestamps: true,
  }
);

// Model
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;