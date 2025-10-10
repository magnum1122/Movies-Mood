import "./global.css"
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider} from "react-native-safe-area-context";

export default function RootLayout() {

  return(
    <SafeAreaProvider>
    <StatusBar hidden={true}/>
    
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="(tabs)"
        options={{headerShown: false}} 
      />
      <Stack.Screen
        name="movies/[id]"
        options={{headerShown: false}}
      />
    </Stack>
    </SafeAreaProvider>
  )
}
