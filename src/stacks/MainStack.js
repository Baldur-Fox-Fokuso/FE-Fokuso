import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
// import { AuthContext } from "../src/context/AuthContext";
// import { getValueFor } from "../src/helpers/secureStore";

import Home from "../screens/Home";
import LandingPage from "../screens/Welcome";
import SignUpScreen from "../screens/Signup";
import Login from "../screens/Login";
import Dashboard from "../screens/Home";
import { AuthContext } from "../context/AuthContext";
import { getValueFor } from "../screens/SecureStore";
import Add from "../screens/Add";
import MainTabs from "../tab/MainTab";
import Task from "../screens/components/Task";
import Music from "../screens/components/music";
import Notification from "../screens/components/notification";
import Profile from "../screens/components/profile";
import TestOpenAI from "../screens/components/testOpenAi";
import TaskDetailScreen from "../screens/components/taskDetail";
import Session1 from "../screens/session1";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    getValueFor("access_token").then((result) => {
      if (result) {
        authContext.setIsSignedIn(true);
      }
    });
  }, []);

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
          {/* <Stack.Screen
            name="Task"
            component={Task}
            options={{ headerShown: false }}
          /> */}

          {/* <Stack.Screen name="Profile" component={Profile} /> */}

          {/* <Stack.Screen name="TestOpenAI" component={TestOpenAI} /> */}

          {/* <Stack.Screen name="Music" component={Music} /> */}

          {/* <Stack.Screen name="Notification" component={Music} options={""} /> */}

          {/* <Stack.Screen
            name="Session"
            component={Session}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Session"
            component={Session1}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen name="Task Detail" component={TaskDetailScreen} /> */}

          <Stack.Screen
            name="Welcome"
            component={LandingPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signup"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
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
