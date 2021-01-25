module.exports = (message, res, errorCode = 500, printMessage = true) => {
  if (printMessage) {
    console.log(message);
  }
  res.status(errorCode).json({
    message,
  });
};
