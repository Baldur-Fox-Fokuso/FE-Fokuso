import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const CreateTask = ({ navigation }) => {
  return (
    <>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      ></Pressable>
    </>
  );
};

export default CreateTask;
