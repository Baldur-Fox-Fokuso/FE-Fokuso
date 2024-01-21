import { View, Text } from "react-native";

export default function Timer({ time }) {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "pink",
  },
  time: {
    textAlign: "center",
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
  },
};
