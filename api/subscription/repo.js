const Subscription = require("./model");
const Logger = require("../../utils/logger");

exports.create = async (email, status) => {
  try {
    const auth = `apikey ${process.env.MAILCHIMP_KEY}`;
    const listId = process.env.MAILCHIMP_LIST;
    const url = `https://us21.api.mailchimp.com/3.0/lists/${listId}/members`;
    
    const newSubscription = new Subscription({
      email_address: email,
      status,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: JSON.stringify(newSubscription),
    });

    const data = await response.json();
    Logger.debug("Mailchimp API response", data);

    if (data.status === 'subscribed') {
      const savedSubscription = await newSubscription.save();
      return savedSubscription;
    } else {
      throw new Error(data.title || "Failed to subscribe to Mailchimp");
    }
  } catch (error) {
    Logger.error("Error during subscription process", error);
    throw error;
  }
};
