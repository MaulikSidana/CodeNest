import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../app/axios";

export default function AdminDashboard() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await app.get("/admin/questions");
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question permanently?")) return;

    try {
      await app.delete(`/admin/delete-question/${id}`);
      setQuestions(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading admin dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <span className="text-sm text-gray-500">
            Total Questions: {questions.length}
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {questions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No questions available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Difficulty</th>
                    <th className="px-4 py-3 text-center">Test Cases</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {questions.map((q, index) => (
                    <tr
                      key={q._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-800">
                        {q.title}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              q.difficulty === "Easy"
                                ? "bg-green-100 text-green-700"
                                : q.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {q.difficulty}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center">
                        {q.testCases?.length || 0}
                      </td>

                      {/* ACTION COLUMN */}
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-3">
                             {/* VIEW */}
                            <button
                            onClick={() => navigate(`/admin/question/${q._id}`)}
                            className="px-3 py-1 text-xs font-medium rounded-md
                                bg-indigo-50 text-indigo-700 hover:bg-indigo-100"

                            >
                                View
                            </button>
                          <button
                            onClick={() =>
                              navigate(`/admin/update-question/${q._id}`)
                            }
                            className="px-3 py-1 text-xs font-medium rounded-md
                              bg-blue-50 text-blue-600 hover:bg-blue-100"
                          >
                            Update
                          </button>

                          <button
                            onClick={() => handleDelete(q._id)}
                            className="px-3 py-1 text-xs font-medium rounded-md
                              bg-red-50 text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
