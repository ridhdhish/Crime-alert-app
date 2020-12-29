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
  crimeLevel: {
    type: Number,
    default: 0,
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
