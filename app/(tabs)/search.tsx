import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite/appwrite";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset
  } = useFetch(() =>
    fetchMovies({
      query: searchQuery,
    }), false)

    useEffect(() => {
      const timeoutId = setTimeout (async () => {
        if(searchQuery.trim()) {
        await loadMovies();
      } else {
        reset()
      }
      }, 800)
      return () => clearTimeout(timeoutId);
    }, [searchQuery])

    useEffect(() => {
      if(movies?.length > 0 && movies?.[0]) {
          updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies]);


  return (
    <View 
      className="flex-1  bg-primary"
    >
      <Image source={images.bg} className="absolute w-full z-0"/>
      <FlatList
      data={movies}
      renderItem={({item}) => <MovieCard {...item}/>}
      keyExtractor={(item) => item.id.toString()}
      className="mt-2 px-5 pb-32"
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: "flex-start",
        gap: 12,
        marginVertical: 16
      }}
      contentContainerStyle={{paddingBottom: 100}}
      ListHeaderComponent={
        <>
          <View className="w-full flex-row justify-center items-center">
            <Image source={icons.logo} className="w-12 h-10 mt-16 mb-2 mx-auto"/>
          </View>
          <View className="my-5">
            <SearchBar 
              placeholder="Search movies..."
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />
          </View>

          {loading && (
            <ActivityIndicator
                size="large"
                color={"#FF6467"}
                className="mt-10 self-center"
              />
          )}
          {error && (
            <Text className="text-red-500 px-5 my-3">
              Error: {error.message}
            </Text>
          )}
          {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
            <Text className="text-xl text-white font-bold">
              Search results for{' '}
              <Text className="text-ui_400">{searchQuery}</Text>
            </Text>
          )}
        </>
      }
      ListEmptyComponent={
        !loading && !error ? (
          <View className="mt-5 px-5">
            <Text className="text-center text-lg text-gray-500">
              {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
            </Text>
          </View>
        ) : null
      }
      />
    </View>
  );
}
