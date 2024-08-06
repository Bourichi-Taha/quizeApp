import { Tabs } from "expo-router";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View } from "react-native";
import index from "./index";
import Quizzes from "./Quizzes";
import Questions from "../Questions";
import profile from "./profile";

const Tab = createBottomTabNavigator();

const TabLayout = () => {
  const blurTint = "light";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors["light"].activeTint,
        tabBarInactiveTintColor: Colors["light"].inactiveTint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            position: "absolute",
            ...Platform.select({
              ios: {
                bottom: 0,
              },
              android: {
                height: 65,
                paddingBottom: 25,
              },
            }),
            left: 0,
            right: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "rgb(47, 64, 85)",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            backgroundColor: "transaprent",
            borderTopWidth: 0,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
          },
          null,
        ],
        tabBarBackground: () => (
          <BlurView
            tint={blurTint}
            intensity={90}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: "hidden",
              /* backgroundColor: "rgba(255, 255, 255, 0.85)", */
            }}
            experimentalBlurMethod="dimezisBlurView"
          />
        ),
        tabBarLabelStyle: {
          fontSize: 11,
        },
      })}
    >
      <Tab.Screen
        name="index"
        component={index}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.iconContainerFocused : styles.iconContainer
              }
            >
              <TabBarIcon
                name="home"
                color={focused ? "#FFFFFF" : "#999999"}
                focused={focused}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Questions"
        component={Questions}
        options={{
          title: "Questions",
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.iconContainerFocused : styles.iconContainer
              }
            >
              <TabBarIcon
                name="questionMark"
                color={focused ? "#FFFFFF" : "#999999"}
                focused={focused}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View
              style={
                focused ? styles.iconContainerFocused : styles.iconContainer
              }
            >
              <TabBarIcon
                name="person"
                color={focused ? "#FFFFFF" : "#999999"}
                focused={focused}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  iconContainerFocused: {
    width: 70,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#FF9F98",
  },
  iconContainer: {
    width: 70,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default TabLayout;
