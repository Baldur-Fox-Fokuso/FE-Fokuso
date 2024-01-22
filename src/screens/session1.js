import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Session1 = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedMode, setSelectedMode] = useState("pomodoro");

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
    // setSelectedMode(selectedMode);
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            isActive ? styles.pauseButton : styles.startButton,
          ]}
          onPress={toggleTimer}
        >
          <Text style={styles.buttonText}>{isActive ? "Pause" : "Start"}</Text>
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
    backgroundColor: "black",
  },
  timerText: {
    fontSize: 48,
    color: "white",
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  pickerLabel: {
    fontSize: 18,
    color: "white",
    marginRight: 10,
  },
  picker: {
    backgroundColor: "white",
    height: 50,
    width: 200,
    color: "black",
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
    borderColor: "white",
  },
  startButton: {
    backgroundColor: "green",
  },
  pauseButton: {
    backgroundColor: "orange",
  },
  buttonText: {
    color: "white",
  },
});

export default Session1;
