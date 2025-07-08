import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "../context/FavoriteContext";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import {
  Award,
  Heart,
  Play,
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
  GraduationCap,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getLesson } from "../state/act/actLessons";

const CourseDetails = () => {
  const { id } = useParams();
  const [expandedSection, setExpandedSection] = useState("content");
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { specificLesson, loadingGetLesson } = useSelector(
    (state) => state.lessons
  );
  const [purchased, setPurchased] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLesson({ lessonId: id }))
      .unwrap()
      .then(() => {
        setPurchased(true);
      })
      .catch((error) => {
        console.log("error", error);
        if (error.status === 403) {
          console.log(error.status);
          setPurchased(false);
        }
      });
  }, [id, dispatch]);

  if (loadingGetLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!purchased) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            You have not purchased this course yet
          </h2>
          <Link to="/courses" className="text-blue-600">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (!specificLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Course Not Found
          </h2>
          <Link to="/courses" className="text-blue-600">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(specificLesson._id);

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFromFavorites(specificLesson._id);
    } else {
      addToFavorites(specificLesson);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(specificLesson.video);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Helmet>
          <title>{specificLesson.title} - LearnHub</title>
          <meta name="description" content={specificLesson.description} />
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {specificLesson.classLevel}
                </span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {specificLesson.isPaid ? 'Paid' : 'Free'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {specificLesson.title}
              </h1>
              <p className="text-xl mb-6 text-blue-100">
                {specificLesson.description}
              </p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">
                    Scheduled: {formatDate(specificLesson.scheduledDate)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span className="text-sm">{specificLesson.classLevel}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-6 w-6" />
                  <span className="text-3xl font-bold">${specificLesson.price}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={specificLesson.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-600 rounded-lg shadow-lg flex items-center justify-center">
                  <Play className="h-16 w-16 text-white" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <a
                  href={specificLesson.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <a
                href={specificLesson.video}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Watch Video
              </a>
              <button
                onClick={handleFavoriteClick}
                className={`p-3 rounded-lg transition-colors ${
                  favorited
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${favorited ? "fill-current" : ""}`}
                />
              </button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Scheduled: {formatDate(specificLesson.scheduledDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>Certificate included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === "content" ? "" : "content"
                  )
                }
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900">
                  Lesson Content
                </h2>
                {expandedSection === "content" ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedSection === "content" && (
                <div className="mt-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Play className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {specificLesson.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Video Lesson • {specificLesson.classLevel}
                        </p>
                      </div>
                    </div>
                    <a
                      href={specificLesson.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Play className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What You'll Learn
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">
                    Understand the fundamental concepts of ratios and proportions
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">
                    Learn how to apply ratios and proportions in real-world scenarios
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">
                    Master cross multiplication techniques for solving proportion problems
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">
                    Build confidence in mathematical problem-solving skills
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Lesson Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Class Level</h3>
                  <p className="text-gray-600">{specificLesson.classLevel}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Price</h3>
                  <p className="text-gray-600">${specificLesson.price}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Scheduled Date</h3>
                  <p className="text-gray-600">{formatDate(specificLesson.scheduledDate)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Access Type</h3>
                  <p className="text-gray-600">{specificLesson.isPaid ? 'Paid Access' : 'Free Access'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                This lesson includes:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Play className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Video lesson content</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Scheduled learning session</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Certificate of completion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Grade-level appropriate content</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Share this lesson
              </h3>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseDetails;