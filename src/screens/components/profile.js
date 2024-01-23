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

import { Ionicons } from "@expo/vector-icons";

// implement gravatar pakai md5 untuk photo profilenya
import md5 from "md5";
import { deleteItemAsync } from "expo-secure-store";
import { AuthContext } from "../../context/AuthContext";

// const email = "affriyanr@mail.com";
// const email = "skyhawk57@gmail.com";
const email = "michaelgs1997@gmail.com";

const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`;

export default function Profile({ navigation }) {
  const authContext = useContext(AuthContext);
  const handleGoBack = () => {
    navigation.goBack();
  };

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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
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
    backgroundColor: "black",
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
