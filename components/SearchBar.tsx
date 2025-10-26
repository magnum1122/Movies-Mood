import { View, TextInput, TouchableOpacity } from "react-native";
import React, { forwardRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  placeholder: string;
  value?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = forwardRef<TextInput, Props>(
  ({ placeholder, onPress, value, onChangeText }, ref) => {
    // If onPress is provided (Home tab), make it a touchable button
    if (onPress) {
      return (
        <TouchableOpacity 
          onPress={onPress}
          className="relative z-10 rounded-full"
          activeOpacity={0.8}
        >
          <View className="flex-row justify-end items-center pr-2 bg-white-45 rounded-full">
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="white"
              editable={false}
              pointerEvents="none"
              className="p-2 h-15 pb-2 flex-1 text-xl rounded-lg ml-2 text-white"
            />
            <Ionicons name="search" size={20} color="black" className="mr-2" />
          </View>
        </TouchableOpacity>
      );
    }

    // Regular editable search bar (Search tab)
    return (
      <View className="relative z-10 rounded-full">
        <View className="flex-row justify-end items-center pr-2 bg-white-45 rounded-full">
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor="white"
            cursorColor="white"
            value={value}
            onChangeText={onChangeText}
            className="p-2 h-15 pb-2 flex-1 text-xl rounded-lg ml-2 text-white"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          <Ionicons name="search" size={20} color="black" className="mr-2" />
        </View>
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;