import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Add from "../screens/Add";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function AddTaskStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddTask"
        component={Add}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Create New Task",
          // headerLeft: () => (
          //   <Button
          //     onPress={() => navigation.goBack()}
          //     title="Back"
          //     icon={
          //       <Ionicons
          //         name="chevron-back-circle-outline"
          //         size={24}
          //         color="black"
          //       />
          //     }
          //   />
          // ),
        }}
      />
    </Stack.Navigator>
  );
}
