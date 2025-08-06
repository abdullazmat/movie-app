import { useNavigation } from '@react-navigation/native';
import React, { Component, useCallback, useState } from 'react'
import { Text, StyleSheet, View, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingScreen from './LoadingScreen';
import debounce from 'lodash/debounce';
import { fetchingSearchedMovies, image500 } from '../api/moviedb';


const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const movieName = "Spiderman - Megan Some Shit"
    const handleSearch = value => {
        if (value && value.length > 2) {
            setLoading(true);
            fetchingSearchedMovies({
                query: value, include_adult: 'false', languag: 'en-US', page: '1'
            }).then(data => {
                setLoading(false);
                setResults(data?.results)

            });
        }
        else {
            setLoading(false);
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            <View className="flex-row items-center justify-between mx-4 mt-3 mb-3 border rounded-full border-neutral-500 ">
                <TextInput onChangeText={handleTextDebounce} placeholder='Search Movie' placeholderTextColor={'lightgray'} className="flex-1 pb-1 pl-6 text-base font-semibold tracking-wider text-white" />
                <TouchableOpacity onPress={() => { navigation.navigate("Home") }} className="p-3 m-1 rounded-full bg-neutral-500" >
                    <XMarkIcon size={25} color="white" />
                </TouchableOpacity>
            </View>



            {
                loading ? <LoadingScreen /> :

                    results.length > 0 ? (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className="space-y-3" >
                            <Text className="ml-1 font-semibold text-white">Results ({results.length})</Text>
                            <View className="flex-row flex-wrap justify-between mt-3 ">
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push("Movie", { item })}
                                            >
                                                <View className="mb-4 space-y-2">
                                                    <Image className="rounded-3xl" style={{ width: width * 0.44, height: height * 0.3 }} source={
                                                        item?.poster_path
                                                            ? { uri: image500(item?.poster_path) }
                                                            : require("../assets/poster_fallback.png")
                                                    } />
                                                    <Text className="m-1 text-sm text-neutral-300">{item?.title.length > 20 ? item?.title?.slice(0, 22) + ' ...' : item?.title}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-row p-12" >
                            <Image
                                className="rounded-xl"
                                source={require("../assets/search.png")}
                                style={{ width: width * 0.80, height: height * 0.3 }}
                            />
                        </View>
                    )
            }


        </SafeAreaView>
    )

}

const styles = StyleSheet.create({})
