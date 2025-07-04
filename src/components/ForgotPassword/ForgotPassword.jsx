import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import authImg from "../../assets/images/auth.jpg"; 

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center md:flex-row sm:flex-col"
    >
      <div className="hidden md:block bg-white">
        <img src={authImg} alt="Forgot password illustration" className="h-full w-auto" />
      </div>

      <div className="bg-white p-8 w-full">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Forgot Password</h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await axios.post(
                "https://edu-master-delta.vercel.app/user/forgot-password",
                values
              );
              setMessage(res.data.message || "Check your email for reset link.");
              setError("");
            } catch (err) {
              setError(err.response?.data?.message || "Something went wrong");
              setMessage("");
            }
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
                  placeholder="example@mail.com"
                  className="mt-1 p-2 w-full border rounded"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {message && <p className="text-green-600">{message}</p>}
              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
