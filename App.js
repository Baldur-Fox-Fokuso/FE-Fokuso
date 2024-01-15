import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-web";
import Timer from "./src/components/Timer";
import Header from "./src/components/Header";

export default function App() {
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
    <SafeAreaView styles={styles.droidSafeArea}>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "red" }}>
          Pomodoro
        </Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
        <Text> isActive = {isActive ? "true" : "false"}</Text>
      </View>
    </SafeAreaView>
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
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
});
