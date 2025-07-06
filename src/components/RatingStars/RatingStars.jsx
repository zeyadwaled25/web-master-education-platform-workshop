import { Star } from 'lucide-react';

const RatingStars = ({ rating, size = 'sm', showRating = true }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      {showRating && (
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      )}
    </div>
  );
};

export default RatingStars;