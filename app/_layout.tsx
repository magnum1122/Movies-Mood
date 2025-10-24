import { AppwriteProvider } from "@/services/appwrite/AppwriteContext";
import "./global.css"
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider} from "react-native-safe-area-context";

export default function RootLayout() {

  return(
    <SafeAreaProvider>
      <AppwriteProvider>
        <StatusBar hidden={true}/>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen
          name="(protected)"
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          />
          <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          />
        </Stack>
      </AppwriteProvider>
    </SafeAreaProvider>
  )
}
