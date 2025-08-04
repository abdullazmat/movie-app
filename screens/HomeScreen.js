import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import { styles } from "../theme/constants.js";
import MovieList from "../components/MovieList.js";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS === "ios";

export default function HomeScreen({ }) {
  const [trending, setTrending] = useState([1, 2, 3, 4, 5, 6]);
  const [upcoming, setUpcoming] = useState([1, 2, 3, 4, 5, 6]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mt-12"}>
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between mx-4">
          <Bars3CenterLeftIcon size={30} color="white" />
          <Text className="text-3xl font-bold text-white">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending Movies Carousel */}
        <TrendingMovies data={trending} />

        {/* Upcoming Movies Carousel */}
        <MovieList title="Upcoming" data={upcoming} />

        {/* TopRated Movies Carousel */}
        <MovieList title="TopRated" data={topRated} />
      </ScrollView>
    </View>
  );
}
