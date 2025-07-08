import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./state/store";
import { FavoritesProvider } from "./context/FavoriteContext";
import { ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import AdminExamPanel from "./pages/Exam";
import AdminQuestionPanel from "./pages/Question";

const Layout = lazy(() => import("./components/Layout/Layout"));
const Register = lazy(() => import("./components/Register/Register"));
const Login = lazy(() => import("./components/Login/Login"));
const ForgotPassword = lazy(() =>
  import("./components/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./components/ResetPassword/ResetPassword")
);

const Home = lazy(() => import("./pages/Home"));
const Courses = lazy(() => import("./pages/Courses"));
const About = lazy(() => import("./pages/About"));
const Favorites = lazy(() => import("./pages/Favorites"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const AddCourse = lazy(() => import("./pages/AddCourse"));
const EditCourse = lazy(() => import("./pages/EditCourse"));

// Optional: a simple fallback UI
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen text-xl">
    Loading...
  </div>
);

function AppWrapper() {
  const { token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/signup" replace />
              )
            }
          />

          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            element={token ? <Layout /> : <Navigate to="/login" replace />}
          >
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/courses/edit/:id" element={<EditCourse />} />
            <Route path="/courses/add" element={<AddCourse />} />
            <Route path="/checkout/:courseId" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/exams" element={<AdminExamPanel />} />
            <Route path="/exams/:id" element={<AdminQuestionPanel />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <FavoritesProvider>
        <ToastContainer />
        <AppWrapper />
      </FavoritesProvider>
    </Provider>
  );
}

export default App;
