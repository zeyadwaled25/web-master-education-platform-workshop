import React from "react";

function UseInitialStates() {
  const initialStateAuth = {
    loadingAuth: false,
    authMessage: "",
    error: "",
    token: localStorage.getItem("token") || "",
  };

  const initialStateLesson = {
    loadingAddLessson: false,
    loadingGetLessonsAdmin: false,
    loadingUpdateLesson: false,
    loadingGetPurchased: false,
    loadingGetLessons: false,
    loadingGetLesson: false,
    loadingDeleteLesson: false,
    loadingpayLesson: false,
    lessonMessage: "",
    paymentUrl: "",
    allLessons: [],
    lessons: [],
    lessonsError: "",

    purchasedLessons: [],
    specificLesson: {},
  };

  const initialStateQuestion = {
    loadingAddQuestion: false,
    loadingEditQuestion: false,
    loadingDeleteQuestion: false,
    loadingGetQuestions: false,
    loadingGetQuestion: false,

    allQuestions: [],
    questionError: "",
    specificQuestion: {},
  };

  return { initialStateAuth, initialStateLesson, initialStateQuestion };
}

export default UseInitialStates;
