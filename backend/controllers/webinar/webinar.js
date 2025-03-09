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
      const { id } = req.params; // Webinar ID
      const { title, link, date, time, description, price, status } = req.body;
      const thumbnail = req.file ? req.file.path : null;
  
      console.log("Received update request for ID:", id);
  
      // Find the post that references this webinar
      const post = await Post.findById(id).populate("refId");
  
      if (!post) {
        return res.status(404).json({ status: "error", message: "Webinar post not found." });
      }
  
      if (!post.refId) {
        return res.status(400).json({ status: "error", message: "Webinar reference (refId) not found." });
      }
  
      // Update the webinar details inside refId
      post.refId.set({
        title: title || post.refId.title,
        link: link || post.refId.link,
        date: date || post.refId.date,
        time: time || post.refId.time,
        description: description || post.refId.description,
        thumbnail: thumbnail || post.refId.thumbnail,
      });
  
      // Update the corresponding post
      post.set({
        status: status || post.status,
        price: price || post.price,
        thumbnail: thumbnail || post.thumbnail,
      });
  
      // Save both the webinar and the post
      await post.refId.save();
      await post.save();
  
      return res.status(200).json({
        status: "success",
        message: "Webinar updated successfully!",
        webinar: post.refId,
        post,
      });
    } catch (error) {
      console.error("Error updating webinar:", error);
      return res.status(500).json({ status: "error", message: "Failed to update webinar. Please try again." });
    }
  };


module.exports = {addWebinarController, updateWebinarController};
