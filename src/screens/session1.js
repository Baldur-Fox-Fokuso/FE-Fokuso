import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "../config/instance";
import { getValueFor } from "./SecureStore";
import Icon from "react-native-vector-icons/FontAwesome";
import Music from "./components/music";
import { AntDesign } from "@expo/vector-icons";

import * as Notifications from "expo-notifications";
import { Asset } from "expo-asset";

const Session1 = ({ route, navigation }) => {
  const { recentTask } = route?.params;
  const [minutes, setMinutes] = useState(25);
  // 0,, ngetest notif
  const [seconds, setSeconds] = useState(0);
  // 1
  const [isActive, setIsActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState("pomodoro");
  const [isStarted, setIsStarted] = useState(false);
  const [sessionId, setSessionId] = useState("");

  // goBack
  const handleGoBack = () => {
    navigation.goBack();
  };

  // const modeOptions = [
  //   { label: "Pomodoro", value: "pomodoro" },
  //   { label: "Short Break", value: "shortBreak" },
  //   { label: "Long Break", value: "longBreak" },
  // ];

  const startSession = async () => {
    const token = await getValueFor("access_token");
    try {
      const { data } = await axios({
        url: `/task/${task._id}/session`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessionId(data.sessionId);
    } catch (error) {
      console.log(error, "dari session");
    }
  };

  const closeSession = async () => {
    const token = await getValueFor("access_token");
    try {
      const { data } = await axios({
        url: `/task/${task._id}/session/${sessionId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const changeModeRender = (argumen) => {
    // console.log(argumen, "hai");
    setIsActive(false);
    setSeconds(0);
    setSelectedMode(argumen);
    if (argumen === "pomodoro") {
      setMinutes(25);
    } else if (argumen === "shortBreak") {
      setMinutes(2);
    } else if (argumen === "longBreak") {
      setMinutes(15);
    }
  };

  const scheduleNotification = async () => {
    const localSoundFile = require("../../assets/file_example_MP3_700KB.mp3");

    // const soundFileInfo = await FileSystem.getInfoAsync(localSoundFile);

    const soundAsset = Asset.fromModule(localSoundFile);
    await soundAsset.downloadAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Completed!",
        body: "Task Completed",
        // sound: soundFileInfo.uri,
        // sound: soundAsset.localUri,
        sound: {
          sound: localSoundFile,
          shouldPlay: true,
        },
      },
      trigger: null,
    });
  };

  useEffect(() => {
    // implement notification
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    let interval;

    if (isActive) {
      interval = setInterval(async () => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            // add logic notif disini kalo timer selesai
            closeSession();

            await scheduleNotification();
            switch (selectedMode) {
              case "pomodoro":
                setMinutes(1);
                break;
              case "shortBreak":
                setMinutes(5);
                break;
              case "longBreak":
                setMinutes(15);
                break;
              default:
                setMinutes(1);
            }
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, selectedMode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isStarted && selectedMode === "pomodoro") {
      setIsStarted(true);
      startSession();
    }
  };

  const resetTimer = () => {
    setIsActive(false);

    switch (selectedMode) {
      case "pomodoro":
        setMinutes(25);
        break;
      case "shortBreak":
        setMinutes(5);
        break;
      case "longBreak":
        setMinutes(15);
        break;
      default:
        setMinutes(25);
    }
    setSeconds(0);
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);

  return (
    <>
      <View style={styles.OuterContainer}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
        <View style={styles.containerHeader}>
          {/* Start of Row */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleGoBack}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{recentTask?.name}</Text>
          </View>

          {/* End of Row */}
          <Music />
        </View>
        <View style={styles.container0}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/study_lofi.gif")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
        <View style={styles.container1}>
          {/* <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Mode:</Text>
            <View
              style={{ borderWidth: 5, borderColor: "gray", borderRadius: 5 }}
            >
              <Picker
                style={styles.picker}
                selectedValue={selectedMode}
                onValueChange={(itemValue) => changeModeRender(itemValue)}
                mode="dropdown"
              >
                {modeOptions.map((mode) => (
                  <Picker.Item
                    key={mode.value}
                    label={mode.label}
                    value={mode.value}
                  />
                ))}
              </Picker>
            </View>
          </View> */}

          <View style={styles.modeContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                selectedMode === "pomodoro" && styles.selectedMode,
              ]}
              onPress={() => changeModeRender("pomodoro")}
            >
              <Text style={styles.modeButtonText}>Pomodoro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeButton,
                selectedMode === "shortBreak" && styles.selectedMode,
              ]}
              onPress={() => changeModeRender("shortBreak")}
            >
              <Text style={styles.modeButtonText}>Short Break</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeButton,
                selectedMode === "longBreak" && styles.selectedMode,
              ]}
              onPress={() => changeModeRender("longBreak")}
            >
              <Text style={styles.modeButtonText}>Long Break</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{`${formatTime(
              minutes
            )}:${formatTime(seconds)}`}</Text>

            {/* <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                isActive ? styles.pauseButton : styles.startButton,
              ]}
              onPress={toggleTimer}
            >
              <Text style={styles.startButtonText}>
                {isActive ? "Pause" : "Start"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetTimer}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View> */}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleTimer}>
                <Icon
                  name={isActive ? "pause" : "play"}
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={resetTimer}>
                <Icon name="refresh" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  // header
  containerHeader: {
    flex: 0.16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "white",
    // backgroundColor: "#776B5D",
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
  },
  iconContainer: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container0: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#B0A695",
    backgroundColor: "white",
  },
  imageWrapper: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container1: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#EBE3D5",
    backgroundColor: "white",
  },
  //! start picker section
  // pickerContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginVertical: 20,
  //   backgroundColor: "#EBE3D5",
  // },
  // pickerLabel: {
  //   fontSize: 18,
  //   color: "black",
  //   marginRight: 10,
  // },
  // picker: {
  //   backgroundColor: "gray",
  //   height: 50,
  //   width: 200,
  //   color: "white",
  // },
  //! end picker section

  // button mode (start)
  modeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginVertical: 5,
    // paddingTop: 50,
    backgroundColor: "white",
    // backgroundColor: "gray",
    gap: 7,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  // selectedMode: {
  //   backgroundColor: "white",
  // },
  modeButtonText: {
    fontSize: 16,
  },
  // button mode (end)

  timerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  timerText: {
    fontSize: 48,
    color: "black",
  },

  // ! button using text
  // buttonContainer: {
  //   flexDirection: "row",
  //   marginTop: 20,
  // },
  // button: {
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   marginHorizontal: 10,
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   borderColor: "black",
  // },
  // startButton: {
  //   backgroundColor: "green",
  // },
  // pauseButton: {
  //   backgroundColor: "orange",
  // },
  // buttonText: {
  //   color: "black",
  // },
  // startButtonText: {
  //   color: "white",
  // },

  // ! button using icon
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    // backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: 150,
  },
  startButton: {
    // backgroundColor: "#2ecc71",
  },
  pauseButton: {
    // backgroundColor: "#e74c3c",
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Session1;
