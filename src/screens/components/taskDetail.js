import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

// icon
import axios from "../../config/instance";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Swipeable from "react-native-swipeable-row";
import { getValueFor } from "../SecureStore";
import moment from "moment";

const TaskDetailScreen = ({ route, navigation }) => {
  const { recentTask } = route.params;
  console.log(recentTask, "ini recent task bro");

  const [detail, setDetail] = useState({});
  const [subtasks, setSubtasks] = useState([]);
  const [user, setUser] = useState({});

  // description logic
  const [showMore, setShowMore] = useState(false);
  const maxDescriptionLength = 50;

  const fetchUser = async () => {
    const token = await getValueFor("access_token");
    console.log("oioi");
    try {
      const { data } = await axios({
        url: `/user/${recentTask.userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      console.log(user, "ini data user");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDetail = async () => {
    const taskId = recentTask._id;
    const token = await getValueFor("access_token");
    try {
      const { data } = await axios({
        url: `/task/${taskId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data, "<<<<<< data di detail");

      setDetail(data);
    } catch (error) {
      console.log(error, "error fetch detail");
    }
  };

  const onDelete = async (id) => {
    const token = await getValueFor("access_token");

    // console.log(token, "ini token");
    try {
      // console.log("sesuatu");
      // console.log(id, "ini id boss");
      const { data } = await axios({
        url: `/task/${recentTask._id}/subtask/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchDetail();

      navigation.replace("DetailTask", { recentTask });
    } catch (error) {
      console.log(error, "error delete subtask");
    }
  };

  useEffect(async () => {
    fetchDetail();
    fetchUser();
  }, []);

  useEffect(() => {
    // setTimeout(() => {

    // }, 300);
    setSubtasks(recentTask?.subTasks);
  }, []);

  const SubtaskCard = ({ subtask }) => {
    // console.log(subtask, "ini subtask");
    return (
      <Swipeable
        rightButtons={rightButtons}
        onRightButtonsOpenRelease={() => onDelete(subtask?._id)}
        useNativeDriver={true}
      >
        <>
          <View style={styles.card}>
            <Text style={styles.subtask}>{subtask.name}</Text>
          </View>
          {/* <Button title="hai" onPress={() => onDelete(subtask._id)}></Button> */}
        </>
      </Swipeable>
    );
  };

  // swiping
  const rightButtons = [
    <View style={styles.deleteButtonContainer}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </View>,
  ];

  const formattedDate = moment(detail?.deadline).format("dddd, MMMM Do YYYY");

  // const onDelete = (id) => {
  //   console.log(id, "sharingan");
  //   const updatedSubtasks = subtasks?.filter((subtask) => subtask.id !== id);
  //   setSubtasks(updatedSubtasks);
  // };

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/texture-landscape-photography-1.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.taskName}>{detail.name}</Text>
        <View style={styles.rowContainer}>
          <View style={styles.rowSection}>
            <View style={styles.iconContainer}>
              <Fontisto name="date" size={24} color="black" />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.rowLabel}>Task Duration:</Text>
              <Text style={styles.rowValue}>{formattedDate}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Session", { recentTask });
            }}
          >
            <View style={styles.rowSection}>
              <View style={styles.iconContainer}>
                <AntDesign name="playcircleo" size={24} color="black" />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.rowLabel}>Start Session</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.labelDescription}>Description</Text>

        <Text>
          {showMore
            ? recentTask?.description
            : recentTask?.description?.substring(0, maxDescriptionLength) +
              (recentTask?.description?.length > maxDescriptionLength
                ? "..."
                : "")}
        </Text>

        {recentTask?.description?.length > maxDescriptionLength && (
          <TouchableOpacity onPress={() => setShowMore(!showMore)}>
            <Text style={styles.seeMoreLink}>
              {showMore ? "See Less" : "See More"}
            </Text>
          </TouchableOpacity>
        )}

        {/* <View style={styles.outerProgressBar}>
          <Text style={styles.labelProgress}>Progress</Text>
          <View style={styles.progressBarContainer}>
            <ActivityIndicator
              size="large"
              color="#000000"
              style={[styles.progressBar, { width: `20%` }]}
              animating={true}
              useNativeDriver={true} // nativeDriver warning
            />
          </View>
        </View> */}

        {/* <View style={styles.divider} /> */}

        <Text style={styles.subtaskHeader}>Subtasks:</Text>
        <FlatList
          data={subtasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <SubtaskCard subtask={item} index={index} />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    // backgroundColor: "blue",
    paddingBottom: 10,
  },
  image: { width: "100%", height: "100%" },
  container: {
    flex: 2,
    margin: 20,
    // backgroundColor: "yellow",
  },
  taskName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },

  //   below task name section
  rowContainer: {
    flexDirection: "row",
    // backgroundColor: "red",
    // alignItems: "cemter",
    // justifyContent: "center",
    gap: 20,
    marginBottom: 16,
  },
  rowSection: {
    flex: 1,
    // backgroundColor: "#E0E0E0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    // marginRight: 15,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },
  iconContainer: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  rowValue: {
    fontSize: 14,
    color: "#000000",
  },
  //   description
  labelDescription: {
    fontSize: 18,
    fontWeight: "bold",
    // marginBottom: 5,
    color: "#000000",
  },
  taskDescription: {
    fontSize: 16,
    color: "#000000",
  },
  seeMoreLink: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 20,
  },

  //   progressbar
  outerProgressBar: {},
  labelProgress: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  progressBarContainer: {
    height: 20,
    // backgroundColor: "red",
    // backgroundColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    flex: 1,
    backgroundColor: "#000000",
    borderRadius: 10,
  },

  //   subtask
  subtaskHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
    color: "#000000",
  },
  card: {
    padding: 5,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    borderWidth: 0.25,
  },
  subtask: {
    fontSize: 14,
    color: "#000000",
  },

  deleteButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "gray",
    paddingLeft: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF",
  },
});

export default TaskDetailScreen;
