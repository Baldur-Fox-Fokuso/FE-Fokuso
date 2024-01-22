import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import ColorfulCard from "react-native-colorful-card";
// import { useFonts, Rancho_400Regular } from "@expo-google-fonts/rancho";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * color.length);

  // .toString(16)
  // .padStart(6, '0');

  console.log(randomColor, "<<");
  return `#${color[randomColor]}`;
};
const color = [
  "FE7A36",
  "5F8670",
  "FF9800",
  "40A2D8",
  "FF6868",
  "BE9FE1",
  "FE7A36",
  "D2DE32",
  "5F0F40",
];
export default function TaskCard({ navigation, task }) {
  // let [fontsLoaded] = useFonts({
  //   Rancho_400Regular,
  // });
  // if (!fontsLoaded) {
  //   return <Text>Loading...</Text>;
  // }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DetailTask", { task });
        console.log("masuk taskcard");
      }}
      style={[styles.item, { backgroundColor: generateColor() }]}
    >
      <Card.Title style={styles.itemText}>{task.name}</Card.Title>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    justifyContent: "center",
    flex: 1,
    margin: 4,
    height: Dimensions.get("window").width / 2.1, // approximate a square
    width: 160,
    borderRadius: 30,
  },
  itemText: {
    // fontFamily: "Rancho_400Regular",
    fontSize: 20,
    paddingVertical: 6,
  },
});
