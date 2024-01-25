import React from "react";
import { StyleSheet, View, Dimensions, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const color = [
  "#CFF2FF",
  "#FFE2C3",
  "#FFCAD0",
  "#CFF2FF",
  "#FFE2C3",
  "#FFCAD0",
  "#CFF2FF",
  "#FFE2C3",
  "#FFCAD0",
];

export default function RecentList({ task, navigation, index }) {
console.log(task, "MMMM")
  return (
    <View style={[styles.item, { gap: 100, backgroundColor: color[index] }]}>
      <View
        style={{
          justifyContent: "space-between",
        }}
      >
        <View
        
        style={{
          // backgroundColor : 'green'
        }}>
          <Pressable
            onLongPress={() => {
              navigation.navigate("DetailTask", { task });
            }}
          >
            <Text style={styles.itemText}>{task.name}</Text>
          </Pressable>
          <Text
            style={{
              color: "grey",
              // marginHorizontal: 7,
              fontSize: 16,
            }}
          >
            {task.createdAt.slice(11, 16)} | Sessions : {task?.sessions.length}
          </Text>
        </View>

        <View
          style={{
            // backgroundColor: "#F1F2F9",
            backgroundColor: "rgba(52, 52, 52, 0.2)",
            width: 105,
            padding: 10,
            borderRadius: 100,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Fontisto name="date" size={16} color="azure" />
          <Text
            style={{
              color: "azure",
              fontSize: 12,
            }}
          >
            {task.createdAt.slice(0, 10)}
          </Text>
        </View>
      </View>
      {/* <Pressable
        onPress={() => {
          navigation.navigate("Session", { task });
        }}
      >
        <View
          style={{
            // paddingRight: 8,
          }}
        >
          <AntDesign name="playcircleo" size={50} color="black" />
        </View>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    height: Dimensions.get("window").width / 2.5, // approximate a square
    width: "auto",
    borderRadius: 20,
  },
  itemText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 20,

    marginBottom: 8,
    textAlign: "justify",
  },
});
