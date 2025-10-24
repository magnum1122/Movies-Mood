import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import Ionicons from "@expo/vector-icons/Ionicons";

interface MovieInfoProp {
  label: string;
  value?: string | number | null;
}

function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hrs} hr` : `${hrs} hr ${mins} min`;
  }
}

const MovieInfo = ({ label, value }: MovieInfoProp) => (
  <View className="flex-col items-start justify-center mt-3">
    <Text className="text-ui_200 text-base font-semibold">{label}</Text>
    <Text className="text-ui_100 text-sm text-justify">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(false)
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if(loading){
    return(
    <View className="flex-1 justify-center items-center bg-primary ">
      <ActivityIndicator size={50} color={"#C11007"}/>
    </View>
    )
  }
  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="flex-1  bg-primary"
    >
      {/* <StatusBar hidden={true}/> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-2 px-2">
          <View className="flex-row items-center gap-x-1 mt-1">
            <Text className="text-white font-bold text-2xl">{movie?.title}</Text>
            <TouchableOpacity 
            onPress={() => setSaved(!saved)}
            >
              {/* Saved Icon */}
              <Ionicons name={saved? 'bookmark' : 'bookmark-outline'} size={28} color="#C11007" className="ml-72"/>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center gap-x-1 mt-1">
            <Text className="text-ui_200 text-sm font-semibold">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-ui_200 text-sm font-semibold">
              . {formatMinutes(movie?.runtime ?? 0)}
            </Text>
          </View>
          <View className="flex-row items-center px-2 py-1 rounded-md gap-x-1 bg-white-45 mt-2">
            <Ionicons name="star-sharp" size={16} color="yellow" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-ui_200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Gener"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget
                  ? `$${(movie.budget / 1_000_000).toFixed(1)} million`
                  : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movie?.revenue
                  ? `$${(movie.revenue / 1_000_000).toFixed(1)} million`
                  : "N/A"
              }
            />
          </View>
          <MovieInfo
            label="Production Comapanies"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-11 left-0 right-0 mx-5 bg-ui_700 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
      onPress={router.back}
      >
        <Ionicons name="arrow-back-sharp" size={16} color={"#fff"} />
        <Text className="text-white font-semibold text-base"> Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
