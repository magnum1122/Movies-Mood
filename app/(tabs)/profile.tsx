import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();

  return (
    <View 
      style= {{paddingTop: insets.top}}
      className="flex-1 bg-slate-950"
    >
      <Text className="font-bold text-4xl text-white">Movie Mood</Text>
    </View>
  );
}
