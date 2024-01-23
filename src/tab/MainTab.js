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
import Session from "../screens/Session";
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
        name="Home"
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
                color={focused ? "#C6A969" : "#C6A969"}
              ></MaterialIcons>
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
                backgroundColor: "#F7EFE5",
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
                  tintColor: "gray",
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
              <FontAwesome
                name="user"
                size={30}
                color={focused ? "#C6A969" : "#C6A969"}
              ></FontAwesome>
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
