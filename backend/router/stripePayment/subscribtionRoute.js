const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated")

const subscriptions = require("../../controllers/stripePayment/subscribtions");

const subscriptionRoute = express.Router();

subscriptionRoute.get('/getplans', subscriptions.getPrices);
subscriptionRoute.post('/stripepost',isAuthenticated, subscriptions.stripSession);

module.exports = subscriptionRoute;
