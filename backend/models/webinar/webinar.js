const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Webinar Schema
const WebinarSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Webinar title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  link: {
    type: String,
    required: [true, 'Webinar link is required'],
  },
  date: {
    type: Date,
    required: [true, 'Webinar date is required']
  },
  time: {
    type: String,
    required: [true, 'Webinar time is required'],
    trim: true
  },
  description: {
    type: String,
  },
  // hostedBy: {
  //      type: mongoose.Schema.Types.ObjectId,
  //      ref: "User",
  //      required: true,
  //    },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const Webinar = mongoose.model('Webinar', WebinarSchema);
module.exports = Webinar;