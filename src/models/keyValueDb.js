const mongoose = require("mongoose");

const KeyValueDb = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: Object,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    index: {
      expires: "24h",
    },
  },
});

module.exports = mongoose.model("KeyValueDb", KeyValueDb);
