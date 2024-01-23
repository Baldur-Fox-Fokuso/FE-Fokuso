import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import OpenAI from "openai";
import axios from "axios";

import { OPENAI_API_KEY } from "@env";
import { RAPIDAPI_OPENAPI_KEY } from "@env";

// const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// const chatgptUrl = "https://api.openai.com/v1/chat/completions";

// const client = axios.create({
//   headers: {
//     Authorization: `Bearer ${OPENAI_API_KEY}`,
//     "Content-Type": "application/json",
//   },
// });

export default function TestOpenAI() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleGenerate = async (prompt, messages) => {
    try {
      // !--1
      //   const response = await openai.chat.completions.create({
      //     model: "gpt-3.5-turbo",
      //     messages: [
      //       { role: "system", content: "You are a helpful assistant." },
      //       { role: "user", content: inputText },
      //     ],
      //   });
      //   setOutputText(response.data.choices[0].message.content);
      // ! --2
      //   const response = await openai.chat.completions.create({
      //     model: "gpt-3.5-turbo",
      //     messages: [
      //       { role: "system", content: "You are a helpful assistant." },
      //       { role: "user", content: inputText },
      //     ],
      //   });
      //   setOutputText(response.data.choices[0].message.content);
      //! --3
      //   const result = await axios.post(
      //     "https://api.openai.com/v1/engines/davinci-codex/completions",
      //     {
      //       prompt: inputText,
      //       max_tokens: 50,
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${OPENAI_API_KEY}`,
      //       },
      //     }
      //   );
      //   setOutputText(result.data.choices[0].text);
      // !----4
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
      //   console.log(response.data.response, "aku string");

      const regex = /\[(.*?)\]/s;
      const matches = response.data.response.match(regex);

      // Check if there are matches and extract the content
      const toDoListString = matches ? matches[1] : null;

      // Parse the extracted string as JSON to get the array
      const toDoList = toDoListString
        ? JSON.parse(`[${toDoListString}]`)
        : null;

      console.log(toDoList, "aku array");

      setOutputText(toDoList);
    } catch (error) {
      console.error("OpenAI API error:", error);
      //   if (error.response && error.response.status === 429) {
      //     // Handle rate limiting by retrying with exponential backoff
      //     const retryAfter = error.response.headers["retry-after"] || 10; // Default to 10 seconds
      //     console.log(`Rate limited. Retrying after ${retryAfter} seconds...`);
      //     await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      //     return makeRequest(); // Retry the request
      //   }

      //   throw error; // Re-throw other errors
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
