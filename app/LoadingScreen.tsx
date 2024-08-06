import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import { images } from "../utils/index";
import metaData from "../db.json";
import { useNavigation } from "@react-navigation/native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const LoadingScreen = () => {
  const [slides, setSlides] = useState([]);
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;

  Animated.timing(progress, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: false,
  }).start();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("IntroSliders");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <View style={styles.imageContainer}>
        {/* {slides.length > 0 && ( */}
        <Image source={images[metaData.loader]} style={styles.image} />
        {/*         )} */}
      </View>
      <Text style={styles.title}>{metaData.app_name}</Text>
      <View style={styles.container}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarForeground,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
          <Text style={styles.loadingText}>Please wait, we are loading...</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: windowWidth,
    height: windowHeight,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  title: {
    fontSize: 70,
    color: "white",
    textAlign: "center",
    bottom: 770,
    fontFamily: "MuseoBold",
  },
  loadingText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  progressBarBackground: {
    width: "80%",
    borderRadius: 5,
    bottom: windowHeight * 0.2,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  progressBarForeground: {
    height: 10,
    backgroundColor: "#FF9F98",
    borderRadius: 5,
    alignSelf: "center",
  },
});

export default LoadingScreen;
