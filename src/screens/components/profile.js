import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { deleteItemAsync } from "expo-secure-store";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../config/instance";
import { getValueFor } from "../SecureStore";

export default function Profile() {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [task, setTask] = useState([]);
  const [numSession, setSession] = useState(0);

  const fetchEmailUser = async () => {
    try {
      const userId = await getValueFor("userId");
      const { data } = await axios({
        url: `/user/${userId}`,
        method: "GET",
      });
      console.log(data, "<<<<<< ini data user");
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      console.log(task, "<<<< ini task");
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  for (let i = 0; i < task.length; i++) {
    let session = task[i].session;
    for (let j = 0; j < session?.length; j++) {
      if (session) {
        setSession(numSession + 1);
      }
    }
  }

  useEffect(() => {
    fetchEmailUser();
    fetchTask();
  }, []);
  const gravatarUrl = `https://www.gravatar.com/avatar/${user.email}?d=identicon`;

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

  return (
    <>
      <View style={styles.container}>
        <Image source={{ uri: gravatarUrl }} style={styles.profileImage} />

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userHandle}>{user.email}</Text>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Text>
        <View style={styles.taskCardContainer}>
          <View
            style={[
              styles.cardContainer,
              {
                backgroundColor: generateColor(),
              },
            ]}
          >
            {/* <View style={styles.iconContainer}>
              <FontAwesome5 name="tasks" size={} color="black" />
            </View> */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.rowLabel}>Total Task : </Text>
              <Text style={styles.rowValue}>{task.length}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* <View style={styles.emptySpace}></View> */}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          try {
            await deleteItemAsync("access_token");
            authContext.setIsSignedIn(false);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  container: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-evenly",
    paddingHorizontal: 16,
    paddingVertical: 25,
    // backgroundColor: "red",

    // !start Card
  },
  taskCardContainer: {
    // flex: 2,
    flexDirection: "row",
    // backgroundColor: "pink",
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "flex-start",
    // gap: 30,
  },
  emptySpace: {
    flex: 2,
  },
  cardContainer: {
    flex: 1,
    height: Dimensions.get("window").width / 3.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 16,
    borderRadius: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: "black",
  },
  iconContainer: {
    // alignItems: "center",
    // justifyContent: "center",
  },
  rowValue: {
    textAlign: "right",
    fontSize: 30,
    fontWeight: "bold",
    color: "#000000",
  },
  // !end Card

  profileImage: {
    width: 150,
    height: 150,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 75,
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userHandle: {
    color: "gray",
    marginBottom: 16,
  },
  bio: {
    textAlign: "center",
  },

  logoutButton: {
    backgroundColor: "#9E9FA5",
    padding: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});
