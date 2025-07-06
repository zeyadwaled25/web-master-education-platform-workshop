// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Filter } from 'lucide-react';
// import CourseCard from '../components/CourseCard/CourseCard';
// import SearchBar from '../components/SearchBar/SearchBar';
// import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
// import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
// import { mockCourses, mockCategories } from '../data/testData';
// import { Helmet } from 'react-helmet';

 
// const Courses = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [priceRange, setPriceRange] = useState('all');
//   const [rating, setRating] = useState(0);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setCourses(mockCourses);
//       setFilteredCourses(mockCourses);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     filterCourses();
//   }, [courses, searchQuery, selectedCategory, priceRange, rating]);

//   const filterCourses = () => {
//     let filtered = [...courses];

//     // Search filter
//     if (searchQuery) {
//       filtered = filtered.filter(course =>
//         course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Category filter
//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter(course => course.category === selectedCategory);
//     }

//     // Price filter
//     if (priceRange !== 'all') {
//       switch (priceRange) {
//         case 'free':
//           filtered = filtered.filter(course => course.price === 0);
//           break;
//         case 'paid':
//           filtered = filtered.filter(course => course.price > 0);
//           break;
//         case 'under50':
//           filtered = filtered.filter(course => course.price < 50);
//           break;
//         case '50to100':
//           filtered = filtered.filter(course => course.price >= 50 && course.price <= 100);
//           break;
//         case 'over100':
//           filtered = filtered.filter(course => course.price > 100);
//           break;
//       }
//     }

//     // Rating filter
//     if (rating > 0) {
//       filtered = filtered.filter(course => course.rating >= rating);
//     }

//     setFilteredCourses(filtered);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="xl" />
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen bg-gray-50"
//     >
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <Helmet>
//           <title>All Courses - LearnHub</title>
//           <meta name="description" content="Explore a wide range of courses to enhance your skills and knowledge. Find courses in various categories including web development, data science, design, and more." />
//         </Helmet>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="mb-4 md:mb-0">
//               <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
//               <p className="text-gray-600 mt-2">
//                 Discover {filteredCourses.length} courses to boost your skills
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <SearchBar onSearch={handleSearch} />
//               <button
//                 onClick={() => setIsFilterOpen(true)}
//                 className="btn-outline  flex items-center space-x-2"
//               >
//                 <Filter className="h-4 w-4" />
//                 <span>Filter</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filter Sidebar for all screens (triggered via button) */}
//       <FilterSidebar
//         categories={mockCategories}
//         selectedCategory={selectedCategory}
//         onCategoryChange={setSelectedCategory}
//         priceRange={priceRange}
//         onPriceChange={setPriceRange}
//         rating={rating}
//         onRatingChange={setRating}
//         isOpen={isFilterOpen}
//         onClose={() => setIsFilterOpen(false)}
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Course Grid */}
//         <div>
//           {filteredCourses.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
//             </div>
//           ) : (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredCourses.map((course, index) => (
//                 <CourseCard key={course.id} course={course} index={index} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Courses;
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Helmet } from 'react-helmet';

import CourseCard from '../components/CourseCard/CourseCard';
import SearchBar from '../components/SearchBar/SearchBar';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

import { getLessons } from '../state/act/actLessons';

const Courses = () => {
  const dispatch = useDispatch();

  // Redux state
const { lessons, loadingGetLessons, lessonsError } = useSelector(state => state.lessons);

  // UI states
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [rating, setRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch lessons from backend
  useEffect(() => {
    dispatch(getLessons());
  }, [dispatch]);

  // Filter lessons whenever dependencies change
  useEffect(() => {
    if (lessons?.length) {
      filterCourses();
    }
  }, [lessons, searchQuery, selectedCategory, priceRange, rating]);

  const filterCourses = () => {
    let filtered = [...lessons];

    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'free':
          filtered = filtered.filter(course => course.price === 0);
          break;
        case 'paid':
          filtered = filtered.filter(course => course.price > 0);
          break;
        case 'under50':
          filtered = filtered.filter(course => course.price < 50);
          break;
        case '50to100':
          filtered = filtered.filter(course => course.price >= 50 && course.price <= 100);
          break;
        case 'over100':
          filtered = filtered.filter(course => course.price > 100);
          break;
      }
    }

    if (rating > 0) {
      filtered = filtered.filter(course => course.rating >= rating);
    }

    setFilteredCourses(filtered);
  };

  const handleSearch = (query) => setSearchQuery(query);

  if (loadingGetLessons) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (lessonsError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Error: {lessonsError}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>All Courses - LearnHub</title>
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
              <p className="text-gray-600 mt-2">
                Discover {filteredCourses.length} courses to boost your skills
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar onSearch={handleSearch} />
              <button
                onClick={() => setIsFilterOpen(true)}
                className="btn-outline flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
categories={lessons && lessons.length > 0 ? [...new Set(lessons.map(l => l.category))] : []}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        rating={rating}
        onRatingChange={setRating}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Course Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Cours eCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Courses;
