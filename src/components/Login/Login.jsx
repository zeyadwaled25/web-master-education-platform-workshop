import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../state/act/actAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authImg from "../../assets/images/auth.jpg";
import { motion } from "framer-motion";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password too short")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one digit")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .required("Password is required"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingAuth, authMessage, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authMessage?.toLowerCase().includes("success")) {
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  }, [authMessage, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen md:flex-row flex items-center justify-center sm:flex-col"
    >
      <div className="bg-white">
        <img src={authImg} alt="Login illustration" />
      </div>
      <div className="bg-white p-8 w-full">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            dispatch(logIn(values));
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {loadingAuth && <p className="text-blue-500">Logging in...</p>}
              {authMessage && <p className="text-green-600">{authMessage}</p>}
              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg cursor-pointer"
              >
                Log in
              </button>
              <h3 className="text-center">
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-blue-600 cursor-pointer"
                >
                  Forgot password?
                </span>
              </h3>

              <h3 className="text-center">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 cursor-pointer"
                >
                  Sign up
                </span>
              </h3>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}

export default Login;
