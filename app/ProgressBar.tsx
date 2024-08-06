import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import metaData from "../db.json";
import Questions from "../app/Questions";
import { useNavigation } from "@react-navigation/native";

const ProgressBar = ({ progress, index, question }) => {
  const allQuestions = metaData.quizQuestions;
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(30);
  const [flash, setFlash] = useState(false);
  const flashAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeLeft(60);
    setFlash(false);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, question]);

  useEffect(() => {
    if (timeLeft <= 20) {
      setFlash(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(flashAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(flashAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
      flashAnim.setValue(0);
    }
  }, [timeLeft, flashAnim]);

  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });

  const timerBackgroundColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 165, 82, 0.2)", "rgba(255, 0, 0, 0.2)"],
  });

  const timerIconColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFA358", "red"],
  });

  const timerTextColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFA358", "#FF0000"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.otherContainer}>
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: timerBackgroundColor,
            borderRadius: 15,
            paddingHorizontal: 10,
            width: 68,
            height: 30,
          }}
        >
          <Animated.Image
            source={require("../assets/images/icons/icons8-time-100.png")}
            style={{
              width: 18,
              height: 18,
              marginRight: 5,
              tintColor: timerIconColor,
              alignSelf: "center",
            }}
          />
          <Animated.Text
            style={{
              color: timerTextColor,
              fontSize: 15,
              fontFamily: "MuseoBold",
              textAlign: "center",
              letterSpacing: 0.9,
            }}
          >
            {timeLeft}s
          </Animated.Text>
        </Animated.View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.07)",
              borderRadius: 100,
              height: 30,
              width: 30,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/icons/icons8-cancel-100.png")}
              style={{
                width: 18,
                height: 18,
                tintColor: "Black",
                alignSelf: "center",
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column", paddingBottom: 5 }}>
        <View style={styles.progressBarContainerContainer}>
          <View style={styles.progressBarContainer}>
            <Animated.View
              style={[
                {
                  height: 21,
                  borderRadius: 50,
                  backgroundColor: "#FF9F98",
                },
                {
                  width: progressAnim,
                },
              ]}
            ></Animated.View>
          </View>
          <View style={styles.questionNumber}>
            <Image
              source={require("../assets/images/icons/icons8-question-outlined-100.png")}
              style={styles.questionIcon}
            />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.questionNumberTextIndex}>{index + 1}</Text>
              <Text style={styles.questionNumberText}>
                / {metaData.quizQuestions.length}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.question}>{question}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  otherContainer: {
    height: 65,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBarContainer: {
    width: "80%",
    height: 21,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginBottom: 10,
  },
  progressBarContainerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 15,
  },
  headerContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  questionNumber: {
    backgroundColor: "#F2EFEF",
    borderRadius: 100,
    width: 54,
    height: 21,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  questionNumberTextIndex: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "MuseoBold",
    color: "rgba(0, 0, 0, 0.5)",
    right: 2,
  },
  questionNumberText: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "MuseoBold",
    color: "rgba(0, 0, 0, 0.5)",
  },
  questionIcon: {
    width: 11.42,
    height: 11,
    tintColor: "rgba(0, 0, 0, 0.5)",
  },
  question: {
    textAlign: "center",
    fontFamily: "MuseoBold",
  },
});
export default ProgressBar;
