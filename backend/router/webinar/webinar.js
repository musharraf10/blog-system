const express = require("express");
const addwebinarconroller = require("../../controllers/webinar/webinar.js");
const isAuthenticated = require("../../middlewares/isAuthenticated.js");
const upload = require("../../utils/fileupload.js")

const webinarRouter = express.Router();




webinarRouter.post("/addwebinar", 
    isAuthenticated, upload.single("thumbnail"),
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
