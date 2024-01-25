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
  const [recentTask, setRecentTask] = useState([]);
  const [fetchCounter, setFetchCounter] = useState(0);
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState("");

  const fetchTask = async () => {
    const userId = await getValueFor("userId");
    const token = await getValueFor("access_token");
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

  const fetchRecent = async () => {
    const userId = await getValueFor("userId");
    const token = await getValueFor("access_token");
    try {
      const { data } = await axios({
        url: `/user/${userId}/task/recent`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecentTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getName = async () => {
    try {
      const val = await getValueFor("name");
      setUser(val);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
  useEffect(() => {
    setTimeout(() => {
      fetchTask();
      getName();
      fetchRecent();
    }, 300);
  }, [fetchCounter]);

  return (
    <>
      <StatusBar />
      {/* Recent */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Halo, {user}!
          </Text>
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
                  height: 180,
                  // backgroundColor : 'pink'
                }}
              >
                <FlatList
                  horizontal={true}
                  data={recentTask}
                  renderItem={({ item, index }) => (
                    <TaskCard key={index} recentTask={item} navigation={navigation} />
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

        <Text style={styles.title}>My Task</Text>
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
    color: "black",
    // textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    // textShadowRadius: 10,
  },
});
