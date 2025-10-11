import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Saved() {
  const insets = useSafeAreaInsets();

  return (
    <View 
      // style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1  bg-primary"
    >
      <Text className="font-bold text-4xl text-white">Movie Mood</Text>
    </View>
  );
}
