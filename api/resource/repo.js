const Resource = require("./model");

exports.create = async (name, category, featuredFile) => {
  const newResource = new Resource({
    name,
    category,
    featuredFile
  });
  newResource
    .save()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return {
        message: "failed to save resource",
      };
    });
};

exports.getAll = async () => {
  try {
    return await Resource.find().sort({ createdAt: -1 });
  } catch (error) {
    throw error;
  }
};

exports.getById = async (resourceId) => {
  try {
    return await Resource.findById(resourceId);
  } catch (error) {
    throw error;
  }
};

exports.delete = async (resourceId) => {
  try {
    return await Resource.findByIdAndDelete(resourceId);
  } catch (error) {
    throw error;
  }
};
