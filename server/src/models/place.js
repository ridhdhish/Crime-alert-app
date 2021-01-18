const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  crimeStatus: [
    {
      level: {
        type: Number,
      },
      keyword: {
        enum: ["critical", "high", "moderate", "low"],
        type: String,
      },
    },
  ],
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Place", PlaceSchema);
