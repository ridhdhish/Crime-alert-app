import React, { Fragment } from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
import { View, Dimensions } from "react-native";

const CustomContentLoader = (props) => {
  return (
    <Fragment>
      {!props.map ? (
        <ContentLoader
          height={100}
          width={350}
          viewBox="0 0 320 54"
          backgroundColor="#ddd"
          foregroundColor="#bbb"
        >
          <Circle cx="35" cy="27" r="25" />
          <Rect x="65" y="7" rx="3" ry="3" width="150" height="10" />
          <Rect x="65" y="21" rx="3" ry="3" width="80" height="10" />
          <Rect x="65" y="35" rx="3" ry="3" width="70" height="10" />
          <Circle cx="305" cy="12" r="8" />
          <Circle cx="305" cy="35" r="8" />
          <Rect x="10" y="60" rx="0" ry="0" width="310" height="1" />
          <Rect x="219" y="146" rx="0" ry="0" width="0" height="0" />
        </ContentLoader>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginHorizontal: Dimensions.get("window").width / 5,
          }}
        >
          <ContentLoader
            viewBox="0 0 800 400"
            height={400}
            width={Dimensions.get("window").width}
            backgroundColor="#ddd"
            foregroundColor="#bbb"
          >
            <Path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
            <Rect x="0.53" y="328.35" width="87.36" height="16.48" rx="4.5" />
            <Rect x="95.84" y="328.35" width="87.36" height="16.48" rx="4.5" />
            <Rect
              x="195.38"
              y="328.35"
              width="304.45"
              height="16.48"
              rx="4.5"
            />
            <Rect x="412.47" y="358.52" width="87.36" height="16.48" rx="4.5" />
            <Rect
              x="291.22"
              y="358.52"
              width="113.31"
              height="16.48"
              rx="4.5"
            />
            <Rect x="0.53" y="358.52" width="282.21" height="16.48" rx="4.5" />
          </ContentLoader>
        </View>
      )}
    </Fragment>
  );
};

export default CustomContentLoader;
