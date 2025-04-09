const Event = require("./model");
const Logger = require("../../utils/logger");

exports.create = async (
  title,
  startDate,
  endDate,
  registrationForm,
  featuredImage,
  featuredPdf
) => {
  try {
    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
    
    const newEvent = new Event({
      title,
      startDate: start,
      endDate: end,
      registrationForm,
      featuredImage,
      featuredPdf,
    });
    
    return await newEvent.save();
  } catch (error) {
    Logger.error("Error saving event", error);
    throw error;
  }
};

exports.update = async (
  eventId,
  title,
  startDate,
  endDate,
  registrationForm,
  featuredImage,
  featuredPdf
) => {
  try {
    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
    
    const updateData = {
      title,
      startDate: start,
      endDate: end,
      registrationForm,
    };
    
    if (featuredImage) {
      updateData.featuredImage = featuredImage;
    }
    
    if (featuredPdf) {
      updateData.featuredPdf = featuredPdf;
    }
    
    const event = await Event.findByIdAndUpdate(
      eventId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      throw new Error('Event not found');
    }
    
    return event;
  } catch (error) {
    Logger.error(`Error updating event with ID ${eventId}`, error);
    throw error;
  }
};

exports.getAll = async () => {
  try {
    return await Event.find().sort({ startDate: 1 });
  } catch (error) {
    Logger.error("Error getting all events", error);
    throw error;
  }
};

exports.getById = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    Logger.error(`Error getting event with ID ${eventId}`, error);
    throw error;
  }
};

exports.getLastThree = async () => {
  try {
    const events = await Event.find({ endDate: { $gt: Date.now() } })
      .sort({ startDate: 1 })
      .limit(3);
    
    if (events.length === 0) {
      return [];
    }
    
    return events;
  } catch (error) {
    Logger.error("Error getting last three events", error);
    throw error;
  }
};

exports.delete = async (eventId) => {
  try {
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    Logger.error(`Error deleting event with ID ${eventId}`, error);
    throw error;
  }
};
