import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockCourses } from '../data/testData';
import { useFavorites } from '../context/FavoriteContext';
import RatingStars from '../components/RatingStars/RatingStars';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';


import { 
  Star, 
  Users, 
  Clock, 
  Award, 
  Heart, 
  Play, 
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Helmet } from 'react-helmet';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState('content');
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCourse = mockCourses.find(c => c.id === parseInt(id));
      setCourse(foundCourse);
      setLoading(false);
    }, 1000);
  }, [id]);

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
          <Link to="/courses" className="text-blue-600">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const favorited = isFavorite(course.id);

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFromFavorites(course.id);
    } else {
      addToFavorites(course);
    }
  };

  const relatedCourses = mockCourses.filter(c => 
    c.id !== course.id && c.category === course.category
  ).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Helmet>
          <title>{course.title} - LearnHub</title>
          <meta name="description" content={course.description} />
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {course.title}
              </h1>
              <p className="text-xl mb-6 text-blue-100">
                {course.description}
              </p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <RatingStars rating={course.rating} size="md" />
                  <span className="text-sm">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm">{course.duration}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-xl text-blue-200 line-through">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-sm text-blue-100">by {course.instructor}</span>
              </div>
            </div>
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <Play className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <Link
                to={`/checkout/${course.id}`}
                className="border rounded-lg border-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg"
              >
                Enroll Now
              </Link>
              <button
                onClick={handleFavoriteClick}
                className={`p-3 rounded-lg transition-colors ${
                  favorited
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{course.students.toLocaleString()} enrolled</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>Certificate included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                onClick={() => setExpandedSection(expandedSection === 'content' ? '' : 'content')}
                className="w-full flex items-center justify-between text-left"
              >
                <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
                {expandedSection === 'content' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedSection === 'content' && (
                <div className="mt-6 space-y-4">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-500">{lesson.type} • {lesson.duration}</p>
                        </div>
                      </div>
                      <Play className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-shrink-0 w-5 h-5 bg-success-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {course.instructor.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{course.instructor}</h3>
                  <p className="text-gray-600">Senior Software Engineer</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.9 instructor rating</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">15,000+ students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Course Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This course includes:</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, text: `${course.duration} on-demand video` },
                  { icon: Download, text: 'Downloadable resources' },
                  { icon: Award, text: 'Certificate of completion' },
                  { icon: Users, text: 'Full lifetime access' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this course</h3>
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

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse, index) => (
                <div key={relatedCourse.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={relatedCourse.image}
                    alt={relatedCourse.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{relatedCourse.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{relatedCourse.instructor}</p>
                    <div className="flex items-center justify-between">
                      <RatingStars rating={relatedCourse.rating} size="sm" />
                      <span className="text-lg font-bold text-blue-600">${relatedCourse.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseDetails;