import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { AppwriteContext } from "@/services/appwrite/AppwriteContext";

const Login = () => {
  const[showPass, setShowPass] = useState(false)
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
  if (email.length < 1 || password.length < 1) {
    setError("All fields are required");
    return;
  }

  try {
    const user = { email, password };
    const resp = await appwrite.login(user); // await session creation
    console.log("login response:", resp);

    if (resp) {
      setIsLoggedIn(true);
      router.replace("/");
    } else {
      setError("Login failed");
    }
  } catch (e: any) {
    console.log("login error:", e);
    setError(e?.message ?? "Incorrect email or password");
  }
};
  return (
    <KeyboardAvoidingView behavior={"padding"} className="flex-1 bg-primary">
      <Image
        source={require("@/assets/images/loginbanner.png")}
        resizeMode={"cover"}
        className="w-full h-2/5"
      />
      <View className="h-3/5 rounded-t-[40px] bg-ui_700">
        <Text className="font-bold text-5xl p-2 mt-10 mb-4 ml-6 text-start">
          Login
        </Text>
        {/* Email */}
        <View className="mx-8 flex-row p-2 items-center bg-ui_200 h-12 my-4 rounded-xl elevation-md">
          <Ionicons name="mail-sharp" size={21} color={"Grey"} />
          <TextInput
          value={email}
          onChangeText={text => {
            setError('');
            setEmail(text)
          }}
            placeholder={" Email"}
            cursorColor={"black"}
            className="bg-ui_200 text-black h-11 w-72 text-base"
          />
        </View>
        
        {/* Password */}
        <View className="mx-8 flex-row p-2 items-center bg-ui_200 h-12 my-4 rounded-xl elevation-md">
          <Ionicons name="lock-closed-sharp" size={19} color={"Grey"} />
          <TextInput
            value={password}
            onChangeText={text => {
              setError('');
              setPassword(text)
            }}
            placeholder={" Password"}
            className="bg-ui_200 text-black h-12 w-72 text-base"
            cursorColor={"black"}
            secureTextEntry={showPass? false : true}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons name={showPass? 'eye-sharp' : 'eye-off-sharp'} size={19} color={"Grey"} className="relative -right-7"/>
          </TouchableOpacity>
        </View>
        {
          error? <Text className="ml-9 text-base text-red-200">* {error}</Text> : null
        }
        {/* Login Button */}
        <TouchableOpacity 
        onPress={handleLogin}
        className="mx-8 justify-center p-2 items-center bg-zinc-950 h-16 mt-8 mb-2 rounded-xl">
          <Text className="text-white font-semibold text-xl">Login</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center relative top-24">
          <Text className="self-center text-base mt-5 text-ui_200">
            Don't have any account?
          </Text>
          <Link href={"/SignUp"} asChild>
            <TouchableOpacity>
              <Text className="self-center text-base mt-5 text-white">
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
