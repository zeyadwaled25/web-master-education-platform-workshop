import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Clock, Heart } from 'lucide-react';
import { useFavorites } from '../../context/FavoriteContext';

const CourseCard = ({ course, index = 0 }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorited = isFavorite(course.id || 'unknown');

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorited) {
      removeFromFavorites(course.id || 'unknown');
    } else {
      addToFavorites(course);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="card card-hover group relative"
    >
      <Link to={`/courses/${course.id || 'unknown'}`}>
        <div className="relative">
          <img 
            src={course.image || 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'} 
            alt={course.title || 'Course'}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {course.level || 'All Levels'}
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 left-2 p-2 rounded-full transition-colors duration-200 ${
              favorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="py-6 px-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {course.category || 'Uncategorized'}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{course.rating || 'N/A'}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {course.title || 'Untitled Course'}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {course.description || 'No description available'}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.students ? course.students.toLocaleString() : '0'} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration || 'N/A'}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">${course.price || 0}</span>
              {course.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
              )}
            </div>
            <span className="text-sm text-gray-600">by {course.instructor || 'Unknown'}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;