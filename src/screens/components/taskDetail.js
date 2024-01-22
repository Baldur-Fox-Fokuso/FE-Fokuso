import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";

// icon
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Swipeable from "react-native-swipeable-row";

const TaskDetailScreen = ({ route }) => {
  //   const { taskName, taskDescription, taskProgress, subtasks } = route.params;

  // description
  const [showAllDescription, setShowAllDescription] = useState(false);
  const taskDescription =
    "Players control the Traveler, exploring a visually stunning open world, solving puzzles, and engaging in real-time combat against various enemies. The game incorporates a gacha system for obtaining new characters and weapons, and its elemental system encourages strategic use of character abilities. With regular updates introducing new content, Genshin Impact offers both a single-player experience and cooperative multiplayer gameplay, making it a popular and evolving title in the gaming community.";

  const limitedDescription = taskDescription.substring(0, 200);

  const toggleDescription = () => {
    setShowAllDescription(!showAllDescription);
  };

  const [subtasks, setSubtasks] = useState(data);
  useEffect(() => {
    setSubtasks(data);
  }, []);

  const data = [
    {
      id: "1",
      title: "Daily",
    },
    {
      id: "2",
      title: "Habisin Resin",
    },
    {
      id: "8",
      title: "Habisin Resin",
    },
    {
      id: "9",
      title: "Habisin Resin",
    },
    {
      id: "10",
      title: "Hapus Aku",
    },
  ];

  const SubtaskCard = ({ subtask }) => {
    // console.log(subtask, "ini isi subtask");
    // console.log(subtask.id, "ini id subtask");
    return (
      <Swipeable
        rightButtons={rightButtons}
        onRightButtonsOpenRelease={() => onDelete(subtask.id)}
        useNativeDriver={true}
      >
        <View style={styles.card}>
          <Text style={styles.subtask}>{subtask.title}</Text>
        </View>
      </Swipeable>
    );
  };

  // swiping
  const rightButtons = [
    <View style={styles.deleteButtonContainer}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </View>,
  ];

  const onDelete = (id) => {
    //   udah sampe dapet id
    console.log(id, "sharingan");
    const updatedSubtasks = subtasks?.filter((subtask) => subtask.id !== id);
    setSubtasks(updatedSubtasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.taskName}>Main Genshin</Text>
      <View style={styles.rowContainer}>
        <View style={styles.rowSection}>
          <View style={styles.iconContainer}>
            <Fontisto name="date" size={24} color="black" />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.rowLabel}>Task Duration:</Text>
            <Text style={styles.rowValue}>1 Jam BOss</Text>
          </View>
        </View>
        <View style={styles.rowSection}>
          <View style={styles.iconContainer}>
            <AntDesign name="user" size={24} color="black" />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.rowLabel}>User:</Text>
            <Text style={styles.rowValue}>Michael</Text>
          </View>
        </View>
      </View>
      <Text style={styles.labelDescription}>Description</Text>
      <Text
        numberOfLines={showAllDescription ? undefined : 2}
        style={styles.taskDescription}
      >
        {showAllDescription ? taskDescription : limitedDescription}
      </Text>
      <TouchableOpacity onPress={toggleDescription}>
        <Text style={styles.seeMoreLink}>
          {showAllDescription ? "See Less" : "See More"}
        </Text>
      </TouchableOpacity>
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

      <View style={styles.divider} />

      <Text style={styles.subtaskHeader}>Subtasks:</Text>
      <FlatList
        data={subtasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <SubtaskCard subtask={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  taskName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  //   below task name section
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  rowSection: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    marginRight: 15,
    flexDirection: "row",
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
  labelProgress: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: "#E0E0E0",
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
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  subtask: {
    fontSize: 14,
    color: "#000000",
  },

  divider: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 25,
  },

  //   delete swipe
  deleteButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#FF0000",
    padding: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#FFFFFF",
  },
});

export default TaskDetailScreen;
