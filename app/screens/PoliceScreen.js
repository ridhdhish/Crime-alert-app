import React, { Fragment, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { colors } from "../colors";
import CustomButton from "../components/CustomButton";
import { dummyPoliceStations } from "../utils/dummyPoliceStationData";
import { openInMaps } from "../utils/openInMap";

const PoliceScreen = ({}) => {
  const [policeStations, setPoliceStation] = useState([]);
  useEffect(() => {
    setPoliceStation(dummyPoliceStations);
  }, []);

  return (
    <Fragment>
      <FlatList
        keyExtractor={(item) => item.place_id}
        data={policeStations}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 5,
              margin: 5,
              backgroundColor: colors.textSecondary,
              borderRadius: 10,
              paddingHorizontal: 10,
              flexDirection: "row",
              paddingVertical: 10,
            }}
          >
            <View>
              <Text>{item.name}</Text>
              <Text>Address</Text>
              <Text>Contact</Text>
              <CustomButton
                text={"Show Location"}
                style={{
                  backgroundColor: colors.backgroundSecondary,
                  borderRadius: 10,
                  width: 150,
                  alignItems: "center",
                  marginVertical: 5,
                }}
                touchableStyle={{
                  padding: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                textStyle={{
                  color: colors.textSecondary,
                }}
                onPress={() => {
                  openInMaps(item.geometry);
                }}
              />
            </View>
          </View>
        )}
      />
    </Fragment>
  );
};

export default PoliceScreen;
