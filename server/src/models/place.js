const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  location: {
    lat: {
      type: String,
    },
    long: {
      type: String,
    },
  },
  crimeStatus: {
    level: {
      type: Number,
    },
    keyword: {
      enum: ["critical", "high", "moderate", "low"],
      type: String,
    },
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
