module.exports = (error, res) => {
  console.log(error.message);
  res.status(500).json({
    message: "Something went wrong",
  });
};
