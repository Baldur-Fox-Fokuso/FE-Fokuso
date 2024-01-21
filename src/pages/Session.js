import { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from "react-native";

import Timer from "../components/Timer";
import Header from "../components/Header";

export default function Session({ route }) {
  const { name } = route.params;
  console.log(name, "<<<<<<<<");
  const options = ["Pomodoro", "Short Break", "Long Break"];
  const [isActive, setIsActive] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [time, setTime] = useState(60 * 0.1); // 25 minutes in seconds
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
      setTime(isWorking ? 80 * 0.1 : 100 * 0.1); // break 5 menit
      setCurrentTime(1);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  // tiap start create session, method POST

  const handleStartStop = () => {
    // playSound();
    setIsActive((i) => !i);
  };

  async function playSound() {}
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white", fontSize: 30 }}>{name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Header
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              setTime={setTime}
              options={options}
            />
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "green" }}>
          <Timer time={time} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "blue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleStartStop}>
            <Text>{isActive ? "STOP" : "START"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },
});
