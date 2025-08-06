import {
  View,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import LoadingScreen from "./LoadingScreen.js";
import { fetchingTopRatedMovies, fetchingTrendingMovies, fetchingUpcomingMovies } from "../api/moviedb.js";

const ios = Platform.OS === "ios";

export default function HomeScreen({ }) {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpComingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchingTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  }

  const getUpComingMovies = async () => {
    const data = await fetchingUpcomingMovies();
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  }


  const getTopRatedMovies = async () => {
    const data = await fetchingTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  }

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


      {
        loading ? <LoadingScreen /> : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {/* Trending Movies Carousel */}
            {
              trending.length > 0 && <TrendingMovies data={trending} />

            }

            {/* Upcoming Movies Carousel */}
            {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}

            {/* TopRated Movies Carousel */}
            <MovieList title="TopRated" data={topRated} />
          </ScrollView>
        )
      }


    </View>
  );
}
