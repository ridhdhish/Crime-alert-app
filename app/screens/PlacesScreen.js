import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";

import { LineChart, BarChart } from "react-native-chart-kit";
import { colors } from "../colors/index";

import { LinearGradient } from "expo-linear-gradient";

const PlacesScreen = () => {
  const [state, setState] = useState({ country: "uk" });
  const [leftPriority, setLeftPriority] = useState([
    "Surat",
    "Vadodara",
    "Ahmedabad",
    "Rajkot",
    "Mumbai",
  ]);
  const [selectedValue, setSelectedValue] = useState("Select City");
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fb8c00",
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
            marginTop: 20,
          }}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            dropdownIconColor="white"
            style={{
              color: "white",
            }}
            // mode="dropdown"
          >
            <Picker.Item label="Select City" value="-1" />
            {leftPriority.map((priority) => (
              <Picker.Item label={priority} value={priority} key={priority} />
            ))}
          </Picker>
        </View>

        <LineChart
          data={{
            labels: [
              "J",
              "F",
              "M",
              "A",
              "M",
              "J",
              "J",
              "A",
              "S",
              "O",
              "N",
              "D",
            ],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={280}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#fb8c00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#fb8c00",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 18,
            alignItems: "center",
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
            backgroundColor: "#f5af49",
            borderRadius: 5,
            width: 150,
            height: 100,
            marginRight: 20,
            elevation: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 10, color: "grey" }}>Total Cases</Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 7 }}>
            240
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#f5af49",
            borderRadius: 5,
            width: 150,
            height: 100,
            elevation: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 10, color: "grey" }}>Avg case/month</Text>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 7 }}>
            22
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PlacesScreen;
