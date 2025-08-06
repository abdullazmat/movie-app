import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme/constants";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/MovieList";
import LoadingScreen from "./LoadingScreen";
import { fetchingMoviesCast, fetchingMoviesDetails, fetchingSimilarMovies, image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("screen");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-0";

export default function MovieScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const item = params?.item || {};
  const [isFav, toggleFav] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getMovieDetails(item.id);
    getMovieCast(item.id);
    getSimilarMovies(item.id);

  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchingMoviesDetails(id);
    setMovieDetails(data);
    setLoading(false);

  }

  const getMovieCast = async (id) => {
    const data = await fetchingMoviesCast(id);
    setCast(data.cast);
    setLoading(false);

  }

  const getSimilarMovies = async (id) => {
    const data = await fetchingSimilarMovies(id);
    setSimilarMovies(data.results);
    setLoading(false);
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="relative w-full">
        <SafeAreaView
          className={`absolute z-20 flex-row items-center justify-between w-full px-4 ${topMargin}`}
        >
          <TouchableOpacity
            className="p-1 rounded-xl"
            onPress={() => navigation.goBack()}
            style={styles.background}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-1 rounded-xl"
            onPress={() => toggleFav(!isFav)}
          >
            <HeartIcon
              size={35}
              strokeWidth={2.5}
              color={isFav ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        <View className="relative" style={{ height: loading ? height * 0.75 : height * 0.55 }}>
          {loading ? (
            <View className="absolute top-0 left-0 z-10 w-full h-full">
              <LoadingScreen />
            </View>
          ) : (
            <>
              <Image
                source={
                  item?.poster_path
                    ? { uri: image500(item?.poster_path) }
                    : require("../assets/poster_fallback.png")
                }
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </>
          )}
        </View>
      </View>

      {/* Movie Details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-3xl font-bold text-center text-white" style={{ letterSpacing: 2 }}>
          {movieDetails?.title}
        </Text>
        {/* Released date info */}
        <Text className="mt-5 text-base font-semibold text-center text-neutral-400">
          Released - {movieDetails?.release_date?.slice(0, 4)} - {movieDetails?.runtime} min
        </Text>
        {/* Genres */}
        <View className="flex-row justify-center mx-4 mt-5 space-x-2">
          {movieDetails.genres?.map((item, index) => (
            <Text
              key={item.id}
              className="mx-2 text-base font-semibold text-center text-neutral-400"
            >
              {item.name}
              {index !== movieDetails.genres.length - 1 && index < 4 && '    -   '}
            </Text>
          ))}
        </View>

        {/* Description */}
        <View className="mx-4 mt-4">
          <Text className="text-neutral-400">
            {movieDetails.overview}
          </Text>
        </View>
        {/* Cast */}
        <Cast person={cast} navigation={navigation} />
        {/* Similar Movies */}
        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
      </View>
    </ScrollView >
  );
}