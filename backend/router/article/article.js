const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated.js");
const { addarticleconroller } = require("../../controllers/article/article.js");

const articleRouter = express.Router();

articleRouter.post("/addarticle", isAuthenticated, addarticleconroller);

module.exports = articleRouter;
