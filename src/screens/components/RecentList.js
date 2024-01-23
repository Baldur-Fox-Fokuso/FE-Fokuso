import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RecentList({ task }) {
  return (
    <View style={[styles.item]}>
      <View>
        <Pressable onLongPress={() => console.log("aku ke hit " + task.name)}>
          <Text style={styles.itemText}>{task.name}</Text>
        </Pressable>
        <Text
          style={{
            color: "gray",
            marginHorizontal: 7,
          }}
        >
          8.30 AM | "subtask"
        </Text>
      </View>
      <Pressable onPress={() => console.log("hit")}>
        <View
          style={{
            paddingRight: 8,
          }}
        >
          <AntDesign name="playcircleo" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 4,
    borderWidth: 0.5,
    borderColor: "#6495ed",
    backgroundColor: "#f8f8ff",
    elevation: 10,
    height: Dimensions.get("window").width / 6, // approximate a square
    width: 350,
    borderRadius: 10,
  },
  itemText: {
    color: "#000000",
    fontWeight: "900",
    paddingHorizontal: 7,
  },
});
