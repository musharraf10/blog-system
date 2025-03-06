const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated.js");
const { addarticleconroller, getAllArticles } = require("../../controllers/article/article");

const articleRouter = express.Router();

articleRouter.post("/addarticle", isAuthenticated, addarticleconroller);
articleRouter.get("/getallarticles", getAllArticles);

module.exports = articleRouter;
