import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text, Card } from "@rneui/themed";


const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

export default function RecentList({ task }) {
  return (
    <View style={[styles.item,]}>
      <Card.Title style={styles.itemText}>{task.name}</Card.Title>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
   
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 4,
    borderWidth : 1,
    height: Dimensions.get("window").width / 6, // approximate a square
    width: 350,
    borderRadius: 10,
  },
  itemText: {
    color: "#000000",
  },
});
