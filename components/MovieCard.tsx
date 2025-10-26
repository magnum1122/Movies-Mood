import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { isMovieSaved, saveMovie, unsaveMovie } from '../app/utils/asyncstorage'

const MovieCard = ({id, poster_path, title, vote_average, release_date}: Movie) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if movie is saved on mount
  useEffect(() => {
    checkSavedStatus();
  }, [id]);

  const checkSavedStatus = async () => {
    const saved = await isMovieSaved(id);
    setIsSaved(saved);
  };

  const handleSaveToggle = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (isSaved) {
        const success = await unsaveMovie(id);
        if (success) {
          setIsSaved(false);
        }
      } else {
        const success = await saveMovie(id);
        if (success) {
          setIsSaved(true);
        }
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View className='relative'>
      {/* Save Button - Top Right */}
      <TouchableOpacity 
        onPress={handleSaveToggle}
        className='absolute top-2 right-2 z-10 bg-black/60 rounded-full p-1.5'
        disabled={isProcessing}
      >
        <Ionicons 
          name={isSaved ? 'bookmark' : 'bookmark-outline'} 
          size={22} 
          color="#C11007" 
        />
      </TouchableOpacity>

      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-32'>
          <Image
            source={{
              uri: poster_path 
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : `https://placehold.co/600x400/1a1a1a/ffffff.png`  
            }}
            className='w-full h-52 rounded-lg'
            resizeMode="cover"
          />
          <Text className='text-sm font-bold text-white mt-2' numberOfLines={1}>
            {title}
          </Text>
          <View className='flex-row items-center justify-start gap-x-1'>
            <Ionicons name="star-sharp" size={16} color="yellow" />
            <Text className='text-sm text-white font-bold uppercase'>
              {Math.round(vote_average/2)}
            </Text>
          </View>
          <View className='flex-row items-center justify-between'>
            <Text className='text-sm text-ui_200 font-semibold mt-1'>
              {release_date?.split('-')[0]}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default MovieCard