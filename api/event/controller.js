const EventRepo = require("./repo");
const ApiResponse = require("../../utils/responses");
const Logger = require("../../utils/logger");

exports.create = async (req, res) => {
  try {
    const { title, startDate, endDate, registrationForm } = req.body;
    
    if (!req.files || !req.files.featuredImage || !req.files.featuredPdf) {
      return ApiResponse.badRequest(res, "Both featuredImage and featuredPdf files are required");
    }
    
    const featuredImage = req.files.featuredImage[0].path;
    const featuredPdf = req.files.featuredPdf[0].path;
    
    // Validate inputs
    if (!title?.trim() || !startDate || !endDate) {
      return ApiResponse.badRequest(res, "Title, start date and end date are required");
    }
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return ApiResponse.badRequest(res, "Invalid date format");
    }
    
    if (start > end) {
      return ApiResponse.badRequest(res, "End date must be after start date");
    }
    
    const registrationFormTrimmed = registrationForm?.trim() || "";
    
    const result = await EventRepo.create(
      title.trim(),
      startDate,
      endDate,
      registrationFormTrimmed,
      featuredImage,
      featuredPdf
    );
    
    return ApiResponse.created(res, "Event created successfully", result);
  } catch (err) {
    Logger.error("Error creating event", err);
    return ApiResponse.error(res, "An error occurred while saving event");
  }
};

exports.update = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const { title, startDate, endDate, registrationForm } = req.body;
    
    let featuredImage = undefined;
    let featuredPdf = undefined;
    
    if (req.files) {
      if (req.files.featuredImage) {
        featuredImage = req.files.featuredImage[0].path;
      }
      
      if (req.files.featuredPdf) {
        featuredPdf = req.files.featuredPdf[0].path;
      }
    }
    
    // Validate inputs
    if (!title?.trim() || !startDate || !endDate) {
      return ApiResponse.badRequest(res, "Title, start date and end date are required");
    }
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return ApiResponse.badRequest(res, "Invalid date format");
    }
    
    if (start > end) {
      return ApiResponse.badRequest(res, "End date must be after start date");
    }
    
    const registrationFormTrimmed = registrationForm?.trim() || "";
    
    const result = await EventRepo.update(
      eventId,
      title.trim(),
      startDate,
      endDate,
      registrationFormTrimmed,
      featuredImage,
      featuredPdf
    );
    
    return ApiResponse.success(res, "Event updated successfully", result);
  } catch (err) {
    Logger.error(`Error updating event ${req.params.eventId}`, err);
    if (err.message === 'Event not found') {
      return ApiResponse.notFound(res, "Event not found");
    }
    return ApiResponse.error(res, "An error occurred while updating event");
  }
};

exports.getAll = async (req, res) => {
  try {
    const results = await EventRepo.getAll();
    return ApiResponse.success(res, "All events retrieved successfully", results);
  } catch (err) {
    Logger.error("Error retrieving all events", err);
    return ApiResponse.error(res, "An error occurred while getting all events");
  }
};

exports.getById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const result = await EventRepo.getById(eventId);
    return ApiResponse.success(res, "Event retrieved successfully", result);
  } catch (err) {
    Logger.error(`Error retrieving event ${req.params.eventId}`, err);
    if (err.message === 'Event not found') {
      return ApiResponse.notFound(res, "Event not found");
    }
    return ApiResponse.error(res, "An error occurred while getting event");
  }
};

exports.getLastThree = async (req, res) => {
  try {
    const results = await EventRepo.getLastThree();
    return ApiResponse.success(res, "Latest events retrieved successfully", results);
  } catch (err) {
    Logger.error("Error retrieving latest events", err);
    return ApiResponse.error(res, "An error occurred while getting the latest events");
  }
};

exports.delete = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    await EventRepo.delete(eventId);
    return ApiResponse.success(res, "Event deleted successfully");
  } catch (err) {
    Logger.error(`Error deleting event ${req.params.eventId}`, err);
    if (err.message === 'Event not found') {
      return ApiResponse.notFound(res, "Event not found");
    }
    return ApiResponse.error(res, "An error occurred while deleting event");
  }
};
