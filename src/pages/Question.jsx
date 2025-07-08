import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const AdminQuestionPanel = () => {
  const { id: examId } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    text: "",
    type: "multiple-choice",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 1,
  });

  const fetchExam = async () => {
    try {
      const res = await axios.get(
        `https://edu-master-delta.vercel.app/exam/get/${examId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setExam(res.data.data);
    } catch (err) {
      console.error("Failed to fetch exam details", err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        "https://edu-master-delta.vercel.app/question",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setQuestions(res.data.data.filter((q) => q.exam === examId));
    } catch (err) {
      console.error("Failed to fetch questions", err);
    }
  };

  useEffect(() => {
    fetchExam();
    fetchQuestions();
  }, [examId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      text: form.text,
      type: form.type,
      correctAnswer: form.correctAnswer,
      points: form.points,
      exam: examId,
    };

    if (form.type === "multiple-choice") {
      dataToSend.options = form.options;
    }

    try {
      await axios.post(
        "https://edu-master-delta.vercel.app/question",
        dataToSend,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setForm({
        text: "",
        type: "multiple-choice",
        options: ["", "", "", ""],
        correctAnswer: "",
        points: 1,
      });
      fetchQuestions();
    } catch (err) {
      console.error("Failed to add question", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white px-8 py-10"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          📚 Questions for Exam: {exam ? exam.title : "Loading..."}
        </h1>

        <div className="max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-blue-200 p-6 rounded-xl shadow-xl space-y-2 mb-16"
          >
            <input
              type="text"
              placeholder="Question Text"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="w-full border-b border-blue-400 p-2 bg-transparent focus:outline-none"
              required
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border-b border-blue-400 p-2 bg-transparent focus:outline-none"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True / False</option>
              <option value="short-answer">Short Answer</option>
            </select>

            {form.type === "multiple-choice" && (
              <div className="grid grid-cols-2 gap-4">
                {form.options.map((opt, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const newOpts = [...form.options];
                      newOpts[i] = e.target.value;
                      setForm({ ...form, options: newOpts });
                    }}
                    className="border-b border-blue-400 p-2 bg-transparent focus:outline-none"
                  />
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Correct Answer"
              value={form.correctAnswer}
              onChange={(e) =>
                setForm({ ...form, correctAnswer: e.target.value })
              }
              className="w-full border-b border-blue-400 p-2 bg-transparent focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Points"
              value={form.points}
              onChange={(e) =>
                setForm({ ...form, points: Number(e.target.value) })
              }
              className="w-full border-b border-blue-400 p-2 bg-transparent focus:outline-none"
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
              Add Question
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            📝 Existing Questions
          </h2>
          {questions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions.map((q) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white border border-blue-100 rounded-xl shadow hover:shadow-md"
                >
                  <p className="text-lg text-blue-800 font-semibold mb-1">
                    {q.text}
                  </p>
                  <p className="text-sm text-gray-600">
                    Points: {q.points} | Type: {q.type}
                  </p>
                  {q.options?.length > 0 && (
                    <ul className="list-disc ml-6 text-sm text-gray-700 mt-1">
                      {q.options.map((opt, i) => (
                        <li key={i}>{opt}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-sm mt-2 text-green-700 font-semibold">
                    ✔ Correct: {q.correctAnswer}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No questions found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminQuestionPanel;
