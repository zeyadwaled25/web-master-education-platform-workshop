import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Star,
} from "lucide-react";
import CourseCard from "../components/CourseCard/CourseCard";
import { mockCourses, mockTestimonials } from "../data/testData";
import { Helmet } from "react-helmet";

const Home = () => {
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <Helmet>
          <title>Home - LearnHub</title>
          <meta
            name="description"
            content="Discover a variety of courses to enhance your skills and advance your career."
          />
        </Helmet>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Learn Without
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-200">
                Limits
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Unlock your potential with expert-led courses in technology,
              design, and business. Start your learning journey today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Students", value: "50,000+" },
              { icon: BookOpen, label: "Courses", value: "1,200+" },
              { icon: Award, label: "Certificates", value: "25,000+" },
              { icon: TrendingUp, label: "Success Rate", value: "98%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses taught by industry experts
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View All Courses
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LearnHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best learning experience with cutting-edge
              technology and expert instruction
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Expert Instructors",
                description:
                  "Learn from industry professionals with years of real-world experience.",
              },
              {
                icon: Users,
                title: "Community Support",
                description:
                  "Join a vibrant community of learners and get help when you need it.",
              },
              {
                icon: Award,
                title: "Certificates",
                description:
                  "Earn recognized certificates to showcase your skills to employers.",
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description:
                  "Advance your career with skills that are in high demand.",
              },
              {
                icon: Star,
                title: "Quality Content",
                description:
                  "Access high-quality, up-to-date content designed for maximum learning.",
              },
              {
                icon: ArrowRight,
                title: "Flexible Learning",
                description:
                  "Learn at your own pace with lifetime access to course materials.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our successful
              students
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
