import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const image = "https://wallpaper.dog/large/20515986.jpg";
const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name..."
        autoCapitalize="none"

      />
      <TextInput
        style={styles.input}
        placeholder="Example@mail.com"
        autoCapitalize="none"
        placeholderTextColor=""
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.forgotPassword}></TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.loginButton}
      >
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

export default SignUpScreen;
