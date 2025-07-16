import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Text className="text-red-500">HomeScreens</Text>
      <Button title="Go to" onPress={() => navigation.navigate("Profile")} />
    </SafeAreaView>
  );
}
