const express = require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated.js");
const { addarticleconroller, updateArticleController } = require("../../controllers/article/article.js");
const upload = require("../../utils/fileupload.js")

const articleRouter = express.Router();

articleRouter.post("/addarticle", upload.single("thumbnail"), isAuthenticated, addarticleconroller);

articleRouter.put("/updatearticle/:id", upload.single("thumbnail"), isAuthenticated, updateArticleController);
  

module.exports = articleRouter;
