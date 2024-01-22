import React from "react";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import TaskCard from "./TaskCard";
import RecentList from "./RecentList";
import { Divider } from "@rneui/base";
import { Raleway_200ExtraLight } from "@expo-google-fonts/raleway";
import { Quicksand_300Light } from "@expo-google-fonts/quicksand";
import { useFonts } from "expo-font";
import { GrapeNuts_400Regular } from "@expo-google-fonts/grape-nuts";

const taskList = [
  {
    name: "Desain Web",
  },
  {
    name: "Ngoding",
  },
  {
    name: "Membuat halaman profildqwdwqdqweqwr",
  },
  {
    name: "Desain Web",
  },
  {
    name: "Desain Web",
  },
  {
    name: "Desain Web",
  },
  {
    name: "Desain Web",
  },
  {
    name: "Desain Web",
  },

  {
    name: "Desain Web",
  },
];

export default function Task({ navigation }) {
  const height = Dimensions.get("screen").height;
  const [task, setTask] = useState(taskList);
  const [newTask, setNewTask] = useState("");
  const [fontsLoaded] = useFonts({
    Raleway_200ExtraLight,
    Quicksand_300Light,
    GrapeNuts_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading....</Text>;
  }

  const addTask = () => {
    setTask((task) => [...task, { name: newTask }]);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-evenly" }}>
      <StatusBar />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Halo, User!</Text>
        </View>
        <Text style={styles.quicksand}>Recent Task</Text>
        <View
          style={{
            width: "40%",
            paddingBottom: 4,
          }}
        >
          <Divider width={3} color="#000000" />
        </View>
        <View style={[styles.task, { flexDirection: "row", flex: 1 }]}>
          <View style={{ width: "100%" }}>
            <FlatList
              horizontal={true}
              data={task}
              renderItem={({ item, index }) => (
                <TaskCard key={index} task={item} />
              )}
            />
          </View>
        </View>
        <Text style={styles.raleway}>Today Task</Text>
        <View
          style={{
            width: "40%",
            paddingBottom: 4,
          }}
        >
          <Divider width={3} color="#000000" />
        </View>

        <View style={[styles.task, { paddingLeft: 15, flex: 2 }]}>
          <View style={{ width: "100%" }}>
            <FlatList
              data={task}
              horizontal={false}
              renderItem={({ item, index }) => (
                <RecentList key={index} task={item} />
              )}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const screenSize = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: "center",
    padding: 10,
    alignItems: "flex-start",

    height: screenSize.height / 12.5,
  },
  task: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  taskHeader: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  add: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
  card: {
    width: 10,
    gap: 30,
  },
  raleway: {
    fontSize: 20,
    fontFamily: "Quicksand_300Light",
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
  quicksand: {
    fontSize: 20,
    fontFamily: "Quicksand_300Light",
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
});
