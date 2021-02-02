import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";

import { LineChart, BarChart } from "react-native-chart-kit";
import { colors } from "../colors/index";

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
      <Text
        style={{
          fontSize: 25,
          marginHorizontal: 10,
          marginVertical: 20,
          fontWeight: "bold",
        }}
      >
        Surat
      </Text>
      <LineChart
        data={{
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
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
        width={350}
        height={250}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 18,
          borderRadius: 16,
          alignItems: "center",
        }}
      />
      <Text style={{ textAlign: "center", fontSize: 18 }}>Crime per Month</Text>
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <View
          style={{
            height: 50,
            width: 300,
            borderColor: colors.textAccent,
            borderWidth: 2,
            borderRadius: 5,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            dropdownIconColor={colors.backgroundSecondary}
            // mode="dropdown"
          >
            <Picker.Item label="Select City" value="-1" />
            {leftPriority.map((priority) => (
              <Picker.Item label={priority} value={priority} key={priority} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default PlacesScreen;
