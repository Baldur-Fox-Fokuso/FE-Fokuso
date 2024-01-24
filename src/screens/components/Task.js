import React, { useContext } from "react";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import TaskCard from "./TaskCard";
import RecentList from "./RecentList";
import { Divider } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import axios from "../../config/instance";
import { getValueFor } from "../SecureStore";
import { AuthContext } from "../../context/AuthContext";

export default function Task({ navigation, route }) {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [fetchCounter, setFetchCounter] = useState(0);
  const authContext = useContext(AuthContext);

  const fetchTask = async () => {
    const userId = await getValueFor("userId");
    const token = await getValueFor("access_token");
    console.log(userId, "<<<<< userId di task");
    try {
      const { data } = await axios({
        url: `/user/${userId}/task`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchTask();
    }, 1000);
  }, [fetchCounter]);

  return (
    <>
      <StatusBar />
      {/* Recent */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Halo, User!</Text>
        </View>
        <Text style={styles.title}>Recent</Text>
        <View
          style={{
            width: "40%",
          }}
        >
          <Divider width={3} color="#000000" />
        </View>

        <View
          style={[
            styles.task,
            { flexDirection: "row", flex: 1, marginTop: 10 },
          ]}
        >
          <View style={{ width: "100%", height: "auto" }}>
            {!task.length ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="close-outline" size={40} color="black" />
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 25,
                  }}
                >
                  No Task
                </Text>
                <Ionicons name="close-outline" size={40} color="black" />
              </View>
            ) : (
              <View
                style={{
                  height: 160,
                }}
              >
                <FlatList
                  horizontal={true}
                  data={task}
                  renderItem={({ item, index }) => (
                    <TaskCard key={index} task={item} navigation={navigation} />
                  )}
                />
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            margin: 15,
          }}
        ></View>

        <Text style={styles.title}>Today</Text>
        <View
          style={{
            width: "40%",
          }}
        >
          <Divider width={3} color="#000000" />
        </View>

        <View style={[styles.task, { flex: 3, marginTop: 10 }]}>
          <View style={{ width: "auto" }}>
            {!task.length ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="close-outline" size={40} color="black" />
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 25,
                  }}
                >
                  No Task
                </Text>
                <Ionicons name="close-outline" size={40} color="black" />
              </View>
            ) : (
              <FlatList
                data={task}
                horizontal={false}
                renderItem={({ item, index }) => (
                  <RecentList key={index} task={item} navigation={navigation} />
                )}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
}
const screenSize = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

const styles = StyleSheet.create({
  container: {
    flex: 0.88,
    paddingHorizontal: 10,
    gap: 5,
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: screenSize.height / 12.5,
  },
  task: {
    alignContent: "center",
    paddingBottom: "auto",
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

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF8E3",
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
});
