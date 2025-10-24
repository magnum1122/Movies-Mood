import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from '@/components/TrendingCard';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendinMovies } from "@/services/appwrite/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: terendingLoading,
    error: trendingError
  } = useFetch(getTrendinMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );

  return (
    <View
      className="flex-1  bg-primary"
    >
      <Image source={images.bg} className="absolute w-full z-0" />
      {/* Replace ScrollView with FlatList */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 12,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="mt-2 px-5 pb-32"
        ListHeaderComponent={
          <View>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-16 mb-2 mx-auto"
            />

            {moviesLoading || terendingLoading ? (
              <ActivityIndicator
                size="large"
                color={"#FF6467"}
                className="mt-10 self-center"
              />
            ) : moviesError || trendingError ? (
              <Text>Error: {moviesError?.message || trendingError?.message}</Text>
            ) : (
              // SearchBar
              <View className="mt-5">
                <SearchBar
                  onPress={() => router.push("/search")}
                  placeholder="Search for a movie"
                />

                {trendingMovies && (
                <View className="mt-6">
                  <Text className="text-lg text-white font-bold mb-2">Trending Movies</Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-1"/>}
                    data={trendingMovies}
                    keyExtractor={(item) => item.movie_id.toString()}
                    renderItem={({item, index}) => (
                      <TrendingCard movie={item} index={index}/>
                    )}
                  />
                </View>
                )}

              </View>
            )}

            <Text className="text-lg text-white font-bold my-3">
              Latest Movies
            </Text>
          </View>
        }
        renderItem={({ item }) => <MovieCard {...item} />}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20, // Add padding for the bottom inset
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
