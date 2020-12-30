const { response: res } = require("express");

module.exports = (message, errorCode = 500) => {
  console.log(message);
  res.status(errorCode).json({
    message,
  });
};
