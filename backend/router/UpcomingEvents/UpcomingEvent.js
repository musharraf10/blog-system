const express = require("express");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../../controllers/UpcomingEvents/UpcomingController.js");

const router = express.Router();

router.get("/upcomingEvent", getAllEvents);
router.get("/upcomingEvent/:id", getEventById);
router.post("/upcomingEvent", createEvent);
router.put("/upcomingEvent/:id", updateEvent);
router.delete("/upcomingEvent:id", deleteEvent);

module.exports = router;
