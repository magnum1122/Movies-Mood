import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
  return (
    <View>
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-32'>
                <Image
                    source={{
                        uri: poster_path? `https://image.tmdb.org/t/p/w500${poster_path}`
                                        : `https://placehold.co/600x400/1a1a1a/ffffff.png`  
                    }}
                    className='w-full h-52 rounded-lg'
                    // style={{width: 110, height: 250}}
                    resizeMode="cover"
                />
                <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>{title}</Text>
                <View className='flex-row items-center justify-start gap-x-1'>
                    <Ionicons name="star-sharp" size={16} color="yellow" />
                    <Text className='text-sm text-white font-bold uppercase'>{Math.round(vote_average/2)}</Text>
                </View>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-sm  text-slate-500 font-semibold mt-1'>
                        {release_date?.split('-')[0]}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    </View>
  )
}

export default MovieCard