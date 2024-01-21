import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Task from "../pages/Task";
import Session from "../pages/Session";
import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import plus from "../../assets/plus.png";
import Add from "../pages/Add";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: "absolute",
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Task"
          component={Task}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="home-filled"
                  size={30}
                  color={focused ? "red" : "gray"}
                ></MaterialIcons>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={Add}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: "red",
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: Platform.OS == "android" ? 50 : 30,
                }}
              >
                <Image
                  source={plus}
                  style={{
                    width: 22,
                    height: 22,
                    tintColor: "white",
                  }}
                ></Image>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Session"
          component={Session}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  // centring Tab Button...
                  position: "absolute",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="av-timer"
                  size={30}
                  color={focused ? "red" : "gray"}
                ></MaterialIcons>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
