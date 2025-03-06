const express = require("express");
const addwebinarconroller  = require("../../controllers/webinar/webinar.js");
const isAuthenticated = require("../../middlewares/isAuthenticated.js");
const upload = require("../../utils/fileupload.js")

const webinarRouter = express.Router();




webinarRouter.post("/addwebinar", 
    isAuthenticated, upload.single("thumbnail"),
    addwebinarconroller);

module.exports = webinarRouter;
