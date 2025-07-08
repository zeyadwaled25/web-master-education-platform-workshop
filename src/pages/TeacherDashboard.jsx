import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function TeacherDashboard() {
  const [user, setUser] = useState(null);
  const [examScores, setExamScores] = useState([]);
  const [purchasedLessons, setPurchasedLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(
          "https://edu-master-delta.vercel.app/user/",
          {
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNzZWZob3NzYW0yMDVAZ21haWwuY29tIiwiX2lkIjoiNjdkZTJjMTE2Zjk3NDlkOTUzNGUzODgzIiwiaWF0IjoxNzUxNzczNjQxLCJleHAiOjE3NTE4NjAwNDF9.UReKhSL4JHiJ1-QKCzXKr7JyT_8xM26ZrqNy3CYgCCs",
            },
          }
        );
        setUser(userRes.data.data);

        const examRes = await axios.get(
          "https://edu-master-delta.vercel.app/studentExam/exams/671a785c3fa556fe79e8abc9",
          {
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNzZWZob3NzYW0yMDVAZ21haWwuY29tIiwiX2lkIjoiNjdkZTJjMTE2Zjk3NDlkOTUzNGUzODgzIiwiaWF0IjoxNzUxNzczNjQxLCJleHAiOjE3NTE4NjAwNDF9.UReKhSL4JHiJ1-QKCzXKr7JyT_8xM26ZrqNy3CYgCCs",
            },
          }
        );
        setExamScores(examRes.data.data);

        const lessonRes = await axios.get(
          "https://edu-master-delta.vercel.app/lesson/my/purchased"
        );
        setPurchasedLessons(lessonRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user)
    return <p className="p-8 text-red-500">Failed to load user data.</p>;

  const fgasExams = examScores.filter(
    (exam) => exam.student?.fullName === user.fullName
  );

  const stats = [
    {
      title: "Exams Taken",
      value: fgasExams.length,
      icon: BookOpen,
      iconBg: "bg-primary-100",
      iconColor: "text-primary-600",
      delay: 0.1,
    },
    {
      title: "Completed Exams",
      value: fgasExams.filter((e) => e.isSubmitted).length,
      icon: Award,
      iconBg: "bg-success-100",
      iconColor: "text-success-600",
      delay: 0.2,
    },
    {
      title: "Avg. Score",
      value:
        fgasExams.length > 0
          ? `${Math.round(
              fgasExams.reduce((acc, e) => acc + e.score, 0) / fgasExams.length
            )}%`
          : "0%",
      icon: TrendingUp,
      iconBg: "bg-accent-100",
      iconColor: "text-accent-600",
      delay: 0.3,
    },
    {
      title: "Lessons Purchased",
      value: purchasedLessons.length,
      icon: Clock,
      iconBg: "bg-secondary-100",
      iconColor: "text-secondary-600",
      delay: 0.4,
    },
  ];

  const quickActions = [
    { label: "Browse New Courses", link: "/courses" },
    { label: "View Favorites", link: "/favorites" },
    { label: "Update Profile", link: "/profile" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      <Helmet>
        <title>Teacher Dashboard - LearnHub</title>
        <meta
          name="description"
          content="Manage your courses and track student progress on LearnHub."
        />
      </Helmet>

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center space-x-4">
          <img
            src="https://ui-avatars.com/api/?name=T+D&background=random"
            alt={user.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.fullName}</h1>
            <p className="text-gray-600">
              Track your students' progress and manage your lessons
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: stat.delay }}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between"
          >
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div
              className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}
            >
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Exams & Scores</h2>
          <div className="space-y-4">
            {fgasExams.length > 0 ? (
              fgasExams.slice(0, 10).map((exam, i) => (
                <motion.div
                  key={exam._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{exam.exam?.title}</h3>
                      <p className="text-sm text-gray-500">
                        Student: {exam.student?.fullName}
                      </p>
                    </div>
                    <p
                      className={`font-bold ${
                        exam.score >= 50 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {exam.score}%
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No exams found.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Purchased Lessons</h2>
          <div className="space-y-4">
            {purchasedLessons.length > 0 ? (
              purchasedLessons.slice(0, 5).map((lesson, i) => (
                <motion.div
                  key={lesson._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">
                    Scheduled: {new Date(lesson.scheduledDate).toDateString()}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No purchased lessons found.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                to={action.link}
                className="block px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-50"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TeacherDashboard;
