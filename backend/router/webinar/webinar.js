const express = require("express");
const addwebinarconroller  = require("../../controllers/webinar/webinar.js");
const isAuthenticated = require("../../middlewares/isAuthenticated.js");

const webinarRouter = express.Router();




webinarRouter.post("/addwebinar", 
    isAuthenticated, 
    addwebinarconroller);

module.exports = webinarRouter;
