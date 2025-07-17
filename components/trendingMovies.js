import React from "react";
import { Text, View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "../components/MovieCard";

const { width, height } = Dimensions.get("window");
export default function TrendingMovies({ data }) {
  return (
    <View className="mb-8">
      <Text className="mx-4 mb-5 text-xl text-white">Trending</Text>
      <Carousel
        loop
        data={data}
        width={width * 1} // Full screen width
        height={height * 0.45} // Poster height
        autoPlay={false}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9, // Adjusted for better side visibility
          parallaxScrollingOffset: 160, // Reduced to a reasonable value
        }}
        scrollAnimationDuration={1000}
        style={{ alignSelf: "center" }}
        renderItem={({ item }) => <MovieCard item={item} />}
      />
    </View>
  );
}
