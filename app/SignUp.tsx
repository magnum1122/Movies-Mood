import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { AppwriteContext } from "@/services/appwrite/AppwriteContext";

const SignUp = () => {
  const route = useRouter();
  const { appwrite } = useContext(AppwriteContext);
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setReapeatPasword] = useState<string>("");
  const [showPass, setShowPass] = useState(false);

  const handleSignUp = () => {
    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatPassword.length < 1
    ) {
      setError("All field are required");
    } else if (password !== repeatPassword) {
      setError("Password do not match");
    } else {
      const user = {
        email,
        password,
        name,
      };
      appwrite
      .createAccount(user)
      .then((response) => {
        if(response) {
            route.replace("/Login");
        }
      })
      .catch(e => {
        console.log(e);
        setError(e.message)
        
      })
    }
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} className="flex-1 bg-primary">
      <Image
        source={require("@/assets/images/loginbanner.png")}
        resizeMode={"cover"}
        className="w-full h-1/3"
      />
      <View className="h-3/4 rounded-t-[40px] bg-ui_700">
        <Text className="font-bold text-5xl p-2 mt-10 mb-4 ml-6 text-start">
          Sign Up
        </Text>
        {/* Name */}
        <View className="mx-8 flex-row p-2 items-center bg-ui_200 h-12 my-4 rounded-xl elevation-md">
          <Ionicons name="person-circle-sharp" size={21} color={"Grey"} />
          <TextInput
            value={name}
            onChangeText={text => {
                setError('');
                setName(text)
            }}
            placeholder={" Name"}
            cursorColor={"black"}
            className="bg-ui_200 text-black h-11 w-72 text-base"
          />
        </View>
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
            className="bg-ui_200 text-black h-11 w-72 text-base"
            cursorColor={"black"}
            secureTextEntry={showPass ? false : true}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? "eye-sharp" : "eye-off-sharp"}
              size={19}
              color={"Grey"}
              className="relative -right-7"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Pass */}
        <View className="mx-8 flex-row p-2 items-center bg-ui_200 h-12 my-4 rounded-xl elevation-md">
          <Ionicons name="lock-closed-sharp" size={19} color={"Grey"} />
          <TextInput
          value={repeatPassword}
            onChangeText={text => {
                setError('');
                setReapeatPasword(text)
            }}
            placeholder={"Confirm Password"}
            className="bg-ui_200 text-black h-11 w-72 text-base"
            cursorColor={"black"}
            secureTextEntry={showPass ? false : true}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? "eye-sharp" : "eye-off-sharp"}
              size={19}
              color={"Grey"}
              className="relative -right-7"
            />
          </TouchableOpacity>
        </View>
        {
          error? <Text className="ml-9 text-base text-red-200">* {error}</Text> : null
        }
        {/* SignUp Button */}
        <TouchableOpacity 
        onPress={handleSignUp}
        className="mx-8 justify-center p-2 items-center bg-zinc-950 h-16 mt-8 mb-2 rounded-xl">
          <Text className="text-white font-semibold text-xl">Sign Up</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center">
          <Text className="self-center text-base mt-5 text-ui_200">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={route.back}>
            <Text className="self-center text-base mt-5 text-white">
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
