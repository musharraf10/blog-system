import Webinar from "../../models/webinar/webinar.js";

export const addwebinarconroller = async (req, res) => {
  try {
    const { title, link, date, time, description } = req.body;


    const newWebinar = new Webinar({
      title,
      link,
      date,
      time,
      description,
      //unable to get user id req.user issue
      // hostedBy:req.user,

      updatedAt: Date.now()
    });

    console.log(newWebinar)

    await newWebinar.save();

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
