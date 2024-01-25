import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "../config/instance";
const image = "https://wallpaper.dog/large/20515986.jpg";

const SignUpScreen = ({ navigation }) => {
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const { data } = await axios({
        url: "/register",
        method: "POST",
        data: {
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        },
      });

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeText = (text, input) => {
    setRegisterForm((registerForm) => ({ ...registerForm, [input]: text }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: Dimensions.get("window").height / 5,
            height: Dimensions.get("window").height / 5,
            objectFit: "contain",
          }}
          source={{
            uri: "https://cdn.discordapp.com/attachments/1196366041308205076/1199609311651954819/fokuso-high-resolution-logo-transparent_2_1.png?ex=65c32a3b&is=65b0b53b&hm=8b796d5e5897545dfdd3f974150811b0354276d823633b7c4ecfab1ef48f0171&",
          }}
        />
      </View>
      {/* <Text style={styles.title}>Sign Up</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Your name"
        autoCapitalize="none"
        name="name"
        onChangeText={(text) => onChangeText(text, "name")}
      />
      <TextInput
        style={styles.input}
        placeholder="Example@mail.com"
        autoCapitalize="none"
        name="email"
        onChangeText={(text) => onChangeText(text, "email")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        name="password"
        onChangeText={(text) => onChangeText(text, "password")}
      />
      <TouchableOpacity style={styles.forgotPassword}></TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.signUpContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signUpText}>Sign in.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    alignItems: "center",
    // backgroundColor: "black",
    paddingVertical: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#0180FF",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  loginButton: {
    height: 50,
    backgroundColor: "#0180FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  orText: {
    width: 40,
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  signUpText: {
    color: "#0180FF",
  },
  footer: {
    color: "gray",
    textAlign: "center",
  },
});

export default SignUpScreen;
