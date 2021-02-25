const mongoose = require("mongoose");

const PoliceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    pushToken: {
      type: String,
    },
    location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
    recentAlerts: [
      {
        title: {
          type: String,
          required: true,
        },
        senderId: {
          type: String,
          required: true,
        },
        isSeen: {
          type: Boolean,
          default: false,
        },
        crimeId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        createdAt: {
          type: Date,
        },
        location: {
          lat: {
            type: Number,
          },
          long: {
            type: Number,
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Police", PoliceSchema);
