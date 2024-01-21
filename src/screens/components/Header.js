import { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header({
  currentTime,
  setCurrentTime,
  setTime,
  options,
}) {
  console.log(currentTime, "<<<<<< current time di header");

  function handlePress(index) {
    console.log(currentTime, index, "<<<<<< current time di handlepress");
    const newTime = index === 0 ? 0.1 : index === 1 ? 0.2 : 0.3;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View>
      <View
        style={{
          flex: 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.itemStyle,
              currentTime !== index && { borderColor: "transparent" },
            ]}
          >
            <Text style={{ fontWeight: "bold" }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: "33%",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
    borderColor: "white",
    marginVertical: 20,
  },
});
