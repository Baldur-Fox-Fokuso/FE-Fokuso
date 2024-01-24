import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// implement gravatar pakai md5 untuk photo profilenya
import md5 from "md5";
import { deleteItemAsync } from "expo-secure-store";
import { AuthContext } from "../../context/AuthContext";

// const email = "affriyanr@mail.com";
// const email = "skyhawk57@gmail.com";
const email = "michaelgs1997@gmail.com";

const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`;

export default function Profile() {
  const authContext = useContext(AuthContext);

  // card profile color
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
      {/* <Image
        source={{
          uri: "https://tse2.mm.bing.net/th?id=OIP.H9PqvkRXtotHthFMf13DIAHaLG&pid=Api&P=0&w=300&h=300",
        }}
        style={styles.backgroundImage}
      /> */}

      <View style={styles.container}>
        <Image source={{ uri: gravatarUrl }} style={styles.profileImage} />

        <Text style={styles.userName}>Bocchi</Text>
        <Text style={styles.userHandle}>@bocchi</Text>
        <Text style={styles.bio}>
          Bocchi is a shy and socially anxious girl who struggles with making
          friends. She is very timid and often finds it challenging to interact
          with others, leading to a tendency to isolate herself.
        </Text>
      </View>
      <View style={styles.taskCardContainer}>
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: generateColor(),
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name="tasks" size={24} color="black" />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.rowLabel}>Task Available:</Text>
            <Text style={styles.rowValue}>20</Text>
          </View>
        </View>
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: generateColor(),
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome name="tasks" size={24} color="black" />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.rowLabel}>Session Available:</Text>
            <Text style={styles.rowValue}>5</Text>
          </View>
        </View>
      </View>

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
    padding: 16,
    // backgroundColor: "red",

    // !start Card
  },
  taskCardContainer: {
    flex: 2,
    flexDirection: "row",
    // backgroundColor: "pink",
    // alignItems: "center",
    // justifyContent: "center",
    // gap: 30,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 50,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  iconContainer: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  rowValue: {
    fontSize: 14,
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
    // borderTopStartRadius: 15,
    // borderTopEndRadius: 15,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
});
