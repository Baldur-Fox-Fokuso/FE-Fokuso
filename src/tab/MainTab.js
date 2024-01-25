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

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import plus from "../../assets/plus.png";
import Add from "../screens/Add";
import Task from "../screens/components/Task";
import Profile from "../screens/components/profile";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
      backBehavior="firstRoute"
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          elevation: 15,
          height: 60,
          width: "70%",
          position: "absolute",
          bottom: 30,
          // right: 16,
          left: 60,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5.62,
          elevation: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Task}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
                justifyContent: "center",
              }}
            >
              <Ionicons name="home-sharp" size={24} color="#3787EB" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Create Task"
        component={Add}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: "center",
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 55,
                height: 55,
                backgroundColor: "#3787EB",
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
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitleAlign: "center",
          // sembunyikan
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="user" size={30} color="#3787EB"></FontAwesome>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
});
