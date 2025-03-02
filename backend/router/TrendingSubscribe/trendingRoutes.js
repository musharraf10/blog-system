const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const getTrendingContent = require('../../controllers/TrendingSubscribe/trendingController');

const trendingRouter = express.Router();

//trending middleware
trendingRouter.get('/', getTrendingContent)

module.exports = trendingRouter;

