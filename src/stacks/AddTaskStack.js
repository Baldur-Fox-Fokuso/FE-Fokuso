import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Add from "../screens/Add";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

export default function AddTaskStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddTask"
        component={Add}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Create New Task",
          headerLeft: () => (
            <Button onPress={() => alert("This is a button!")} title="<" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
