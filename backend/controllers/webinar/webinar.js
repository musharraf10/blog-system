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

const updateWebinarController = async (req, res) => {
    try {
        const { title, link, date, time, description, price } = req.body;
        const { id } = req.params;
        const thumbnail = req.file ? req.file.path : null;

        
        const webinar = await Webinar.findById(id);
        if (!webinar) {
            return res.status(404).json({
                status: "error",
                message: "Webinar not found.",
            });
        }

        webinar.title = title || webinar.title;
        webinar.link = link || webinar.link;
        webinar.date = date || webinar.date;
        webinar.time = time || webinar.time;
        webinar.description = description || webinar.description;
        if (thumbnail) webinar.thumbnail = thumbnail;

        const post = await Post.findOne({ refId: id, contentData: "Webinar" });
        if (post) {
            post.price = price || post.price;
            if (thumbnail) post.thumbnail = thumbnail;
            await post.save();
        }

        await webinar.save();

        return res.status(200).json({
            status: "success",
            message: "Webinar updated successfully!",
            webinar,
            post,
        });
    } catch (error) {
        console.error("Error updating webinar:", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to update webinar. Please try again.",
        });
    }
};


module.exports = {addWebinarController, updateWebinarController};
