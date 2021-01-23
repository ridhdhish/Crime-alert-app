module.exports = (id, jwt) => {
  const payload = {
    user: {
      id,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7300d",
  });
};
