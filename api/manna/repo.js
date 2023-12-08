const Manna = require("./model");

exports.create = async (title, summary, content, author, featuredImage) => {
  const newManna = new Manna({
    title,
    summary,
    content,
    author,
    featuredImage,
  });
  newManna
    .save()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return {
        message: "failed to save manna",
      };
    });
};

exports.update = async (
  mannaId,
  title,
  summary,
  content,
  author
) => {
  try {
    var currentItem = await Manna.findById(mannaId);
    var newImage = currentItem.featuredImage;
    return await Manna.findByIdAndUpdate(mannaId, {
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
        message: "failed to update manna",
      };
  }
};

exports.getAll = async () => {
  try {
    return await Manna.find().sort({ createdAt: -1 });
  } catch (error) {
    throw error;
  }
};

exports.getById = async (mannaId) => {
  try {
    return await Manna.findById(mannaId);
  } catch (error) {
    throw error;
  }
};

exports.getLatest = async () => {
  try {
    return await Manna.findOne().sort({ createdAt: -1 });
  } catch (error) {
    throw error;
  }
};

exports.delete = async (mannaId) => {
  try {
    return await Manna.findByIdAndDelete(mannaId);
  } catch (error) {
    throw error;
  }
};
