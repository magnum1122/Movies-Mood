import { AppwriteContext } from '@/services/appwrite/AppwriteContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type UserObj = {
  name: string | undefined;
  email: string | undefined;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserObj | null>(null); // Initialize to null
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);

  const handleLogout = () => {
    appwrite.logout()
      .then(() => {
        setIsLoggedIn(false);
      });
  }

  useEffect(() => {
    appwrite.getCurrentUser()
      .then(response => {
        if (response) {
          const user: UserObj = {
            name: response?.name,
            email: response?.email,
          }
          setUserData(user);
        }
      })
      .catch(error => {
        console.error("Error getting current user:", error);
      });
  }, [appwrite]);

  return (
    <View className="flex-1 bg-primary px-5 py-14">
      {/* Header / Welcome */}
      <View className="mt-10 mb-8 items-center gap-3">
        <Text className="text-5xl font-bold text-white">
          Welcome,
        </Text>
        <Text className="text-ui_400 text-5xl font-bold">
          {userData ? userData.name?.split(" ")[0] : "Guest"}
        </Text>
        <Text className="text-5xl font-bold">🤩</Text>
      </View>

      {/* Profile Card */}
      <View className="bg-white/10 rounded-2xl p-6 items-center shadow-md">
        {/* Avatar */}
        <Image
          source={require("@/assets/icons/user.png")}
          className="w-28 h-28 rounded-full border-2 border-ui_400 mb-4"
        />

        {/* User Info */}
        <Text className="text-2xl font-semibold text-white">
          {userData ? userData.name : "Guest"}
        </Text>
        <Text className="text-ui_200 text-sm mt-1">
          {userData ? userData.email : "No email available"}
        </Text>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center mt-8 bg-ui_400 rounded-full px-6 py-3"
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="ml-2 text-white text-lg font-semibold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Optional Footer */}
      <View className="mt-10 items-center">
        <Text className="text-ui_300 text-base">
          Keep discovering amazing movies 🎥
        </Text>
      </View>
    </View>
  )
}

export default Profile