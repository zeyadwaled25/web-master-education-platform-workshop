import { motion } from 'framer-motion';
import { Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoriteContext';
import CourseCard from '../components/CourseCard/CourseCard';
import { Helmet } from 'react-helmet';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white shadow-sm">
        <Helmet>
          <title>My Favorites - LearnHub</title>
        </Helmet>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          </div>
          <p className="text-gray-600 mt-2">
            {favorites.length} course{favorites.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No favorites yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring courses and add them to your favorites by clicking the heart icon.
            </p>
            <Link
              to="/courses"
              className="btn-blue"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((course, index) => (
              <CourseCard key={course.id || `course-${index}`} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Favorites;