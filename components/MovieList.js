import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "../theme/constants";
import { useNavigation } from "@react-navigation/native";
import { image185, image342 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.push("Movie", { item });
  };
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row items-center justify-between mx-4 mb-4">
        <Text className="text-xl text-white">{title}</Text>
        <TouchableOpacity>
          {!hideSeeAll && (
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          )}
        </TouchableOpacity>
      </View>
      {/* Movie Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => handleClick(item)}
              key={index}
            >
              <View className="mr-4 space-y-1">
                <Image
                  source={
                    item?.poster_path
                      ? { uri: image185(item?.poster_path) }
                      : require("../assets/poster_fallback.png")
                  }
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 16,
                  }}
                  className="rounded-3xl"
                  resizeMode="cover"
                />

                <Text className="ml-1 text-neutral-300">
                  {item?.title?.length > 14
                    ? item?.title?.slice(0, 14) + " ..."
                    : item?.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
