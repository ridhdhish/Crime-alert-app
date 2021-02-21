const mongoose = require("mongoose");

const CrimeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    crimeData: {
      type: String,
    },
    crimeStatus: {
      level: {
        type: Number,
      },
      keyword: {
        enum: ["critical", "danger", "moderate", "safe"],
        type: String,
      },
      type: {
        type: String,
        enum: ["thief", "murder", "rape", "loot", "harassment", "other"],
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Crime", CrimeSchema);
