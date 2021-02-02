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
    recentAlerts: [
      {
        isSeen: {
          type: Boolean,
          default: false,
        },
        crimeId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
