import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";

import { LineChart, BarChart } from "react-native-chart-kit";

const PlacesScreen = () => {
  const [state, setState] = useState({ country: "uk" });
  return (
    <View>
      <Text style={{ fontSize: 20, marginHorizontal: 20, marginVertical: 10 }}>
        Citylight
      </Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={300}
        height={220}
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
          marginVertical: 8,
          borderRadius: 16,
          alignItems: "center",
        }}
      />
      <Text style={{ textAlign: "center", fontSize: 18 }}>Crime per Month</Text>
    </View>
  );
};

export default PlacesScreen;
