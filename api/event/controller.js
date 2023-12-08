const Event = require("./repo");
//import Response from '../../utils/Responses';

exports.create = async (req, res) => {
  const { title, summary, startDate, endDate, registrationForm } = req.body;
  const Image = req.files.find((file) => {
    return file.fieldname === "featuredImage";
  });
  const featuredImage = Image.path;
  const Pdf = req.files.find((file) => {
    return file.fieldname === "featuredPdf";
  });
  const featuredPdf = Pdf.path;
  title.trim();
  summary.trim();
  registrationForm.trim();


  if (title == "" || summary == "" || startDate == "") {
    res.status(400).json({
      status: "BAD REQUEST",
      message: "Empty fields",
    });
  }

  Event.create(
    title,
    summary,
    startDate,
    endDate,
    registrationForm,
    featuredImage,
    featuredPdf
  )
    .then((results) => {
      res.status(201).json({
        status: "CREATED",
        message: "Event created successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: "an error occured while saving event",
      });
    });
};

exports.update = async (req, res) => {
  const eventId = req.params.eventId;
  const { title, summary, startDate, endDate, registrationForm } = req.body;
  Event.update(
    eventId,
    title,
    summary,
    startDate,
    endDate,
    registrationForm,
  )
    .then((results) => {
      res.status(200).json({
        status: "UPDATED",
        message: "Event updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: "an error occured while updating an event",
      });
    });
};

exports.getAll = async (req, res) => {
  Event.getAll()
    .then((results) => {
      res.status(200).json({
        status: "SUCCESS",
        message: "All events retrieved successfully",
        data: results,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: "an error occured while getting all events",
      });
    });
};

exports.getById = async (req, res) => {
  const eventId = req.params.eventId;
  Event.getById(eventId)
    .then((results) => {
      res.status(200).json({
        status: "SUCCESS",
        message: "event retrieved successfully",
        data: results,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: "an error occured while getting event",
      });
    });
};

exports.getLastThree = async (req, res) => {
  Event.getLastThree()
    .then((results) => {
      res.status(200).json({
        status: "SUCCESS",
        message: "Latest events retrieved successfully",
        data: results,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: "an error occured while getting the latest events",
      });
    });
};

exports.delete = async (req, res) => {
  const eventId = req.params.eventId;
  Event.delete(eventId)
    .then((results) => {
      res.status(200).json({
        status: "DELETED",
        message: "Event deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: "an error occured while deleting an Event",
      });
    });
};
