import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Text, Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import {
  MontserratAlternates_500Medium,
  Montserrat_800ExtraBold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/dev";
import { useFonts } from "expo-font";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * color.length);
  return `#${color[randomColor]}`;
};

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
  const [fonstLoaded] = useFonts({
    MontserratAlternates_500Medium,
    Montserrat_800ExtraBold,
    Montserrat_600SemiBold,
  });

  if (!fonstLoaded) {
    return null;
  }
  return (
    <View
      style={{
        margin: 3,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetailTask", { task });
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
          <Text style={styles.itemText}>{task.name}</Text>
          <View style={styles.infoContainer}>
            <InfoRow
              icon={<Fontisto name="date" size={18} color="azure" />}
              text={task.createdAt.split("T", 1)}
            />
            <InfoRow
              icon={<Ionicons name="list" size={18} color="azure" />}
              text={`Sub-Tasks: ${task.subTasks.length}`}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
    height: Dimensions.get("window").width / 2.5,
    width: Dimensions.get("window").height / 5.5,
    paddingTop: 10,
    borderRadius: 10,
    paddingRight: 8,
  },
  itemText: {
    paddingBottom: 15,
    fontSize: 13.5,
    // paddingHorizontal: 6,
    paddingVertical: 6,
    fontFamily: "Montserrat_600SemiBold",
    justifyContent: "center",
    paddingBottom: 15,
    color: "azure",
    paddingLeft: 12,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    flex: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  infoText: {
    fontFamily: "MontserratAlternates_500Medium",
    flex: 1,
    fontSize: 11,
    paddingLeft: 7,
    color: "azure",
  },
});
