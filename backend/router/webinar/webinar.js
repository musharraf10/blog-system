const express = require("express");
<<<<<<< HEAD
const  addwebinarconroller  = require("../../controllers/webinar/webinar.js");
=======
const addwebinarconroller = require("../../controllers/webinar/webinar.js");
>>>>>>> c9b06aa2af46bb232545b8e9c7a91f7707e54f3c
const isAuthenticated = require("../../middlewares/isAuthenticated.js");

const webinarRouter = express.Router();



<<<<<<< HEAD
//unable to get user id req.user issue
webinarRouter.post("/addwebinar", 
    isAuthenticated, 
=======

webinarRouter.post("/addwebinar",
    isAuthenticated,
>>>>>>> c9b06aa2af46bb232545b8e9c7a91f7707e54f3c
    addwebinarconroller);
    webinarRouter.get("/", async (req, res) => {
        try {
            const webinars = await require("../../models/webinar/webinar.js").find();
            res.status(200).json(webinars);
        } catch (error) {
            res.status(500).json({ message: "Error fetching webinars", error: error.message });
        }
    });

webinarRouter.get("/", async (req, res) => {
    try {
        const webinars = await require("../../models/webinar/webinar.js").find();
        res.status(200).json(webinars);
    } catch (error) {
        res.status(500).json({ message: "Error fetching webinars", error: error.message });
    }
});

module.exports = webinarRouter;
