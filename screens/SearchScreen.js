import { useNavigation } from '@react-navigation/native';
import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context'
import LoadingScreen from './LoadingScreen';

const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const movieName = "Spiderman - Megan Some Shit"

    return (
        <SafeAreaView className="flex-1 bg-neutral-800">
            <View className="flex-row items-center justify-between mx-4 mt-3 mb-3 border rounded-full border-neutral-500 ">
                <TextInput placeholder='Search Movie' placeholderTextColor={'lightgray'} className="flex-1 pb-1 pl-6 text-base font-semibold tracking-wider text-white" />
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
                                                onPress={() => navigation.push("Movie", item)}
                                            >
                                                <View className="mb-4 space-y-2">
                                                    <Image className="rounded-3xl" style={{ width: width * 0.44, height: height * 0.3 }} source={require('../assets/megan.webp')} />
                                                    <Text className="m-1 text-sm text-neutral-300">{movieName.length > 20 ? movieName.slice(0, 22) + ' ...' : movieName}</Text>
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
