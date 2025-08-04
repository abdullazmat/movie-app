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

const { width, height } = Dimensions.get("screen");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-0";

export default function MovieScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const item = params?.item || {};
  const [isFav, toggleFav] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  let movieName = "Movie Name Reign of the Regnarok";

  useEffect(() => { }, [item]);

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
                source={require("../assets/megan.webp")}
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
          {movieName}
        </Text>
        {/* Released date info */}
        <Text className="mt-5 text-base font-semibold text-center text-neutral-400">
          Released - 2020 - 170 min
        </Text>
        {/* Genres */}
        <View className="flex-row justify-center mx-4 mt-5 space-x-10">
          <Text className="mx-2 text-base font-semibold text-center text-neutral-400">
            Action -
          </Text>
          <Text className="mx-2 text-base text-center text-neutral-400">
            Drama -
          </Text>
          <Text className="mx-2 text-base text-center text-neutral-400">
            Thriller
          </Text>
        </View>
        {/* Description */}
        <View className="mx-4 mt-4">
          <Text className="text-neutral-400">
            Two years after M3GAN's rampage, her creator Gemma resorts to
            resurrecting her infamous creation in order to take down Amelia
          </Text>
        </View>
        {/* Cast */}
        <Cast person={cast} navigation={navigation} />
        {/* Similar Movies */}
        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
      </View>
    </ScrollView>
  );
}