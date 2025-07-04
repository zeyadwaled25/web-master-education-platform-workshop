import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import authImg from "../../assets/images/auth.jpg";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../state/act/actAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authMessage, error, loadingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authMessage?.toLowerCase().includes("success")) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [authMessage, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    otp: Yup.string().required("OTP is required").length(6, "OTP must be 6 digits"),
    newPassword: Yup.string()
      .min(8, "Password too short")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one digit")
      .matches(/[@$!%*?&]/, "Must contain at least one special character")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm your password"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center md:flex-row sm:flex-col"
    >
      <div className="hidden md:block bg-white">
        <img
          src={authImg}
          alt="Reset password illustration"
          className="h-full w-auto"
        />
      </div>

      <div className="bg-white p-8 w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">
          Reset Password
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your OTP and new password to reset your account.
        </p>

        <Formik
          initialValues={{
            email: "",
            otp: "",
            newPassword: "",
            cpassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(resetPassword(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="example@mail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">OTP</label>
                <Field
                  name="otp"
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Enter the 6-digit OTP"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">New Password</label>
                <Field
                  name="newPassword"
                  type="password"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="New password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <Field
                  name="cpassword"
                  type="password"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Re-enter password"
                />
                <ErrorMessage
                  name="cpassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {loadingAuth && <p className="text-blue-500">Resetting password...</p>}
              {authMessage && <p className="text-green-600">{authMessage}</p>}
              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting || loadingAuth}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                {isSubmitting || loadingAuth ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
