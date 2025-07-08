import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const AdminQuestionPanel = () => {
  const { id: examId } = useParams();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
      if (editingId) {
        // Update question
        await handleUpdateQuestion(editingId, dataToSend);
        setEditingId(null);
      } else {
        // Add new question
        await axios.post(
          "https://edu-master-delta.vercel.app/question",
          dataToSend,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
      }

      setForm({
        text: "",
        type: "multiple-choice",
        options: ["", "", "", ""],
        correctAnswer: "",
        points: 1,
      });
      fetchQuestions();
    } catch (err) {
      console.error("Failed to add/update question", err);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(
        `https://edu-master-delta.vercel.app/question/${questionId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("✅ Question deleted successfully.");
      fetchQuestions(); // Refresh question list after deletion
    } catch (err) {
      console.error("Failed to delete question", err);
      alert("❌ Failed to delete the question. Please try again.");
    }
  };

  const handleUpdateQuestion = async (questionId, updatedData) => {
    try {
      await axios.put(
        `https://edu-master-delta.vercel.app/question/${questionId}`,
        updatedData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("✅ Question updated successfully.");
      fetchQuestions(); // Refresh questions
    } catch (err) {
      console.error("Failed to update question", err);
      alert("❌ Failed to update question. Please try again.");
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
            <button
              className={`w-full text-white py-3 rounded-lg transition ${
                editingId
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {editingId ? "Update Question" : "Add Question"}
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
                  className="relative   p-4 bg-white border border-blue-100 rounded-xl shadow hover:shadow-md"
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
                  <div className="flex flex-col items-end gap-1 absolute top-2 right-2">
                    <button
                      onClick={() => {
                        setForm({
                          text: q.text,
                          type: q.type,
                          options: q.options || ["", "", "", ""],
                          correctAnswer: q.correctAnswer,
                          points: q.points,
                        });
                        setEditingId(q._id);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => handleDeleteQuestion(q._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      🗑 Delete
                    </button>
                  </div>
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
