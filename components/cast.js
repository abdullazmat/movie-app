import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import { image185 } from "../api/moviedb";

export default function Cast({ person, navigation }) {

  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white"> Top Cast </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {person &&
          person?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="items-center mr-4"
                onPress={() => navigation.navigate("Person", item.id)}
              >
                <View className="items-center w-20 h-20 overflow-hidden border rounded-full border-neutral-500">
                  <Image
                    className="w-20 h-20"
                    source={
                      item.profile_path
                        ? { uri: image185(item.profile_path) }
                        : require("../assets/fallovercast.jpg")
                    }

                  />
                </View>

                <Text className="mt-1 text-xs text-white">
                  {item?.character?.length > 12
                    ? item?.character.slice(0, 12) + " ..."
                    : item?.character}
                </Text>
                <Text className="mt-1 text-xs text-neutral-400">
                  {item?.name > 12
                    ? item?.name?.slice(0, 12) + " ..."
                    : item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
