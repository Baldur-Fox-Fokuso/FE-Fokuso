import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useContext, useEffect } from "react";
// import { AuthContext } from "../src/context/AuthContext";
// import { getValueFor } from "../src/helpers/secureStore";
import Session from "../pages/Session";
import Task from "../pages/Task";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  //   const authContext = useContext(AuthContext);

  //   useEffect(() => {
  //     getValueFor("access_token").then((result) => {
  //       if (result) {
  //         authContext.setIsSignedIn(true);
  //       }
  //     });
  //   }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
        //   screenOptions={{
        //     headerTitleAlign: "center",
        //     headerStyle: {
        //       backgroundColor: "black",
        //     },
        //     headerTintColor: "white",
        //   }}
        >
          <Stack.Screen
            name="Task"
            component={Task}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Session"
            component={Session}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};