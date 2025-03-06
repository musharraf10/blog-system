const Webinar = require("../../models/webinar/webinar.js");
const Post = require("../../models/Post/Post.js");


const addWebinarController = async (req, res) => {
    try {
        const { title, link, date, time, description, price } = req.body;
        thumbnail = req.file ? req.file.path : null; 

        const newWebinar = new Webinar({
            title,
            link,
            date,
            time,
            description,
            thumbnail
        });

        // Create a related post
        const createPost = new Post({
            author: req.user,
            contentData: "Webinar",
            refId: newWebinar._id,
            price,
            thumbnail
        });

        // Save to the database
        await newWebinar.save();
        await createPost.save();

        res.status(201).json({
            message: "Webinar added successfully",
            webinar: newWebinar,
        });
    } catch (error) {
        console.error("Error adding webinar:", error);
        res.status(500).json({
            message: "Error adding webinar",
            error: error.message,
        });
    }
};

module.exports = addWebinarController;
