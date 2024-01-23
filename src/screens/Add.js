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
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      {/* add task form */}
      <View
        style={{
          padding: 10,
        }}
      >
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
          placeholder="Example : create website"
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
            height: screenSize.height / 12,
            borderWidth: 1,
            padding: 10,
            margin: 12,
            borderRadius: 10,
          }}
          value={description}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Deadline:
          </Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text
              style={{
                flexDirection: "row",
                width: screenSize.width / 2,
                borderWidth: 1,
                padding: 10,
                margin: 12,
                borderRadius: 10,
              }}
            >
              {dateString ? dateString : ""}
            </Text>
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
          }}
        >
          <View>
            <TextInput
              name="subTasks"
              placeholder="Add Sub-Task"
              style={{
                height: screenSize.height / 15,
                width: screenSize.width / 1.3,
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

        {/* {arrSub.map((subT, index) => (
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
        ))} */}
        <View
          style={{
            height: screenSize.height / 3.1,
          }}
        >
          <FlatList
            data={arrSub}
            renderItem={renderSubTask}
            keyExtractor={(item, index) => item.index}
            style={styles.subTaskList}
          />
        </View>
      </View>
      {/* create button */}
      <View
        style={{
          backgroundColor: "grey",
          alignItems: "center",
          justifyContent: "center",
          height: screenSize.height / 8.5,
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
        }}
      >
        <View>
          <TouchableOpacity onPress={handleAddTask}>
            <View
              style={{
                backgroundColor: "red",
                height: screenSize.height / 12.5,
                width: screenSize.width / 1.25,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              <Text>Create Task</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subTaskList: {
    width: "100%",
    borderRadius: 8,
    padding: 8,
  },
});
