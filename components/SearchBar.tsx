import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  placeholder: string;
  value?: string,
  onPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({placeholder, onPress, value, onChangeText }: Props) => {

  return (
    <View className="relative z-10 rounded-full">
      <View
        className={"flex-row justify-end items-center pr-2 bg-white-45 rounded-full"}
      >
        <TextInput
          onPress={onPress}
          placeholder={placeholder}
          placeholderTextColor={"white"}
          cursorColor={"white"}
          value={value}
          onChangeText={onChangeText}
          className="p-2 h-15 pb-2 flex-1 text-xl rounded-lg ml-2 text-white"
        />
        <Ionicons name="search" size={20} color="black" className="mr-2" />
      </View>
    </View>
  );
};

export default SearchBar;
