const Resource = require("./model");
const Logger = require("../../utils/logger");

exports.create = async (name, category, featuredFile) => {
  try {
    const newResource = new Resource({
      name,
      category,
      featuredFile
    });
    
    return await newResource.save();
  } catch (error) {
    Logger.error("Error saving resource", error);
    throw error;
  }
};

exports.getAll = async () => {
  try {
    return await Resource.find().sort({ createdAt: -1 });
  } catch (error) {
    Logger.error("Error getting all resources", error);
    throw error;
  }
};

exports.getById = async (resourceId) => {
  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  } catch (error) {
    Logger.error(`Error getting resource with ID ${resourceId}`, error);
    throw error;
  }
};

exports.delete = async (resourceId) => {
  try {
    const resource = await Resource.findByIdAndDelete(resourceId);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  } catch (error) {
    Logger.error(`Error deleting resource with ID ${resourceId}`, error);
    throw error;
  }
};
