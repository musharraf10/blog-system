const Webinar = require("../../models/webinar/webinar.js");
const Post = require("../../models/Post/Post.js");
 const addwebinarconroller = async (req, res) => {
  try {
    const { title, link, date, time, description,price } = req.body;


    const newWebinar = new Webinar({
      title,
      link,
      date,
      time,
      description,
     
    });

    const createPost=new Post({
      author:req.user,
      contentData: "Webinar",  
      refId: newWebinar._id,
      price
    })

    
    await newWebinar.save();
    await createPost.save();
    res.status(201).json({
      message: 'Webinar added successfully',
      webinar: newWebinar
    });
  } catch (error) {
    console.error('Error adding webinar:', error);
    res.status(500).json({
      message: 'Error adding webinar',
      error: error.message
    });
  }
};
module.exports=addwebinarconroller