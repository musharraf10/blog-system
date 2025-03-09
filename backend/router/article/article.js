const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated.js");
const { addarticleconroller, updateArticleController,getAllArticles } = require("../../controllers/article/article.js");
const upload = require("../../utils/fileupload.js")

const articleRouter = express.Router();

articleRouter.put("/updatearticle/:id", upload.single("thumbnail"), isAuthenticated, updateArticleController);
articleRouter.post("/addarticle", upload.single("thumbnail"), isAuthenticated, addarticleconroller);
articleRouter.get("/getarticle",isAuthenticated, getAllArticles);
  

module.exports = articleRouter;
