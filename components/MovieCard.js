import React from "react";
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function MovieCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require("../assets/megan.webp")}
        style={{ width: width * 0.65, height: height * 0.45, borderRadius: 16 }}
        className="rounded-3xl"
        resizeMode="cover"
      />
    </TouchableWithoutFeedback>
  );
}
