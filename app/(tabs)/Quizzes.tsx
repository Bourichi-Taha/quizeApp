import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ProgressBar from "../ProgressBar";
import metaData from "../../db.json";
import { useQuizDispatch, useQuizState } from "@/components/QuizContext";

const Quizzes = ({ navigation }) => {
  const allQuestions = metaData.quizQuestions;
  const { correctAnswers, wrongAnswers, nonAnsweredQuestions } = useQuizState();
  const { dispatch } = useQuizDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(new Animated.Value(1));
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch data from context if needed
  }, []);

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    dispatch({ type: "RESET_QUIZ" });
  };

  const handleNext = async () => {
    const currentQuestion = allQuestions[currentQuestionIndex];
    const correct_option = currentQuestion.correct_option;

    if (currentOptionSelected !== null) {
      if (currentOptionSelected === correct_option) {
        setScore((prevScore) => prevScore + 1);
        dispatch({
          type: "ADD_CORRECT_ANSWER",
          payload: currentQuestion.question,
        });
      } else {
        dispatch({
          type: "ADD_WRONG_ANSWER",
          payload: currentQuestion.question,
        });
      }
    } else {
      dispatch({
        type: "ADD_NON_ANSWERED_QUESTION",
        payload: currentQuestion.question,
      });
    }

    if (currentQuestionIndex >= allQuestions.length - 1) {
      navigation.navigate("TabLayout");
    } else {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      setCurrentOptionSelected(null);

      Animated.parallel([
        Animated.timing(progress, {
          toValue: nextQuestionIndex + 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1900,
            useNativeDriver: false,
          }),
        ]),
      ]).start();
    }
  };

  const renderOptions = () => {
    return (
      <View style={{ marginTop: 10, marginBottom: -10 }}>
        {allQuestions[currentQuestionIndex]?.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{
              marginHorizontal: 20,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(150 / 4) * (index + 10), 0],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={() => setCurrentOptionSelected(option)}
              style={[
                styles.optionsText,
                {
                  backgroundColor: "#F1EEEE",
                  borderWidth: 2,
                  borderColor:
                    currentOptionSelected === option ? "#F69993" : "#F1EEEE",
                },
              ]}
            >
              <View
                style={{
                  marginLeft: -8,
                  marginRight: 8,
                  backgroundColor: "#F69993",
                  width: 34,
                  height: 34,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "MuseoBold",
                    fontSize: 16,
                  }}
                >
                  {index + 1}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  color: "black",
                  textAlign: "left",
                  fontFamily: "MuseoBold",
                }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.scrollContainer}>
          <View style={styles.subContainer}>
            <ProgressBar
              progress={progress}
              index={currentQuestionIndex}
              question={allQuestions[currentQuestionIndex]?.question}
            />
            <Image
              source={{
                uri: "https://www.figma.com/file/oPyshTD79KbZstVlSR8URV/image/186022901c0cdb190aff780bc1b3a8f2ada18416",
              }}
              style={{
                marginTop: 5,
                height: 220,
                width: "100%",
                borderRadius: 20,
              }}
            />
          </View>
          {renderOptions()}
        </View>
        <View style={{ paddingHorizontal: 20, paddingVertical: -30 }}>
          <TouchableOpacity
            style={[
              styles.btnNext,
              {
                backgroundColor: "#F69993",
              },
            ]}
            onPress={handleNext}
          >
            <Text style={styles.btnNextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCFC",
  },
  header: {
    top: 47,
    width: "100%",
    height: 25,
  },
  nameText: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "MuseoBold",
  },
  questionContainer: {
    backgroundColor: "#00D33B26",
  },
  scrollView: { backgroundColor: "#FFFCFC" },
  scrollContainer: {
    paddingVertical: 20,
  },
  subContainer: {
    backgroundColor: "#FFFCFC",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: -10,
  },
  optionsText: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 0,
  },
  btnNext: {
    borderRadius: 100,
    paddingVertical: 13,
    paddingHorizontal: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  btnNextText: {
    color: "white",
    fontSize: 20,
    fontFamily: "MuseoBold",
  },
});

export default Quizzes;
