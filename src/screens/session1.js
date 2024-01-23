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
import Icon from "react-native-vector-icons/FontAwesome";
import Music from "./components/music";
import { AntDesign } from "@expo/vector-icons";

const Session1 = ({ navigation }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState("pomodoro");

  // goBack
  const handleGoBack = () => {
    navigation.goBack();
  };

  const modeOptions = [
    { label: "Pomodoro", value: "pomodoro" },
    { label: "Short Break", value: "shortBreak" },
    { label: "Long Break", value: "longBreak" },
  ];

  const changeModeRender = (argumen) => {
    // console.log(argumen, "hai");
    setIsActive(false);
    setSeconds(0);
    setSelectedMode(argumen);
    if (argumen === "pomodoro") {
      setMinutes(25);
    } else if (argumen === "shortBreak") {
      setMinutes(5);
    } else if (argumen === "longBreak") {
      setMinutes(15);
    }
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            // add logic notif disini kalo timer selesai
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
            <Text style={styles.titleText}>Task Name</Text>
          </View>

          {/* End of Row */}
          <Music />
        </View>
        <View style={styles.container0}>
          <Image
            source={require("../../assets/7TaK4G8TA.gif")}
            style={styles.image}
            resizeMode="cover"
          />
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

          <Text style={styles.timerText}>{`${formatTime(minutes)}:${formatTime(
            seconds
          )}`}</Text>

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
    flex: 0.1,
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
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B0A695",
    backgroundColor: "white",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 75,
  },
  container1: {
    flex: 0.4,
    justifyContent: "center",
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
    justifyContent: "space-around",
    paddingVertical: 30,
    backgroundColor: "white",
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
