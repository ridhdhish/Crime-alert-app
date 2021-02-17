const { default: Expo } = require("expo-server-sdk");

exports.sendPushNotification = async ({
  body,
  data,
  title,
  subtitle,
  pushToken,
}) => {
  const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  await expo.sendPushNotificationsAsync([
    {
      to: pushToken,
      sound: "default",
      body,
      data,
      priority: "high",
      title,
      subtitle,
      badge: 10,
    },
  ]);
};
