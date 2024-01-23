import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "@rneui/themed";

import { Fontisto } from "@expo/vector-icons";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * color.length);
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
export default function TaskCard({ task }) {
  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: generateColor() }]}
    >
      <Text style={styles.itemText}>{task.name}</Text>
      <View style={{
        flex : 1,
        flexDirection : 'row',
        paddingLeft : 10
      }}>
        <Fontisto
          name="date"
          size={19}
          color="white"
          style={{
           
          }}
        />
        <Text style={{
          color : 'white'
        }}> 13 Aug 2024</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "flex-start",
    margin: 3.5,
    height: Dimensions.get("window").width / 2.7, // approximate a square
    width: 150,
    borderRadius: 15,
  },
  itemText: {
    textAlign: "justify",
    fontSize: 18,
    fontWeight: "700",
    paddingVertical: 6,
    paddingLeft: 12,
    color: "#ffffff",
  },
});
