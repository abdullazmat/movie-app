import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Cast({ person, navigation }) {
  let charname = "John Wick";
  let personname = "Keanu Reevs";
  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white"> Top Cast </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {person &&
          person.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="items-center mr-4"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="items-center w-20 h-20 overflow-hidden border rounded-full border-neutral-500">
                  <Image
                    className="w-20 h-20"
                    source={require("../assets/kevvin.png")}
                  />
                </View>

                <Text className="mt-1 text-xs text-white">
                  {charname.length > 10
                    ? charname.slice(0, 10) + " ..."
                    : charname}
                </Text>
                <Text className="mt-1 text-xs text-neutral-400">
                  {personname.length > 12
                    ? personname.slice(0, 10) + " ..."
                    : personname}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
