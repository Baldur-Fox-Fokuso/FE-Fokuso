import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { save, getValueFor } from "./SecureStore";
import { AuthContext } from "../context/AuthContext";
import axios from "../config/instance";

const image = "https://wallpaper.dog/large/20515986.jpg";

const Login = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  console.log(loginForm);
  const authContext = useContext(AuthContext);
  const onChangeText = (text, input) => {
    setLoginForm((loginForm) => ({ ...loginForm, [input]: text }));
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios({
        url: "/login",
        method: "POST",
        data: {
          email: loginForm.email,
          password: loginForm.password,
        },
      });
      console.log(data);
      save("access_token", data.access_token);
      authContext.setIsSignedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Fokuso</Text>
      <TextInput
        name="email"
        onChangeText={(text) => onChangeText(text, "email")}
        style={styles.input}
        placeholder="Example@mail.com"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        name="password"
        onChangeText={(text) => onChangeText(text, "password")}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.forgotPassword}></TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpText}>Sign up.</Text>
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
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#0099FF",
  },
  loginButton: {
    height: 50,
    backgroundColor: "#000000",
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
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  facebookText: {
    color: "#1877F2",
    fontSize: 16,
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
    color: "#0099FF",
  },
  footer: {
    color: "gray",
    textAlign: "center",
  },
});

export default Login;
