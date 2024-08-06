import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import metaData from "../db.json";
import { useQuizState } from "@/components/QuizContext";

const Questions = () => {
  const { correctAnswers, wrongAnswers, nonAnsweredQuestions } = useQuizState();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const updatedQuestions = metaData.quizQuestions.map((question) => {
      if (correctAnswers.includes(question.question)) {
        return { ...question, status: "correct" };
      } else if (wrongAnswers.includes(question.question)) {
        return { ...question, status: "wrong" };
      } else {
        return { ...question, status: "waiting" };
      }
    });

    setQuestions(updatedQuestions);
  }, [correctAnswers, wrongAnswers, nonAnsweredQuestions]);

  const handleQuestionPress = (status) => {
    if (status === "correct") {
      console.log("Correct answer pressed");
    } else if (status === "wrong") {
      console.log("Wrong answer pressed");
    } else {
      console.log("Non answered answer pressed");
    }
  };

  const renderItem = ({ item, index }) => (
    <QuestionItem
      question={item}
      index={index}
      onPress={() => handleQuestionPress(item.status)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nameText}>Hi 👋, this is your score</Text>
      </View>
      <View style={{ marginTop: 80 }}>
        <FlatList
          data={questions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const QuestionItem = ({ question, index, onPress }) => {
  let backgroundColor;
  let statusText;
  let statusWidth;
  let statusContainerBackgroundColor;

  switch (question.status) {
    case "correct":
      backgroundColor = "rgba(0, 211, 59, 0.15)";
      statusText = "Correct";
      statusContainerBackgroundColor = "#2ECC71";
      statusWidth = 52;
      break;
    case "wrong":
      backgroundColor = "rgba(255, 17, 0, 0.1)";
      statusText = "Wrong";
      statusContainerBackgroundColor = "#EE5253";
      statusWidth = 48;
      break;
    default:
      backgroundColor = "rgba(241, 238, 238, 1)";
      statusText = "Waiting";
      statusContainerBackgroundColor = "#C2C1C1";
      statusWidth = 65;
      break;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.questionItem, { backgroundColor }]}>
        <View
          style={{
            backgroundColor: "white",
            width: 34,
            height: 34,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              fontFamily: "MuseoBold",
              fontSize: 16,
            }}
          >
            {index + 1}
          </Text>
        </View>
        <View style={{ width: 200 }}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>
        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: statusContainerBackgroundColor,
              width: statusWidth,
            },
          ]}
        >
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
  questionItem: {
    padding: 20,
    marginVertical: 5,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  questionText: {
    color: "black",
    fontSize: 13,
    fontFamily: "MuseoBold",
    textAlign: "left",
  },
  statusContainer: {
    borderRadius: 100,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    fontSize: 11,
    color: "#fff",
    fontFamily: "MuseoBold",
  },
});

export default Questions;
