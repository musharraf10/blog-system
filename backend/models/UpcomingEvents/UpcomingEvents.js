// import mongoose from "mongoose";
const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});




const Event = mongoose.model("Event", eventSchema);

module.exports=Event;
// export default Event;
