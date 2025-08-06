import React from "react";
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

export default function MovieCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={
          item?.poster_path
            ? { uri: image500(item?.poster_path) }
            : require("../assets/poster_fallback.png")
        }
        style={{ width: width * 0.65, height: height * 0.45, borderRadius: 16 }}
        className="rounded-3xl"
        resizeMode="cover"
      />
    </TouchableWithoutFeedback>
  );
}
