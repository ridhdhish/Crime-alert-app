import React from "react";
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
import { useDispatch, useSelector } from "react-redux";

const SettingScreen = (props) => {
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
          name={isAndroid() ? "md-arrow-back" : "ios-arrow-back"}
          size={30}
          color={colors.textSecondary}
          style={{
            margin: 10,
          }}
          onPress={() => props.navigation.goBack()}
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
        <View style={style.userDetails}>
          <Text style={style.value}>+91 {user.mobileNumber}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile")}
          >
            <Text style={style.valueTitle}>Tap to change mobile number</Text>
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity
          style={{
            ...style.userDetails,
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Ionicons
            name={
              isAndroid()
                ? "md-notifications-outline"
                : "ios-notifications-outline"
            }
            size={30}
          />
          <Text style={style.settingOption}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...style.userDetails,
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Ionicons
            name={isAndroid() ? "md-person-outline" : "ios-person-outline"}
            size={30}
          />
          <Text style={style.settingOption}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...style.userDetails,
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="security" size={30} />
          <Text style={style.settingOption}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...style.userDetails,
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Ionicons
            name={
              isAndroid() ? "md-lock-closed-outline" : "ios-lock-closed-outline"
            }
            size={30}
          />
          <Text style={style.settingOption}>Set Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...style.userDetails,
            flexDirection: "row",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Ionicons
            name={isAndroid() ? "md-log-out-outline" : "ios-log-out-outline"}
            size={30}
          />
          <Text style={style.settingOption}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          textAlign: "center",
          marginVertical: 10,
          color: "rgba(0, 0, 0, 0.7)",
        }}
      >
        Crime Alert App for {toTitleCase(Platform.OS)} v{Platform.Version}
      </Text>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.textSecondary,
    borderRadius: 10,
    elevation: 2,
  },
  userDetails: {
    marginVertical: 5,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 1,
  },
  sectionTitle: {
    color: colors.backgroundSecondary,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5,
  },
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
