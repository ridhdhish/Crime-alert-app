import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { isAndroid } from "../utils/isAndroid";
import { toTitleCase } from "../utils/toTitleCase";
import { colors } from "../colors";
import { logout, deleteMe } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import SettingOption from "../components/SettingOption";
import BottomPopup from "../components/BottomPopup";
import NotificationSetting from "../components/NotificationSetting";
import { sectionStyle } from "../utils/sectionStyle";
import SetAppPassword from "../components/SetAppPassword";

const SettingScreen = (props) => {
  const [whatToOpen, setWhatToOpen] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View
        style={{
          padding: 10,
          backgroundColor: colors.backgroundPrimary,
        }}
      >
        <Ionicons
          name={isAndroid() ? "md-menu" : "ios-menu"}
          size={30}
          color={colors.textSecondary}
          style={{
            margin: 10,
          }}
          onPress={() => props.navigation.toggleDrawer()}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: 15,
            marginHorizontal: 5,
          }}
        >
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 70,
              backgroundColor: colors.backgroundExtra,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {user.firstname[0].toUpperCase()}
              {user.lastname[0].toUpperCase()}
            </Text>
          </View>
          <View
            style={{
              margin: 10,
            }}
          >
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 18,
              }}
            >
              {toTitleCase(user.firstname)} {toTitleCase(user.lastname)}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Profile")}
            >
              <Text
                style={{
                  color: "rgba(255, 255, 255, .5)",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.section}>
        <Text style={style.sectionTitle}>Account</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => props.navigation.navigate("Profile")}
        >
          <View style={style.userDetails}>
            <Text style={style.value}>+91 {user.mobileNumber}</Text>

            <Text style={style.valueTitle}>Tap to change mobile number</Text>
          </View>
        </TouchableOpacity>

        <View style={style.userDetails}>
          <Text style={style.value}>{user.email}</Text>
          <Text style={style.valueTitle}>Email</Text>
        </View>
        <View style={style.userDetails}>
          <Text style={style.value}>{user.address}</Text>
          <Text style={style.valueTitle}>address</Text>
        </View>
      </View>
      <View style={style.section}>
        <Text style={style.sectionTitle}>Settings</Text>
        <SettingOption
          Icon={Ionicons}
          name={
            isAndroid()
              ? "md-notifications-outline"
              : "ios-notifications-outline"
          }
          title="Sound and Notification"
          onPress={() => setWhatToOpen("notification")}
        />
        <SettingOption
          Icon={Ionicons}
          name={isAndroid() ? "md-share" : "ios-share"}
          title="Send notifications to?"
          onPress={() => {}}
        />
        <SettingOption
          Icon={Ionicons}
          name={isAndroid() ? "md-person-outline" : "ios-person-outline"}
          title="Profile"
          onPress={() => props.navigation.navigate("Profile")}
        />
        <SettingOption Icon={MaterialIcons} name={"security"} title="Privacy" />
        <SettingOption
          Icon={Ionicons}
          name={
            isAndroid() ? "md-lock-closed-outline" : "ios-lock-closed-outline"
          }
          title="Set App Password"
          onPress={() => setWhatToOpen("appPassword")}
        />
        <SettingOption
          Icon={Ionicons}
          name={isAndroid() ? "md-log-out-outline" : "ios-log-out-outline"}
          title="Logout"
          onPress={() => dispatch(logout())}
        />
      </View>
      <View style={style.section}>
        <SettingOption
          Icon={Ionicons}
          name={isAndroid() ? "md-trash-outline" : "ios-trash-outline"}
          title="Delete Account"
          onPress={() => dispatch(deleteMe())}
          color="red"
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          marginVertical: 10,
          marginBottom: 20,
          color: "rgba(0, 0, 0, 0.7)",
          fontSize: 12,
        }}
      >
        Crime Alert App for {toTitleCase(Platform.OS)} v{Platform.Version}
      </Text>
      <BottomPopup
        modalVisible={whatToOpen === "notification"}
        closeModal={() => {
          setWhatToOpen("");
        }}
      >
        <NotificationSetting close={() => setWhatToOpen("")} />
      </BottomPopup>
      <BottomPopup
        modalVisible={whatToOpen === "appPassword"}
        closeModal={() => {
          setWhatToOpen("");
        }}
      >
        <SetAppPassword close={() => setWhatToOpen("")} />
      </BottomPopup>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  ...sectionStyle,
  value: {
    color: colors.textPrimary,
  },
  valueTitle: {
    fontSize: 12,
    marginVertical: 5,
    color: "rgba(0, 0, 0, 0.3)",
  },
  settingOption: {
    marginLeft: 15,
  },
});

export default SettingScreen;
