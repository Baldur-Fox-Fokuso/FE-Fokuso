import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "../config/instance";
import { getValueFor } from "./SecureStore";

const Session1 = ({ route }) => {
  const { task } = route?.params;
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState("pomodoro");
  const [isStarted, setIsStarted] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const modeOptions = [
    { label: "Pomodoro", value: "pomodoro" },
    { label: "Short Break", value: "shortBreak" },
    { label: "Long Break", value: "longBreak" },
  ];

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
      console.log("sukses start session");
      console.log(data.message, "<<<<<<<<<< data session");
      setSessionId(data.sessionId);
    } catch (error) {
      console.log(error);
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
      console.log(data, "<<<<<<<<< session selesai");
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
      setMinutes(1);
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
            closeSession();

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
    <View style={styles.container}>
      <Text style={styles.timerText}>{`${formatTime(minutes)}:${formatTime(
        seconds
      )}`}</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Mode:</Text>
        <View style={{ borderWidth: 5, borderColor: "gray", borderRadius: 5 }}>
          {/* overlap */}
          <Picker
            style={styles.picker}
            selectedValue={selectedMode}
            onValueChange={(itemValue) => changeModeRender(itemValue)}
            //   onValueChange={(itemValue) => setSelectedMode(itemValue)}
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
      </View>

      <View style={styles.buttonContainer}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  timerText: {
    fontSize: 48,
    color: "black",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  pickerLabel: {
    fontSize: 18,
    color: "black",
    marginRight: 10,
  },
  picker: {
    backgroundColor: "gray",
    height: 50,
    width: 200,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  startButton: {
    backgroundColor: "green",
  },
  pauseButton: {
    backgroundColor: "orange",
  },
  buttonText: {
    color: "black",
  },
  startButtonText: {
    color: "white",
  },
});

export default Session1;
