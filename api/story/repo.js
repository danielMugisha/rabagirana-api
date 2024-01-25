const Story = require("./model");

exports.create = async (title, summary, content, author, featuredImage) => {
  const newStory = new Story({
    title,
    summary,
    content,
    author,
    featuredImage,
  });
  newStory
    .save()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return {
        message: "failed to save story",
      };
    });
};

exports.update = async (
  storyId,
  title,
  summary,
  content,
  author
) => {
  try {
    var currentItem = await Story.findById(storyId);
    var newImage = currentItem.featuredImage;
    return await Story.findByIdAndUpdate(storyId, {
      title,
      summary,
      content,
      author,
      newImage,
    }).then((result) => {
      return result;
    });
  } catch (err) {
    console.log(err);
      return {
        message: "failed to update story",
      };
  }
};

exports.getAll = async () => {
  try {
    return await Story.find().sort({ createdAt: -1 });
  } catch (error) {
    throw error;
  }
};

exports.getById = async (storyId) => {
  try {
    return await Story.findById(storyId);
  } catch (error) {
    throw error;
  }
};

exports.delete = async (storyId) => {
  try {
    return await Story.findByIdAndDelete(storyId);
  } catch (error) {
    throw error;
  }
};
