import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * color.length);
  return `#${color[randomColor]}`;
};
// const color = [
//   "FE7A36",
//   "5F8670",
//   "FF9800",
//   "40A2D8",
//   "FF6868",
//   "BE9FE1",
//   "FE7A36",
//   "D2DE32",
//   "5F0F40",
// ];

// !Black Color
// const color = [
//   "000000", // Black
//   "1A1A1A",
//   "333333",
//   "4D4D4D",
//   "666666",
//   "808080",
//   "999999",
//   "B3B3B3",
//   "CCCCCC",
// ];

const color = [
  "FAD02E", // Yellow
  "F28D35", // Orange
  "FF7070", // Light Red
  "8AC926", // Light Green
  "7FDBDA", // Turquoise
  "B0B8B5", // Grayish Blue
  "C4E17F", // Light Greenish Yellow
  "AB83A1", // Light Purple
  "FFD700", // Gold
];

export default function TaskCard({ task, navigation }) {
  console.log(task, "<<<<");
  return (
    <TouchableOpacity
      onPress={() => {
        navigation?.navigate("DetailTask", { task });
      }}
    >
      <View
        style={[
          styles.item,
          {
            backgroundColor: generateColor(),
          },
        ]}
      >
        <Text style={styles.itemText}>{task?.name}</Text>
        <View style={styles.infoContainer}>
          <InfoRow
            icon={<Fontisto name="date" size={18} color="white" />}
            text={task?.createdAt.split("T", 1)}
          />
          <InfoRow
            icon={<Ionicons name="list" size={18} color="white" />}
            text={`Sub-Tasks: ${task?.subTasks?.length}`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const InfoRow = ({ icon, text }) => (
  <View style={styles.infoRow}>
    {icon}
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    margin: 3.5,
    height: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").height / 5,
    borderWidth: 0.25,
    borderRadius: 15,
    paddingRight: 8,
  },
  itemText: {
    flex: 2,
    // backgroundColor: "pink",
    textAlign: "center",
    justifyContent: "center",
    paddingBottom: 15,
    fontSize: 14,
    fontWeight: "700",
    paddingVertical: 6,
    paddingLeft: 12,
    // color: "#ffffff",
    color: "black",
  },
  infoContainer: {
    flex: 3,
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 7,
    color: "#f5f5dc",
  },
});
