import React from "react";
import { StyleSheet, View } from "react-native";
import Task from "./components/Task";

const Dashboard = ({navigation}) => {
  return (
    <>
      <Task />
    </>
  );
};

const styles = StyleSheet.create({
  layout: {},
});

export default Dashboard;
