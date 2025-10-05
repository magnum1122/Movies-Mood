import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Search() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset
  } = useFetch(() =>
    fetchMovies({
      query: searchQuery,
    }), false)

    useEffect(() => {
      const func = async () => {
        if(searchQuery.trim()) {
        await loadMovies();
      } else {
        reset()
      }
      }

      func()
    }, [searchQuery])

  return (
    <View 
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1  bg-primary"
    >
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>
      <FlatList
      data={movies}
      renderItem={({item}) => <MovieCard {...item}/>}
      keyExtractor={(item) => item.id.toString()}
      className="px-5"
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: "flex-start",
        gap: 12,
        marginVertical: 16
      }}
      contentContainerStyle={{paddingBottom: 100}}
      ListHeaderComponent={
        <>
          <View className="w-full flex-row justify-center mt-10  items-center">
            <Image source={icons.logo} className="w-12 h-10"/>
          </View>
          <View className="my-5">
            <SearchBar 
              placeholder="Search movies..."
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            />
          </View>

          {moviesLoading && (
            <ActivityIndicator
                size="large"
                color={"#FF6467"}
                className="mt-10 self-center"
              />
          )}
          {moviesError && (
            <Text className="text-red-500 px-5 my-3">
              Error: {moviesError.message}
            </Text>
          )}
          {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
            <Text className="text-xl text-white font-bold">
              Search results for{' '}
              <Text className="text-ui_400">{searchQuery}</Text>
            </Text>
          )}
        </>
      }
      />
    </View>
  );
}
