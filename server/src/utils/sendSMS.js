const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

exports.sendSMS = async () => {
  try {
    const message = await client.messages.create({
      body: "Hello",
      from: process.env.TWILIO_MOBILE_NUMBER,
      to: "+919426115401",
    });
    console.log(message);
  } catch (error) {
    console.log(error.message);
  }
};
