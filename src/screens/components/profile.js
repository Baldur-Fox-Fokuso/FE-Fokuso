// nama
// foto profile,,
// task card
// session card

import React from "react";
import { View, Text, StyleSheet, Image, FlatList, Button } from "react-native";

// implement gravatar pakai md5 untuk photo profilenya
import md5 from "md5";
import { deleteItemAsync } from "expo-secure-store";
import { AuthContext } from "../../context/AuthContext";

// const email = "affriyanr@mail.com";
// const email = "skyhawk57@gmail.com";
const email = "michaelgs1997@gmail.com";

const gravatarUrl = `https://www.gravatar.com/avatar/${md5(email)}?d=identicon`;

const data = [
  {
    id: "1",
    sessionTitle: "Session 1",
    sessionDetails: "Main Gitar",
  },
  {
    id: "2",
    sessionTitle: "Session 2",
    sessionDetails: "Kessoku Band The Best",
  },
  {
    id: "3",
    sessionTitle: "Session 2",
    sessionDetails: "Kessoku Band The Best",
  },
  {
    id: "4",
    sessionTitle: "Session 2",
    sessionDetails: "Kessoku Band The Best",
  },
  {
    id: "5",
    sessionTitle: "Session 2",
    sessionDetails: "Kessoku Band The Best",
  },
  {
    id: "6",
    sessionTitle: "Session 2",
    sessionDetails: "Kessoku Band The Best",
  },
  {
    id: "7",
    sessionTitle: "Session 2",
    sessionDetails: "Kessoku Band The Best",
  },
  {
    id: "8",
    sessionTitle: "Session 2",
    sessionDetails: "Kessoku Band The Best",
  },
  {
    id: "9",
    sessionTitle: "Session 2",
    sessionDetails: "Kessoku Band The Best",
  },
];

export default function Profile() {
  const renderItem = ({ item }) => (
    <View style={styles.sessionCard}>
      <Text style={styles.sessionTitle}>{item.sessionTitle}</Text>
      <Text style={styles.sessionDetails}>{item.sessionDetails}</Text>
    </View>
  );
  return (
    <>
      <View style={styles.container}>
        <Image source={{ uri: gravatarUrl }} style={styles.profileImage} />
        {/* <Image
          source={require("../../../assets/bocchi.jpg")}
          style={styles.profileImage}
        /> */}
        <Text style={styles.userName}>Bocchi</Text>
        <Text style={styles.userHandle}>@bocchi</Text>
        <Text style={styles.bio}>
          Bocchi is a shy and socially anxious girl who struggles with making
          friends. She is very timid and often finds it challenging to interact
          with others, leading to a tendency to isolate herself.
        </Text>
        <Text style={styles.sectionTitle}>Sessions :</Text>
        {/* <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.sessionsList}
        /> */}
        <Button
          title="LOG"
          onPress={() => {
            deleteItemAsync("access_token");
            AuthContext.setIsSignedIn(false);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // textAlign: "left",
    marginBottom: 8,
  },
  sessionCard: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sessionDetails: {
    color: "gray",
  },
  sessionsList: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    padding: 8,
  },
});
