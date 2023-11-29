const Subscription = require("./model");

exports.create = async (email, status) => {
  auth = `apikey ${process.env.MAILCHIMP_KEY}`;
  listId = process.env.MAILCHIMP_LIST;
  const url = `https://us13.api.mailchimp.com/3.0/lists/${listId}/members`;
  const newSubscription = new Subscription({
    email_address: email,
    status,
  });
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(newSubscription),
  })
    .then(async (response) => {
      await response.json().then((data) => {
        console.log("data", data);
        if(data.status === 'subscribed') {
            newSubscription.save()
            .then((result)=>{
                return result
            })
        }
        return data;
      });
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
