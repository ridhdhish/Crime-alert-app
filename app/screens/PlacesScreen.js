import { Picker } from "@react-native-picker/picker";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../colors/index";
import React, { useState, useEffect, Fragment } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAroundData } from "../store/actions/crime";
import Layout from "../components/Layout";
import { useNotification } from "../hooks/useNotification";
import { ScrollView } from "react-native-gesture-handler";

const PlacesScreen = (props) => {
  const cityData = useSelector((state) => state.crime.cityData);
  useNotification();
  const [leftPriority, setLeftPriority] = useState([
    "Surat",
    "Vadodara",
    "Ahmedabad",
    "Rajkot",
    "Mumbai",
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [selectedValue, setSelectedValue] = useState("Surat");

  const [monthData, setMonthData] = useState(Array(12).fill(0));
  const dispatch = useDispatch();

  const getData = async () => {
    setIsRefreshing(true);
    await dispatch(getAroundData({ city: selectedValue }));
    setIsRefreshing(false);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAroundData({ city: selectedValue }));
    setIsLoading(() => false);
  }, [selectedValue]);

  useEffect(() => {
    const newArray = Array(12).fill(0);
    cityData.places.forEach((place) => {
      const month = new Date(place["createdAt"]).getMonth();
      newArray[month]++;
    });
    setMonthData((prev) => [...newArray]);
  }, [cityData]);

  return (
    <Layout navigation={props.navigation}>
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={() => getData()}
            refreshing={isRefreshing}
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.backgroundPrimary} />
        ) : (
          <Fragment>
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.backgroundSecondary,
              }}
            >
              <View
                style={{
                  height: 50,
                  width: 200,
                  borderColor: "white",
                  borderWidth: 2,
                  borderRadius: 5,
                  overflow: "hidden",
                  marginBottom: 16,
                  marginTop: 25,
                }}
              >
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => {
                    setSelectedValue(() => itemValue);
                  }}
                  dropdownIconColor="white"
                  style={{
                    color: "white",
                  }}
                >
                  {leftPriority.map((priority) => (
                    <Picker.Item
                      label={priority}
                      value={priority}
                      key={priority}
                    />
                  ))}
                </Picker>
              </View>
              <LineChart
                data={{
                  labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  datasets: [
                    {
                      data: monthData,
                    },
                  ],
                }}
                width={Dimensions.get("window").width}
                height={280}
                fromZero={true}
                chartConfig={{
                  backgroundColor: colors.backgroundSecondary,
                  backgroundGradientFrom: colors.backgroundSecondary,
                  backgroundGradientTo: colors.backgroundSecondary,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  propsForDots: {
                    r: "8",
                    strokeWidth: "2",
                    stroke: colors.backgroundAccent,
                  },
                }}
                bezier
                style={{
                  marginVertical: 18,
                  alignItems: "center",
                  zIndex: 10,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 80,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  backgroundColor: colors.backgroundTertiary,
                  borderRadius: 5,
                  width: 150,
                  height: 100,
                  marginRight: 20,
                  elevation: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{ marginTop: 10, color: colors.textSecondary }}>
                  Total Cases
                </Text>
                <Text
                  style={{ fontSize: 30, fontWeight: "bold", marginTop: 7 }}
                >
                  {cityData.totalCrimes}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.backgroundTertiary,
                  borderRadius: 5,
                  width: 150,
                  height: 100,
                  elevation: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{ marginTop: 10, color: colors.textSecondary }}>
                  Avg case/month
                </Text>
                <Text
                  style={{ fontSize: 30, fontWeight: "bold", marginTop: 7 }}
                >
                  {(cityData.totalCrimes / 12).toFixed(2)}
                </Text>
              </View>
            </View>
          </Fragment>
        )}
      </ScrollView>
    </Layout>
  );
};

export default PlacesScreen;
