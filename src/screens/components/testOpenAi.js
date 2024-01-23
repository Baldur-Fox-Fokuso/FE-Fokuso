import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import axios from "axios";

import { RAPIDAPI_OPENAPI_KEY } from "@env";

export default function TestOpenAI() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleGenerate = async (prompt, messages) => {
    try {
      const options = {
        method: "POST",
        url: "https://chatgpt-ai-chat-bot.p.rapidapi.com/ask",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": RAPIDAPI_OPENAPI_KEY,
          "X-RapidAPI-Host": "chatgpt-ai-chat-bot.p.rapidapi.com",
        },
        data: {
          query: `buatkan saya todo list untuk ${inputText}, jadikan dalam bentuk array`,
        },
      };

      const response = await axios.request(options);
      const regex = /\[(.*?)\]/s;
      const matches = response.data.response.match(regex);
      const toDoListString = matches ? matches[1] : null;

      const toDoList = toDoListString
        ? JSON.parse(`[${toDoListString}]`)
        : null;

      console.log(toDoList, "aku array");

      setOutputText(toDoList);
    } catch (error) {
      console.error("OpenAI API error:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Test Open AI</Text>
        {/* Open Ai component */}
        <View>
          <TextInput
            placeholder="Enter your message..."
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            multiline
            style={{
              height: 100,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 10,
              padding: 10,
            }}
          />
          <Button title="Generate" onPress={handleGenerate} />
          <Text style={{ marginTop: 10 }}>Output:</Text>
          <Text>{outputText}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
