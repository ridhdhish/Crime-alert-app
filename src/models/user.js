const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    pushToken: {
      type: String,
    },
    appPassword: {
      type: String,
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
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
