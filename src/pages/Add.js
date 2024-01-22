import { View, Text, SafeAreaView, TextInput } from "react-native";
import { Input } from "@gluestack-ui/themed";
import { useState } from "react";

export default function Add() {
  const [formTask, setFormTask] = useState({
    title: "",
    description: "",
    session: [],
    subTask: [],
  });

  const onChangeText = (text, input) => {
    setLoginForm((loginForm) => ({ ...loginForm, [input]: text }));
  };

  return (
    <SafeAreaView>
      <Text>Title</Text>
      <TextInput
        name="title"
        placeholder="Write a title"
        onChangeText={(text) => onChangeText(text, "title")}
      />

      <Text>Description</Text>
      <TextInput
        name="description"
        placeholder="Write a description"
        onChangeText={(text) => onChangeText(text, "description")}
      />
      <Text>Sub-Task</Text>
      <Text>Create Task</Text>
    </SafeAreaView>
  );
}
