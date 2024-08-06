import React, { createContext, useReducer, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const QuizStateContext = createContext();
const QuizDispatchContext = createContext();

const initialState = {
  currentQuestionIndex: 0,
  score: 0,
  currentOptionSelected: null,
  correctAnswers: [],
  wrongAnswers: [],
  nonAnsweredQuestions: [],
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_QUESTION_INDEX":
      return { ...state, currentQuestionIndex: action.payload };
    case "SET_SCORE":
      return { ...state, score: action.payload };
    case "SET_CURRENT_OPTION_SELECTED":
      return { ...state, currentOptionSelected: action.payload };
    case "ADD_CORRECT_ANSWER":
      return {
        ...state,
        correctAnswers: [...state.correctAnswers, action.payload],
      };
    case "ADD_WRONG_ANSWER":
      return {
        ...state,
        wrongAnswers: [...state.wrongAnswers, action.payload],
      };
    case "ADD_NON_ANSWERED":
      return {
        ...state,
        nonAnsweredQuestions: [...state.nonAnsweredQuestions, action.payload],
      };
    case "SET_CORRECT_ANSWERS":
      return { ...state, correctAnswers: action.payload };
    case "SET_WRONG_ANSWERS":
      return { ...state, wrongAnswers: action.payload };
    case "SET_NON_ANSWERED_QUESTIONS":
      return { ...state, nonAnsweredQuestions: action.payload };
    case "RESET_QUIZ":
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const correct = await getData("correctAnswers");
      const wrong = await getData("wrongAnswers");
      const nonAnswered = await getData("nonAnsweredQuestions");

      dispatch({ type: "SET_CORRECT_ANSWERS", payload: correct || [] });
      dispatch({ type: "SET_WRONG_ANSWERS", payload: wrong || [] });
      dispatch({
        type: "SET_NON_ANSWERED_QUESTIONS",
        payload: nonAnswered || [],
      });
    };

    fetchData();
  }, []);

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={{ dispatch, storeData }}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  );
};

export const useQuizState = () => useContext(QuizStateContext);
export const useQuizDispatch = () => useContext(QuizDispatchContext);
