import React from 'react'
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

const taskList = [
  {
    name: "Desain Web",
  },
  {
    name: "Ngoding",
  },
  {
    name: "Membuat halaman profil",
  },
];

export default function Task({ navigation }) {
  const height = Dimensions.get("screen").height;
  const [task, setTask] = useState(taskList);
  const [newTask, setNewTask] = useState("");
  console.log(newTask);
  const addTask = () => {
    setTask((task) => [...task, { name: newTask }]);
  };
  console.log(task, ">>>>>>>> task");

  // Tambah flatlist di card
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView style={{ height: height }}> */}
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{ fontSize: screenSize.height / 55, fontWeight: "bold" }}
          >
            Halo, User!
          </Text>
        </View>
        <View style={styles.add}>
          <TextInput
            name="name"
            value={newTask}
            placeholder="useless placeholder"
            onChangeText={setNewTask}
          />
          <TouchableOpacity style={styles.button} onPress={addTask}>
            <Text>ADD TASK</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.task}>
          <View style={{ width: "80%" }}>
            <FlatList
              data={task}
              renderItem={({ item, index }) => (
                <TaskCard key={index} task={item} />
              )}
            />
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
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
    backgroundColor: "green",
  },
  header: {
    justifyContent: "center",
    padding: 20,
    alignItems: "flex-start",
    backgroundColor: "pink",
    height: screenSize.height / 15,
  },
  task: {
    flex: 4,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  taskHeader: {
    flex: 1,
    justifyContent: "center",
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
    width: "80%",
    gap: 30,
  },
});
