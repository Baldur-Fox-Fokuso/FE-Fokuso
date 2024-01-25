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

export default function TaskCard({ recentTask, navigation }) {
  const [fonstLoaded] = useFonts({
    MontserratAlternates_500Medium,
    Montserrat_800ExtraBold,
    Montserrat_600SemiBold,
  });

  if (!fonstLoaded) {
    return null;
  }
  return (
    <>
      <View
        style={{
          height : 150,
          backgroundColor: "white",
          marginLeft: 3,
          marginTop: 3,
          borderRadius: 20,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.17,
          shadowRadius: 2.54,
          elevation: 3,
        }}
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>{recentTask?.name}</Text>
          <View style={styles.infoContainer}>
            <InfoRow
              icon={<Fontisto name="date" size={18} color="black" />}
              text={recentTask?.createdAt.split("T", 1)}
            />
            <InfoRow
              icon={<Ionicons name="list" size={18} color="black" />}
              text={`Sub-Tasks: ${recentTask?.subTasks.length}`}
            />
          </View>
        </View>
      </View>
    </>
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
    // backgroundColor : 'pink',
    borderRadius: 30,
    paddingRight: 8,
  },
  itemText: {
    paddingBottom: 15,
    fontSize: 16,
    paddingVertical: 6,
    fontFamily: "Montserrat_600SemiBold",
    justifyContent: "center",
    paddingBottom: 15,
    color: "black",
    paddingLeft: 12,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
    justifyContent: "flex-end",
    paddingBottom: 20,
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
    color: "black",
  },
});
