const User = require("../models/user");

const me = (req, res) => {
  const user = req.user;
  return res.status(200).json({
    user,
  });
};

module.exports = {
  me,
};
