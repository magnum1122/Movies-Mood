import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_MOVIES_KEY = '@saved_movies';

/**
 * Get all saved movie IDs from AsyncStorage
 */
export const getSavedMovies = async (): Promise<number[]> => {
  try {
    const savedMovies = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
    return savedMovies ? JSON.parse(savedMovies) : [];
  } catch (error) {
    console.error('Error getting saved movies:', error);
    return [];
  }
};

/**
 * Save a movie ID to AsyncStorage
 */
export const saveMovie = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    
    // Check if movie is already saved
    if (savedMovies.includes(movieId)) {
      return true;
    }
    
    // Add new movie ID
    const updatedMovies = [...savedMovies, movieId];
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updatedMovies));
    return true;
  } catch (error) {
    console.error('Error saving movie:', error);
    return false;
  }
};

/**
 * Remove a movie ID from AsyncStorage
 */
export const unsaveMovie = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    const updatedMovies = savedMovies.filter(id => id !== movieId);
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updatedMovies));
    return true;
  } catch (error) {
    console.error('Error unsaving movie:', error);
    return false;
  }
};

/**
 * Check if a movie is saved
 */
export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getSavedMovies();
    return savedMovies.includes(movieId);
  } catch (error) {
    console.error('Error checking if movie is saved:', error);
    return false;
  }
};

/**
 * Clear all saved movies
 */
export const clearAllSavedMovies = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(SAVED_MOVIES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing saved movies:', error);
    return false;
  }
};