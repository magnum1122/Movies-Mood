import "../global.css"
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider} from "react-native-safe-area-context";
import { AppwriteContext } from "@/services/appwrite/AppwriteContext";
import Loading from "@/components/Loading"
import { useContext, useEffect, useState } from "react";


export default function ProtectedLayout() {

  const [isLoading, setIsLoading] = useState(true)
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext)

  useEffect(() => {
    appwrite
    .getCurrentUser()
    .then(response => {
      setIsLoading(false)
      if (response) {
        setIsLoggedIn(true)
      }
    })
    .catch(_ => {
      setIsLoading(false)
      setIsLoggedIn(false)
    })
  }, [appwrite, setIsLoggedIn, isLoggedIn])

   // Conditional based routing (!isLoggedIn)
  if(isLoading) {
    return (
      <Loading/>
    );
  }
  if(!isLoggedIn) {
    return <Redirect href="/Login"/>
  }
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
