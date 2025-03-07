const Event = require("../../models/UpcomingEvents/UpcomingEvents");

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    if(events.length===0){
      return res.status(404).json({ message: "No events found" });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newEvent = new Event({ title, description, date });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: "Error adding event" });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date },
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: "Error updating event" });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const today = new Date();

    if (eventId) {
      const deletedEvent = await Event.findByIdAndDelete(eventId);
      if (!deletedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }
      return res.json({ message: "Event deleted successfully" });
    } else {
      const result = await Event.deleteMany({ date: { $lt: today } });
      return res.json({ message: `${result.deletedCount} past events removed` });
    }
  } catch (error) {
    console.error(" Error deleting event:", error);
    res.status(500).json({ error: "Server error" });
  }
};
