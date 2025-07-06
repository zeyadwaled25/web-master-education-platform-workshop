import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Lock, Check, Clock, Users, Star } from "lucide-react";
import { mockCourses } from "../data/testData";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCourse = mockCourses.find((c) => c.id === parseInt(courseId));
      setCourse(foundCourse);
      setLoading(false);
    }, 1000);
  }, [courseId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h2>
          <Link to="/courses" className="btn-blue">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            You've successfully enrolled in "{course.title}". You can now access
            all course content.
          </p>
          <div className="space-y-3">
            <Link
              to={`/courses/${course.id}`}
              className="block w-full btn-blue"
            >
              Go to Course
            </Link>
            <Link to="/dashboard" className="block w-full btn-outline">
              View Dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - LearnHub</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Complete Your Purchase
            </h1>
            <p className="text-gray-600 mt-2">
              Secure checkout with 30-day money-back guarantee
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Course Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Course Summary
              </h2>

              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {course.instructor}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Course Price:</span>
                  <span className="font-semibold">${course.price}</span>
                </div>
                {course.originalPrice && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Original Price:</span>
                    <span className="text-gray-400 line-through">
                      ${course.originalPrice}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${course.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-success-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-success-600" />
                  <span className="text-success-800 font-medium">
                    30-day money-back guarantee
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Lock className="h-5 w-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Information
                </h2>
              </div>

              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    <CreditCard className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St, City, State 12345"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="save-card"
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="save-card" className="text-sm text-gray-700">
                    Save this card for future purchases
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={processingPayment}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    processingPayment
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {processingPayment ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Complete Purchase - $${course.price}`
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By completing your purchase, you agree to our Terms of Service
                  and Privacy Policy. Your payment is secured with 256-bit SSL
                  encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Checkout;
