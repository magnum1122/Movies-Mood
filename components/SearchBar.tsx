import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  placeholder: string,
  onPress?: () => void;
}

const SearchBar = ({placeholder, onPress}: Props) => {

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
          // onChangeText={handleTextDebounce}
          className="p-2 h-15 pb-2 flex-1 text-xl rounded-lg ml-2 text-white"
        />
        <Ionicons name="search" size={20} color="black" className="mr-2" />
        {/* <TouchableOpacity
          onPress={() => setShowSearch(!showSearch)}
          activeOpacity={1}
          className="rounded-full p-3 m-1"
          style={{backgroundColor: theme.bgWhite(0.3)}}
        >
          <Ionicons name="search" size={20} color="black" className="mr-2" />
        </TouchableOpacity> */}
      </View>
      {/* {
          locations.length > 0 && showSearch?(
            <View className="absloute w-full bg-gray-300 top-3 rounded-3xl">
              {
                locations.map((loc, index) => {
                  let showBorder = index+1 != locations.length;
                  let bordeClass = showBorder? 'border-b-2 border-b-gray-400' : '';
                  return(
                    <TouchableOpacity
                      onPress={() => handleLocation(loc)}
                      key={index}
                      className={"flex-row items-center border-0 p-3 px-4 mb-1 " + bordeClass}
                    >
                      <MapPinIcon size={20} color={'gray'}/>
                      <Text className="text-black text-lg ml-2">{loc?.name}, {loc?.country}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          ): null
        } */}
    </View>
  );
};

export default SearchBar;
