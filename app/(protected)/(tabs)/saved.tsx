import { Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState, useCallback } from "react";
import { getSavedMovies } from "@/app/utils/asyncstorage";
import { fetchMovieDetails } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFocusEffect } from "expo-router";

export default function Saved() {
  const insets = useSafeAreaInsets();
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reload saved movies when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSavedMovies();
    }, [])
  );

  const loadSavedMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get saved movie IDs
      const savedIds = await getSavedMovies();
      
      if (savedIds.length === 0) {
        setSavedMovies([]);
        setLoading(false);
        return;
      }

      // Fetch details for each saved movie
      const moviePromises = savedIds.map(async (id) => {
        try {
          const movieDetails = await fetchMovieDetails(id.toString());
          // Convert MovieDetails to Movie format
          return {
            id: movieDetails.id,
            title: movieDetails.title,
            adult: movieDetails.adult,
            backdrop_path: movieDetails.backdrop_path || "",
            genre_ids: movieDetails.genres.map(g => g.id),
            original_language: movieDetails.original_language,
            original_title: movieDetails.original_title,
            overview: movieDetails.overview || "",
            popularity: movieDetails.popularity,
            poster_path: movieDetails.poster_path || "",
            release_date: movieDetails.release_date,
            video: movieDetails.video,
            vote_average: movieDetails.vote_average,
            vote_count: movieDetails.vote_count,
          } as Movie;
        } catch (err) {
          console.error(`Error fetching movie ${id}:`, err);
          return null;
        }
      });

      const movies = await Promise.all(moviePromises);
      // Filter out null values (failed fetches)
      const validMovies = movies.filter((movie): movie is Movie => movie !== null);
      
      setSavedMovies(validMovies);
    } catch (err) {
      console.error('Error loading saved movies:', err);
      setError('Failed to load saved movies');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View 
      // style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className="absolute w-full z-0"/>
      
      <FlatList
        data={savedMovies}
        renderItem={({item}) => <MovieCard {...item}/>}
        keyExtractor={(item) => item.id.toString()}
        className="mt-2 px-5 pb-32"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 12,
          marginVertical: 8
        }}
        contentContainerStyle={{paddingBottom: 20}}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center">
            <Image source={icons.logo} className="w-12 h-10 mt-16 mb-2 mx-auto"/>
              {/* <Image source={icons.logo} className="w-12 h-10 mt-7 mb-4 mx-auto"/> */}
            </View>
            <Text className="font-bold text-2xl text-white mb-4">
              Saved Movies
            </Text>
            
            {loading && (
              <ActivityIndicator
                size="large"
                color={"#C11007"}
                className="mt-10 mb-10"
              />
            )}
            
            {error && (
              <View className="mt-5 mb-5">
                <Text className="text-red-500 text-center text-base">
                  {error}
                </Text>
                <TouchableOpacity 
                  onPress={loadSavedMovies}
                  className="mt-3 bg-ui_700 rounded-lg py-2 px-4 self-center"
                >
                  <Text className="text-white font-semibold">Retry</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-lg text-gray-400 mb-2">
                No saved movies yet
              </Text>
              <Text className="text-center text-sm text-gray-500">
                Tap the bookmark icon on any movie to save it
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}