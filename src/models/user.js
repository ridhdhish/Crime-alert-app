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
    notificationSetting: {
      allow: {
        type: Boolean,
        default: true,
      },
      sound: {
        type: Boolean,
        default: true,
      },
      vibrate: {
        type: Boolean,
        default: true,
      },
      onSentAlert: {
        type: Boolean,
        default: true,
      },
      onReceiveAlert: {
        type: Boolean,
        default: true,
      },
      onSeenAlert: {
        type: Boolean,
        default: true,
      },
      onAddedAsRelative: {
        type: Boolean,
        default: true,
      },
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

module.exports = mongoose.model("User", UserSchema);
