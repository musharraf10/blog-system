const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require('../../models/User/User');

const subscriptions = {
  getPrices: async (req, res) => {
    try {
      const prices = await stripe.prices.list();
      return res.json({ prices });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  stripSession: async (req, res) => {
    try {
      const userData = await User.findOne({ email: req.user.email });
      if (!userData) {
        return res.status(404).json({ error: "User not found", success: false });
      }

      if (!req.body.priceId) {
        return res.status(400).json({ error: "Price ID is required", success: false });
      }

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: req.body.priceId,
            quantity: 1,
          },
        ],
        success_url: "http://localhost:5000/success",
        cancel_url: "http://localhost:5000/cancel",
        customer: userData.stripeCustomerId,
      });

      return res.json({ sessionId: session });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message, success: false });
    }
  },

};

module.exports = subscriptions;
