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

  const initialStateExam = {
    loadingAddExam: false,
    loadingEditExam: false,
    loadingDeleteExam: false,
    loadingGetExams: false,
    loadingGetExam: false,

    allExams: [],
    examError: "",
    specificExam: {},
  };
  const initialStateStudentExam = {
    loadingStartExam: false,
    loadingSubmitExam: false,
    loadingGetRemainingTime: false,
    loadingGetExamScoreAdmin: false,
    loadingGetExamScoreStudent: false,
    adminExamsScore: [],
    specificExamScore: {},
    studentScore: {},
    studentExamError: "",
    remainingTime: {},
  };
  return {
    initialStateAuth,
    initialStateLesson,
    initialStateQuestion,
    initialStateExam,
    initialStateStudentExam,
  };
}

export default UseInitialStates;
