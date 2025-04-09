const Story = require("./model");
const Logger = require("../../utils/logger");

exports.create = async (title, summary, content, author, featuredImage) => {
  try {
    const newStory = new Story({
      title,
      summary,
      content,
      author,
      featuredImage,
    });
    
    return await newStory.save();
  } catch (error) {
    Logger.error("Error saving story", error);
    throw error;
  }
};

exports.update = async (storyId, title, summary, content, author, featuredImage) => {
  try {
    const updateData = { title, summary, content, author };
    
    if (featuredImage) {
      updateData.featuredImage = featuredImage;
    }
    
    const story = await Story.findByIdAndUpdate(
      storyId, 
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!story) {
      throw new Error('Story not found');
    }
    
    return story;
  } catch (error) {
    Logger.error(`Error updating story with ID ${storyId}`, error);
    throw error;
  }
};

exports.getAll = async () => {
  try {
    return await Story.find().sort({ createdAt: -1 });
  } catch (error) {
    Logger.error("Error getting all stories", error);
    throw error;
  }
};

exports.getById = async (storyId) => {
  try {
    const story = await Story.findById(storyId);
    if (!story) {
      throw new Error('Story not found');
    }
    return story;
  } catch (error) {
    Logger.error(`Error getting story with ID ${storyId}`, error);
    throw error;
  }
};

exports.delete = async (storyId) => {
  try {
    const story = await Story.findByIdAndDelete(storyId);
    if (!story) {
      throw new Error('Story not found');
    }
    return story;
  } catch (error) {
    Logger.error(`Error deleting story with ID ${storyId}`, error);
    throw error;
  }
};
