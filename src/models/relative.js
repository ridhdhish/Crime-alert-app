const mongoose = require("mongoose");

const relativeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
    },
    pushToken: {
      type: String,
    },
    existingUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Relative", relativeSchema);
