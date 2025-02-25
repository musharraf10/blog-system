const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    planName: { 
      type: String, 
      required: true, 
      unique: true,
      index: true // Optimize search queries
    },
    features: [{ type: String }],
    price: { type: Number, required: true },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default : "monthly",
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    activeSubscribers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Track active users on this plan
    }],
    isArchived: {
      type: Boolean,
      default: false, // Archive plans instead of deleting them
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);
