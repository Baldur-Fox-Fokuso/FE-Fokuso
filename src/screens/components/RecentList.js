import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RecentList({ task, navigation }) {
  // console.log(task?.subTasks[0]?.name, "<<<<<")
  return (
    <View style={[styles.item]}>
      <View>
        <Pressable
          onLongPress={() => {
            navigation.navigate("DetailTask", { task });
          }}
        >
          <Text style={styles.itemText}>{task.name}</Text>
        </Pressable>
        <Text
          style={{
            color: "gray",
            marginHorizontal: 7,
          }}
        >
          {task.createdAt.slice(11,16)} | Sessions :  {task?.sessions.length}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("Session", { task });
        }}
      >
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
    paddingHorizontal : 15,
    margin: 4,
    borderWidth: 0.25,
    borderColor: "#6495ed",
    backgroundColor: "#f8f8ff",
    height: Dimensions.get("window").width / 4.5, // approximate a square
    width: 350,
    borderRadius: 10,
  },
  itemText: {
    color: "#000000",
    fontWeight: "900",
    paddingHorizontal: 7,
  },
});
