module.exports = (message, res, errorCode = 500) => {
  console.log(message);
  res.status(errorCode).json({
    message,
  });
};
