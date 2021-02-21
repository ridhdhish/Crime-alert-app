const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
    location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Place", PlaceSchema);
