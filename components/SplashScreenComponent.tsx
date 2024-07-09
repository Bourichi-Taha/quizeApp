import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";
import { ThemedView } from "./ThemedView";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent({ onAnimationFinish }) {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <LottieView
        source={require("../assets/Splash/Animation - 1720256419149.json")}
        autoPlay
        loop
        onAnimationFinish={onAnimationFinish}
        style={styles.animation}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.8,
  },
});
