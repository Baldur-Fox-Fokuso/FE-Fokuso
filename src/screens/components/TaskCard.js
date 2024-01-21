import { TouchableOpacity, View, Text } from "react-native";

export default function TaskCard({ task }) {
  return (
    <TouchableOpacity>
      <View
        style={{
          backgroundColor: "#000000",
          padding: 25,
          borderRadius: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          height: 100,
        }}
      >
        <View>
          <Text
          style={{
            color : 'white',
            fontSize : 15,
            fontWeight : '800'
          }} >{task.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
