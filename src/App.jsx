import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";

// Layout + Auth Pages
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

// Main Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoriteContext";
import CourseDetails from "./pages/CourseDetails";
import Checkout from "./pages/Checkout";

function AppWrapper() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root based on token */}
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

        {/* Auth pages (no navbar/footer) */}
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Main pages with Layout (navbar + footer) */}
        <Route
          element={token ? <Layout /> : <Navigate to="/login" replace />}
        >
                 

          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/checkout/:courseId" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
    <FavoritesProvider>
      <AppWrapper />
    </FavoritesProvider>
    </Provider>
  );
}

export default App;
