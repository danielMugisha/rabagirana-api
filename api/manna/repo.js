const Manna = require("./model");
const Logger = require("../../utils/logger");

exports.create = async (title, summary, content, author, featuredImage) => {
  try {
    const newManna = new Manna({
      title,
      summary,
      content,
      author,
      featuredImage,
    });
    
    return await newManna.save();
  } catch (error) {
    Logger.error("Error saving manna", error);
    throw error;
  }
};

exports.update = async (mannaId, title, summary, content, author, featuredImage) => {
  try {
    const updateData = { title, summary, content, author };
    
    if (featuredImage) {
      updateData.featuredImage = featuredImage;
    }
    
    const manna = await Manna.findByIdAndUpdate(
      mannaId, 
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!manna) {
      throw new Error('Manna not found');
    }
    
    return manna;
  } catch (error) {
    Logger.error(`Error updating manna with ID ${mannaId}`, error);
    throw error;
  }
};

exports.getAll = async () => {
  try {
    return await Manna.find().sort({ createdAt: -1 });
  } catch (error) {
    Logger.error("Error getting all manna articles", error);
    throw error;
  }
};

exports.getById = async (mannaId) => {
  try {
    const manna = await Manna.findById(mannaId);
    if (!manna) {
      throw new Error('Manna not found');
    }
    return manna;
  } catch (error) {
    Logger.error(`Error getting manna with ID ${mannaId}`, error);
    throw error;
  }
};

exports.getLatest = async () => {
  try {
    const manna = await Manna.findOne().sort({ createdAt: -1 });
    if (!manna) {
      throw new Error('No manna articles found');
    }
    return manna;
  } catch (error) {
    Logger.error("Error getting latest manna article", error);
    throw error;
  }
};

exports.delete = async (mannaId) => {
  try {
    const manna = await Manna.findByIdAndDelete(mannaId);
    if (!manna) {
      throw new Error('Manna not found');
    }
    return manna;
  } catch (error) {
    Logger.error(`Error deleting manna with ID ${mannaId}`, error);
    throw error;
  }
};
