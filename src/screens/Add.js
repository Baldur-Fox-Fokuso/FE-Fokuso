import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import axios from "../config/instance";
import { screenSize } from "../utils";
import { AntDesign } from "@expo/vector-icons";
import { getValueFor } from "./SecureStore";

export default function Add({ navigation }) {
  // console.loggetValueFor("access_token"));
  const handleAddTask = async () => {
    try {
      const { data } = await axios({
        url: "/task",
        method: "POST",
        data: {
          name,
          description,
          deadline,
          subTasks: arrSub,
        },
        headers: {
          Authorization: `Bearer ${await getValueFor("access_token")}`,
        },
      });
      setName("");
      setDescription("");
      setDeadline("");
      navigation.navigate("Home", { refetch: true });
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [formTask, setFormTask] = useState({
    name: "",
    description: "",
    subTasks: [],
    deadline: "",
  });

  // console.log(formTask.subTasks);

  const [arrSub, setArrSub] = useState([]);
  const [subT, setSubTask] = useState("");
  const [arrSubAI, setArrSubAI] = useState([]);

  const addSubTask = () => {
    setArrSub([...arrSub, subT]);
    setSubTask("");
  };

  // console.log(formTask);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "pink",
      }}
    >
      {/* add task form */}
      <View
        style={
          {
            // backgroundColor: "green",
          }
        }
      >
        <Text>Title</Text>
        <TextInput
          name="name"
          placeholder="Write a title"
          onChangeText={(text) => setName(text)}
          style={{
            height: screenSize.height / 15,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius: 20,
          }}
          value={name}
        />
        <Text>Description</Text>
        <TextInput
          name="description"
          placeholder="Write a description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={10}
          style={{
            height: screenSize.height / 8,
            borderWidth: 1,
            padding: 10,
            margin: 12,
            borderRadius: 20,
          }}
          value={description}
        />
        <Text>Sub-Task</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 12,
          }}
        >
          <View>
            <TextInput
              name="subTasks"
              placeholder="Add Sub-Task"
              style={{
                height: screenSize.height / 15,
                width: screenSize.width / 1.2,
                borderWidth: 1,
                padding: 10,
                borderRadius: 20,
              }}
              value={subT}
              onChangeText={setSubTask}
            />
          </View>
          <TouchableOpacity onPress={addSubTask}>
            <View>
              <AntDesign name="pluscircleo" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        {arrSub.map((subT, index) => (
          <View
            key={index}
            style={{
              height: screenSize.height / 18,
              borderWidth: 1,
              padding: 10,
              margin: 12,
              borderRadius: 20,
            }}
          >
            <Text>{subT}</Text>
          </View>
        ))}
      </View>
      {/* create button */}
      <View
        style={{
          marginBottom: 100,
          alignItems: "center",
        }}
      >
        <View
          style={
            {
              // backgroundColor: "blue",
            }
          }
        >
          <TouchableOpacity onPress={handleAddTask}>
            <View
              style={{
                backgroundColor: "red",
                height: screenSize.height / 12.5,
                width: screenSize.width / 2,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
              }}
              onPre
            >
              <Text>Create Task</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
