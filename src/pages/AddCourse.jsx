import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  DollarSign,
  GraduationCap,
  FileText,
  Video,
  Plus,
  AlertCircle,
} from "lucide-react";
import { addLesson } from "../state/act/actLessons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const dispatch = useDispatch();

  const { loadingAddLessson, lessonsError } = useSelector((state) => ({
    loadingAddLessson: false,
    lessonsError: null,
  }));
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must not exceed 100 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must not exceed 500 characters")
      .required("Description is required"),
    video: Yup.string()
      .url("Please enter a valid URL")
      .matches(
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
        "Please enter a valid YouTube URL"
      )
      .required("Video URL is required"),
    classLevel: Yup.string().required("Class level is required"),
    scheduledDate: Yup.date()
      .min(new Date(), "Scheduled date must be in the future")
      .required("Scheduled date is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .min(1, "Price must be at least 1")
      .max(1000, "Price must not exceed 1000")
      .required("Price is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      video: "",
      classLevel: "",
      scheduledDate: "",
      price: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const lessonData = {
        ...values,
        price: Number(values.price),
      };

      dispatch(addLesson(lessonData))
        .unwrap()
        .then(() => {
          resetForm();
          toast("Course Added Successfully");
          navigate("/courses");
        })
        .catch(() => {})
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const classLevels = [
    "Grade 1 Secondary",
    "Grade 2 Secondary",
    "Grade 3 Secondary",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Add New Lesson
            </h1>
            <p className="text-gray-600">
              Create a new lesson for your students
            </p>
          </div>

          {lessonsError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{lessonsError}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Lesson Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter lesson title"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  formik.touched.title && formik.errors.title
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.title}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe the lesson content and objectives"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                  formik.touched.description && formik.errors.description
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.description}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="video"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Video className="w-4 h-4 inline mr-2" />
                Video URL
              </label>
              <input
                id="video"
                name="video"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  formik.touched.video && formik.errors.video
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("video")}
              />
              {formik.touched.video && formik.errors.video && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.video}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="classLevel"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <GraduationCap className="w-4 h-4 inline mr-2" />
                Class Level
              </label>
              <select
                id="classLevel"
                name="classLevel"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  formik.touched.classLevel && formik.errors.classLevel
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("classLevel")}
              >
                <option value="">Select class level</option>
                {classLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {formik.touched.classLevel && formik.errors.classLevel && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.classLevel}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="scheduledDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Scheduled Date
              </label>
              <input
                id="scheduledDate"
                name="scheduledDate"
                type="date"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  formik.touched.scheduledDate && formik.errors.scheduledDate
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("scheduledDate")}
              />
              {formik.touched.scheduledDate && formik.errors.scheduledDate && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.scheduledDate}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <DollarSign className="w-4 h-4 inline mr-2" />
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="50"
                min="1"
                max="1000"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  formik.touched.price && formik.errors.price
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors.price}
                </p>
              )}
            </div>
            <div className="pt-6">
              <button
                type="button"
                onClick={formik.handleSubmit}
                disabled={
                  formik.isSubmitting || loadingAddLessson || !formik.isValid
                }
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  formik.isSubmitting || loadingAddLessson || !formik.isValid
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                {formik.isSubmitting || loadingAddLessson ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Lesson...
                  </div>
                ) : (
                  "Create Lesson"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
