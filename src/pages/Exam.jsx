import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const AdminExamPanel = () => {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    classLevel: "", 
    isPublished: false,
    startDate: "",
    endDate: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchExams = async () => {
    try {
      const res = await axios.get("https://edu-master-delta.vercel.app/exam", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setExams(res.data.data);
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        duration: Number(form.duration),
        startDate: form.startDate.slice(0, 10),
        endDate: form.endDate.slice(0, 10),
      };

      const url = editingId
        ? `https://edu-master-delta.vercel.app/exam/${editingId}`
        : "https://edu-master-delta.vercel.app/exam";

      const method = editingId ? axios.put : axios.post;

      await method(url, payload, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      fetchExams();
      setForm({
        title: "",
        description: "",
        duration: "",
        classLevel: "",
        isPublished: false,
        startDate: "",
        endDate: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error("Failed to submit exam", err);
    }
  };

  const handleEdit = (exam) => {
    setEditingId(exam._id);
    setForm({
      title: exam.title,
      description: exam.description,
      duration: exam.duration,
      classLevel: exam.classLevel,
      isPublished: exam.isPublished,
      startDate: exam.startDate?.slice(0, 16),
      endDate: exam.endDate?.slice(0, 16),
    });
  };
  const handleDelete = async (examId) => {
    try {
      await axios.delete(`https://edu-master-delta.vercel.app/exam/${examId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      fetchExams();
    } catch (err) {
      console.error("Failed to delete exam", err);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white p-10"
    >
      {/* Form */}
      <div className="max-w-lg mx-auto mb-20 mt-10">
        <div className="bg-white p-6 rounded-xl shadow-xl border border-blue-200">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            📝 Exam Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border-b border-blue-400 p-1 w-full focus:outline-none"
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border-b border-blue-400 p-0 w-full focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Duration (mins)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="border-b border-blue-400 p-1 w-full focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Class Level"
              value={form.classLevel}
              onChange={(e) => setForm({ ...form, classLevel: e.target.value })}
              className="border-b border-blue-400 p-1 w-full focus:outline-none"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="datetime-local"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="border-b border-blue-400 p-2 w-full focus:outline-none"
              />
              <input
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="border-b border-blue-400 p-2 w-full focus:outline-none"
              />
            </div>

            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) =>
                  setForm({ ...form, isPublished: e.target.checked })
                }
              />
              <span className="text-sm text-gray-700">Published</span>
            </label>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              {editingId ? "Update Exam" : "Add Exam"}
            </button>
          </form>
        </div>
      </div>

      {/* Exam List */}
      <div className="max-w-5xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-blue-800">📋 Exam List</h2>
        {exams.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {exams.map((exam) => (
              <motion.div
                key={exam._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-blue-100 p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-700">
                      {exam.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {exam.description}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      ⏱ {exam.duration} mins | 🎓 {exam.classLevel}
                    </p>
                  </div>
                  <div className="flex flex-col mt-4 gap-2">
                    <button
                      onClick={() => handleEdit(exam)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      <Pencil size={16} /> Edit
                    </button>

                    <Link
                      to={`/exams/${exam._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      Add Questions
                    </Link>
                    <button
                      onClick={() => handleDelete(exam._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No exams found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AdminExamPanel;
