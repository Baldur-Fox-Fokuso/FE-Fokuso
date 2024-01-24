import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import { useState } from "react";
import axios from "../config/instance";
import { screenSize } from "../utils";
import { AntDesign } from "@expo/vector-icons";
import { getValueFor } from "./SecureStore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { handleAI } from "./components/testOpenAi";
import moment from "moment";

export default function Add({ navigation }) {
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
      setDeadline(new Date());
      setDateString("");
      navigation.navigate("Home", { refetch: true });
    } catch (error) {
      console.log(error);
    }
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const formattedDate = moment(deadline).format("dddd, MMMM Do YYYY");

  const [arrSub, setArrSub] = useState([]);
  const [subT, setSubTask] = useState("");
  const [arrSubAI, setArrSubAI] = useState([]);

  const addSubTask = () => {
    setArrSub([...arrSub, subT]);
    setSubTask("");
  };

  const renderSubTask = ({ item }) => (
    <View
      style={{
        height: screenSize.height / 18,
        borderWidth: 1,
        padding: 10,
        margin: 12,
        borderRadius: 10,
      }}
    >
      <Text>{item}</Text>
    </View>
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateString, setDateString] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateString(date.toDateString());
    setDeadline(date);
    hideDatePicker();
  };

  return (
    <>
      {/* add task form */}
      <View style={styles.formContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Title
        </Text>
        <TextInput
          name="name"
          placeholder="ex : create website"
          onChangeText={(text) => setName(text)}
          style={{
            height: screenSize.height / 20,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
          }}
          value={name}
        />

        <View style={styles.descriptionContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Description
          </Text>
          <TextInput
            name="description"
            placeholder="Write a description"
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            numberOfLines={4}
            style={{
              height: screenSize.height / 5,
              borderWidth: 1,
              padding: 10,
              margin: 12,
              borderRadius: 10,
              paddingBottom: 120,
            }}
            value={description}
          />
        </View>

        <View style={styles.deadlineContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Deadline
          </Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={{
              flexDirection: "row",
              borderWidth: 1,
              padding: 10,
              margin: 12,
              borderRadius: 10,
            }}
          >
            <Text>{dateString ? formattedDate : ""}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            value={deadline}
            date={deadline}
            onChange={(event, selectedDate) => {
              if (event?.type === "dismissed") {
                setDeadline(deadline);
              }
              setDeadline(selectedDate);
            }}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View style={styles.subtaskContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Sub-Task
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 12,
              // backgroundColor: "white",
            }}
          >
            <View>
              <TextInput
                name="subTasks"
                placeholder="add sub-task"
                style={{
                  height: screenSize.height / 15,
                  width: screenSize.width / 1.3,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                }}
                value={subT}
                onChangeText={setSubTask}
              />
            </View>

            <TouchableOpacity onPress={addSubTask}>
              <AntDesign name="pluscircleo" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* {arrSub.map((subT, index) => (
          <View
            key={index}
            style={{
              height: screenSize.height / 18,
              borderWidth: 1,
              padding: 10,
              margin: 12,
              borderRadius: 10,
            }}
          >
            <Text>{subT}</Text>
          </View>
        ))} */}
        <View style={styles.flatListContainer}>
          <FlatList
            data={arrSub}
            renderItem={renderSubTask}
            keyExtractor={(item, index) => item.index}
            style={styles.subTaskList}
          />
        </View>

        {/* create button */}
        <View style={styles.createTaskButtonContainer}>
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.createButton}>
              <Text style={{ color: "white" }}>Create Task</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // form
  formContainer: {
    flex: 8,
    padding: 10,
  },
  descriptionContainer: {},
  deadlineContainer: {},
  subtaskContainer: {
    // backgroundColor: "white"
  },

  flatListContainer: {
    flex: 2,
    // backgroundColor: "red",

    height: screenSize.height / 3.1,
  },
  createTaskButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },
  createButton: {
    backgroundColor: "black",
    height: screenSize.height / 15,
    width: screenSize.width / 1.25,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    // marginHorizontal: 10,
  },
});
