import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-0";

import { styles, theme } from "../theme/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import LoadingScreen from "./LoadingScreen";
import { fetchingPersonDetails, fetchingPersonMovies, image185 } from "../api/moviedb";

export default function ProfileScreen() {
  const [isFav, toggleFav] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [personDetail, setPersonDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params;


  useEffect(() => {
    getPersonDetails(id);
    getPersonMovies(id);

  }, [id]);

  const getPersonDetails = async (id) => {
    const data = await fetchingPersonDetails(id);
    setPersonDetail(data);
    setLoading(false)
  }

  const getPersonMovies = async (id) => {
    const data = await fetchingPersonMovies(id);
    setPersonMovies(data?.cast);
    setLoading(false)
  }


  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
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

      {loading ? (
        <LoadingScreen />
      ) : (
        <View>
          <View className="flex-row justify-center mt-32">
            <View
              style={{
                shadowColor: "gray",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                elevation: 20,
                borderRadius: 999,
                backgroundColor: "#262626",
                padding: 6,
              }}
            >
              <View
                className="items-center border-2 rounded-full border-neutral-500"
                style={{
                  height: 288,
                  width: 288,
                  overflow: "hidden",
                  borderRadius: 999,
                }}
              >
                <Image
                  source={
                    personDetail?.profile_path
                      ? { uri: image185(personDetail?.profile_path) }
                      : require("../assets/fallovercast.jpg")
                  }
                  style={{
                    height: height * 0.43,
                    width: width * 0.74,
                    resizeMode: "cover",
                  }}
                />
              </View>
            </View>
          </View>

          {/* Name Below */}
          <View className="items-center mt-12">
            <Text className="text-3xl font-bold text-center text-white">
              {personDetail?.name}
            </Text>
          </View>

          {/* Birthplace */}
          <View className="items-center mt-6">
            <Text className="text-center text-1xl text-neutral-500">
              {personDetail?.place_of_birth}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row items-center justify-between p-4 mx-3 mt-6 rounded-full bg-neutral-500">
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-white">Gender</Text>
              <Text className="text-sm text-neutral-300">
                {personDetail?.gender === 0
                  ? "Not Specified"
                  : personDetail?.gender === 1
                    ? "Female"
                    : personDetail?.gender === 2
                      ? "Male"
                      : personDetail?.gender === 3
                        ? "Non Binary"
                        : "Unknown"}
              </Text>
            </View>
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-white">Birthday</Text>
              <Text className="text-sm text-neutral-300">{personDetail?.birthday ? personDetail?.birthday : "NA"}</Text>
            </View>
            <View className="items-center px-2 border-r-2 border-r-neutral-400">
              <Text className="font-semibold text-white">Known For</Text>
              <Text className="text-sm text-neutral-300">{personDetail?.known_for_department}</Text>
            </View>
            <View className="items-center px-2">
              <Text className="font-semibold text-white">Popularity</Text>
              <Text className="text-sm text-neutral-300">{personDetail?.popularity}</Text>
            </View>
          </View>

          {/* Bio */}
          <View className="mx-4 my-6">
            <Text className="text-lg text-white">Biography</Text>
            <Text className="mt-2 text-sm tracking-normal text-neutral-400">
              {personDetail?.biography}
            </Text>
          </View>

          {/* Person Movies */}
          <MovieList title={"Movies"} data={personMovies} hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}