import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";

import Timer from "../components/Timer";
import Header from "../components/Header";

export default function Session() {
  const [isActive, setIsActive] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [time, setTime] = useState(60 * 25); // 25 minutes in seconds
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsWorking(!isWorking);
      setIsActive(false);
      setTime(isWorking ? 300 : 1500); // break 5 menit
      setCurrentTime("SHORT");
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (currentTime === "SHORT") {
      setIsActive(!isActive);
    } else {
      setIsActive(false);
    }
  }, [currentTime]);

  const handleStartStop = () => {
    // playSound();
    setIsActive((prev) => !prev);
  };

  async function playSound() {}
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Text>HEADER</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "blue" }}>
        <Text>TIMER</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "green" }}>
        <Text>BUTTON</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
});
