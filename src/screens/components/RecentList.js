import React from "react";
import { StyleSheet, View, Dimensions, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RecentList({ task, navigation }) {
  return (
    <View
      style={{
        paddingBottom: 5,
      }}
    >
      <View style={[styles.item, { gap: 100 }]}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Pressable
            onLongPress={() => {
              navigation.navigate("DetailTask", { task });
            }}
          >
            <Text style={styles.itemText}>{task.name}</Text>
          </Pressable>
          <Text
            style={{
              color: "black",
              marginHorizontal: 7,
            }}
          >
            {task.createdAt.slice(11, 16)} | Sessions : {task?.sessions.length}
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
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "azure",
    height: Dimensions.get("window").width / 4.5, // approximate a square
    width: "auto",
    borderRadius: 10,
  },
  itemText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 7,
    textAlign: "justify",
  },
});
