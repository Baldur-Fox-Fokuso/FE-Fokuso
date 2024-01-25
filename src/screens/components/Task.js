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
import { FontAwesome5 } from "@expo/vector-icons";
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
      console.log(error, "dari halaman task");
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                gap: 8,
              }}
            >
              <Image
                source={require("../../../assets/foto_aku_tidur.png")}
                style={styles.profileImage}
              />
              <View>
                <Text style={{ fontSize: 18 }}>Hello,</Text>
                <Text style={{ fontSize: 22, fontWeight: 600 }}>{user}!</Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#F1F2F9",
                padding: 10,
                borderRadius: 100,
                marginRight: 10,
              }}
            >
              <FontAwesome5 name="bell" size={24} color="black" />
            </View>
          </View>
        </View>
        <Text style={styles.title}>Recent</Text>

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
                
                }}
              >
                <FlatList
                  horizontal={true}
                  data={task}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        width: 14,
                      }}
                    />
                  )}
                  renderItem={({ item, index }) => (
                    <TaskCard
                      key={index}
                      recentTask={item}
                      navigation={navigation}
                    />
                  )}
                />
              </View>
            )}
          </View>
        </View>

        <Text style={styles.title}>My Task</Text>

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
                data={recentTask}
                horizontal={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 18,
                    }}
                  />
                )}
                renderItem={({ item, index }) => (
                  <RecentList
                    key={index}
                    task={item}
                    navigation={navigation}
                    index={index}
                  />
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
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: 20,
    gap: 5,
    paddingTop: 20,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 75,
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
    fontSize: 22,
    fontWeight: "bold",
    color: "lightslategrey",
    marginTop: 18,
  },
});
