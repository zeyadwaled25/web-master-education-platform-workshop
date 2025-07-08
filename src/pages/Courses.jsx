import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { Helmet } from "react-helmet";

import CourseCard from "../components/CourseCard/CourseCard";
import SearchBar from "../components/SearchBar/SearchBar";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { getLessons } from "../state/act/actLessons";
import { Link } from "react-router-dom";

const Courses = () => {
  const dispatch = useDispatch();

  const { lessons, loadingGetLessons, lessonsError } = useSelector(
    (state) => state.lessons
  );
  console.log("lessons", lessons);
  const [filteredLessons, setFilteredLessons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedClassLevel, setSelectedClassLevel] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(getLessons());
  }, [dispatch]);

  useEffect(() => {
    if (lessons?.length) {
      filterLessons();
    }
  }, [lessons, searchQuery, selectedCategory, priceRange, selectedClassLevel]);

  const filterLessons = () => {
    let filtered = [...lessons];
    if (searchQuery) {
      filtered = filtered.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          lesson.classLevel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedClassLevel !== "All") {
      filtered = filtered.filter(
        (lesson) => lesson.classLevel === selectedClassLevel
      );
    }
    if (priceRange !== "all") {
      switch (priceRange) {
        case "free":
          filtered = filtered.filter((lesson) => lesson.price === 0);
          break;
        case "paid":
          filtered = filtered.filter((lesson) => lesson.price > 0);
          break;
        case "under50":
          filtered = filtered.filter((lesson) => lesson.price < 50);
          break;
        case "50to100":
          filtered = filtered.filter(
            (lesson) => lesson.price >= 50 && lesson.price <= 100
          );
          break;
        case "over100":
          filtered = filtered.filter((lesson) => lesson.price > 100);
          break;
      }
    }

    setFilteredLessons(filtered);
  };

  const handleSearch = (query) => setSearchQuery(query);
  const getUniqueClassLevels = () => {
    if (!lessons || lessons.length === 0) return [];
    return [...new Set(lessons?.map((lesson) => lesson.classLevel))].sort();
  };

  const transformLessonToCourse = (lesson) => ({
    id: lesson._id,
    title: lesson.title,
    description: lesson.description,
    price: lesson.price,
    originalPrice: lesson.originalPrice || null,
    image:
      lesson.thumbnail || getYouTubeVideoId(lesson.video)
        ? `https://img.youtube.com/vi/${getYouTubeVideoId(
            lesson.video
          )}/maxresdefault.jpg`
        : "/api/placeholder/400/300",
    category: lesson.classLevel,
    level: lesson.isPaid ? "Paid" : "Free",
    duration: "Video Lesson",
    rating: lesson.rating || 4.5,
    students: lesson.enrolledStudents || 0,
    instructor: lesson.instructor || "LearnHub Instructor",
    features: lesson.features || [],
    lessons: [
      {
        id: lesson._id,
        title: lesson.title,
        type: "Video",
        duration: "Watch Video",
      },
    ],
    scheduledDate: lesson.scheduledDate,
    isPaid: lesson.isPaid,
    video: lesson.video,
  });

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

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
        <title>All Lessons - LearnHub</title>
        <meta
          name="description"
          content="Explore a wide range of lessons to enhance your skills and knowledge. Find lessons across different grade levels and subjects."
        />
      </Helmet>
      <Link to="/courses/add">Add Course</Link>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">All Lessons</h1>
              <p className="text-gray-600 mt-2">
                Discover {filteredLessons.length} lessons to boost your skills
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

      <FilterSidebar
        categories={["All", ...getUniqueClassLevels()]}
        selectedCategory={selectedClassLevel}
        onCategoryChange={setSelectedClassLevel}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        rating={0}
        onRatingChange={() => {}}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        showRatingFilter={false}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredLessons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No lessons found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLessons?.map((lesson, index) => (
              <CourseCard
                key={lesson._id}
                course={transformLessonToCourse(lesson)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Courses;
