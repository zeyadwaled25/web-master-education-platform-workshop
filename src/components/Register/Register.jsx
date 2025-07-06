import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../state/act/actAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authImg from "../../assets/images/auth.jpg";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password too short")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one digit")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  classLevel: Yup.string().required("Class level is required"),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loadingAuth, authMessage, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (authMessage?.toLowerCase().includes("success")) {
      setTimeout(() => {
        navigate("/login");
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
        <Helmet>
          <title>LearnHub - Register</title>
        </Helmet>
        <img src={authImg} alt="" />
      </div>
      <div className="bg-white p-8 w-full">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          Create an Account
        </h2>

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            cpassword: "",
            classLevel: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            dispatch(signUp(values));
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <Field
                  name="fullName"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

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
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <Field
                  name="phoneNumber"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="phoneNumber"
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

              <div>
                <label className="block text-sm font-medium">
                  Confirm Password
                </label>
                <Field
                  name="cpassword"
                  type="password"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage
                  name="cpassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Class Level</label>
                <Field
                  name="classLevel"
                  as="select"
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="">Select Level</option>
                  <option value="Grade 1 Secondary">Grade 1 Secondary</option>
                  <option value="Grade 2 Secondary">Grade 2 Secondary</option>
                  <option value="Grade 3 Secondary">Grade 3 Secondary</option>
                </Field>
                <ErrorMessage
                  name="classLevel"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {loadingAuth && <p className="text-blue-500">Signing up...</p>}
              {authMessage && <p className="text-green-600">{authMessage}</p>}
              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg cursor-pointer"
                disabled={loadingAuth}
              >
                Sign up
              </button>
              <h3 className="text-center ">
                Already a user?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-600 cursor-pointer"
                >
                  Log in
                </span>
              </h3>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}

export default Register;
