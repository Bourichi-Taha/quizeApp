import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { useNavigation } from "@react-navigation/native";
import { useQuizDispatch, useQuizState } from "@/components/QuizContext";

const Home = () => {
  const { correctAnswers, wrongAnswers } = useQuizState();
  const { dispatch } = useQuizDispatch();

  const navigation = useNavigation();

  const handleStartQuiz = async () => {
    await dispatch({ type: "RESET_QUIZ" });
    navigation.navigate("Quizzes");
  };

  const totalQuestions = correctAnswers.length + wrongAnswers.length;
  const correctPercentage =
    totalQuestions > 0 ? (correctAnswers.length / totalQuestions) * 100 : 0;
  const wrongPercentage =
    totalQuestions > 0 ? (wrongAnswers.length / totalQuestions) * 100 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <View style={styles.correctContainer}>
        <View>
          <Text style={styles.answersText}>Correct Answers</Text>
        </View>
        <View>
          <CircularProgress
            value={correctPercentage}
            maxValue={100}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            inActiveStrokeColor={"rgba(0, 0, 0, 0.2)"}
            activeStrokeColor="white"
            progressValueColor={"rgba(0, 0, 0, 0.4)"}
            progressValueStyle={{
              fontSize: 20,
            }}
            valueSuffix={"%"}
            radius={50}
            rotation={90}
          />
        </View>
      </View>
      <View style={styles.wrongContainer}>
        <View>
          <Text style={styles.answersText}>Wrong Answers</Text>
        </View>
        <View>
          <CircularProgress
            value={wrongPercentage}
            maxValue={100}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            inActiveStrokeColor={"rgba(0, 0, 0, 0.2)"}
            activeStrokeColor="white"
            progressValueColor={"rgba(0, 0, 0, 0.4)"}
            progressValueStyle={{ fontSize: 20 }}
            valueSuffix={"%"}
            radius={50}
            rotation={90}
          />
        </View>
      </View>
      <TouchableOpacity style={{ top: 50 }} onPress={handleStartQuiz}>
        <View style={styles.startContainer}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "MuseoBold",
              fontSize: 20,
            }}
          >
            Start Quiz
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCFC",
    height: "100%",
    flexDirection: "column",
  },
  title: {
    top: 83,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MuseoBold",
  },
  correctContainer: {
    top: 200,
    width: 353,
    height: 164,
    borderRadius: 20,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 40,
    backgroundColor: "#2ECC71",
  },
  wrongContainer: {
    top: 220,
    width: 353,
    height: 164,
    borderRadius: 20,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 40,
    alignSelf: "center",
    backgroundColor: "#EE5253",
  },
  answersText: {
    width: 183,
    fontFamily: "MuseoBold",
    fontSize: 28,
    color: "white",
    lineHeight: 44.52,
  },
  startContainer: {
    top: 220,
    width: 353,
    height: 50,
    borderRadius: 100,
    paddingHorizontal: 40,
    alignSelf: "center",
    backgroundColor: "#F69993",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
