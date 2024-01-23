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
  Button,
} from "react-native";
import TaskCard from "./TaskCard";
import RecentList from "./RecentList";
import { Divider } from "@rneui/base";

import { deleteItemAsync } from "expo-secure-store";
import Swipeable from "react-native-swipeable-row";

import { LogBox } from "react-native";

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

// swiping

export default function Task({ navigation }) {
  const height = Dimensions.get("screen").height;
  const [task, setTask] = useState(taskList);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    setTask((task) => [...task, { name: newTask }]);
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-evenly" }}>
      <StatusBar />
      {/* Recent */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Halo, User!</Text>
          <Button title="LOG" onPress={() => deleteItemAsync("access_token")} />
        </View>
        <Text style={styles.quicksand}>Recent Task</Text>
        <View
          style={{
            width: "40%",
            paddingBottom: 20,
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
        {/* Today */}
        <Text style={styles.quicksand}>Today Task</Text>
        <View
          style={{
            width: "40%",
            paddingBottom: 4,
          }}
        >
          <Divider width={3} color="#000000" />
        </View>

        <View style={[styles.task, { paddingLeft: 25, flex: 3 }]}>
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

  card: {
    width: 10,
    gap: 30,
  },

  quicksand: {
    fontSize: 20,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 5,
  },
  card: {
    padding: 26,
    marginVertical: 8,
    height: 70,
    borderRadius: 30,
    backgroundColor: "#f0ffff",
  },
});
