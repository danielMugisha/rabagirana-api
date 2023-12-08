const Subscription = require("./repo");

exports.create = async (req, res) => {
  let { email, status } = req.body;
  email.trim();
  status.trim();

  Subscription.create(email, status)
    .then((results) => {
        res.status(201).json({
          status: "SUBSUBSCRIBED",
          message: "subscription created successfully",
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: "an error occured while subscribing",
      });
    });
};
