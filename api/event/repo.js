const Event = require("./model");

exports.create = async (
  title,
  startDate,
  endDate,
  registrationForm,
  featuredImage,
  featuredPdf
) => {
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
  newEvent
    .save()
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      return {
        message: "failed to save event",
      };
    });
};

exports.update = async (
  eventId,
  title,
  startDate,
  endDate,
  registrationForm
) => {
    try {
  var currentItem = await Event.findById(eventId);
  var newImage = currentItem.featuredImage;
  var newDoc = currentItem.featuredPdf;
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  return await Event.findByIdAndUpdate(eventId, {
    title,
    start,
    end,
    registrationForm,
    newImage,
    newDoc,
  })
    .then((result) => {
      return result;
    });
}
    catch(err) {
      console.log(err);
      return {
        message: "failed to update event",
      };
    };
};

exports.getAll = async () => {
  try {
    return await Event.find();
  } catch (error) {
    throw error;
  }
};

exports.getById = async (eventId) => {
  try {
    return await Event.findById(eventId);
  } catch (error) {
    throw error;
  }
};

exports.getLastThree = async () => {
  try {
    return await Event.find({ endDate: { $gt: Date.now() } })
      .sort({ startDate: 1 })
      .limit(3);
  } catch (error) {
    throw error;
  }
};

exports.delete = async (eventId) => {
  try {
    return await Event.findByIdAndDelete(eventId);
  } catch (error) {
    throw error;
  }
};
