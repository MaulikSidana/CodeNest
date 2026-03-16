import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import app from "../../app/axios";

export default function ViewQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const res = await app.get(`/admin/question/${id}`);
      setQuestion(res.data.question);
    } catch (err) {
      alert("Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading question…
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Question not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {question.title}
          </h1>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
              ${
                question.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : question.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {question.difficulty}
          </span>
        </div>

        {/* DESCRIPTION */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Description
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {question.description}
          </p>
        </section>

        {/* INTERACTION */}
        {question.interaction && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Interaction / Input-Output Explanation
            </h2>
            <pre className="bg-gray-50 border rounded-md p-4 text-sm text-gray-800 whitespace-pre-wrap">
              {question.interaction}
            </pre>
          </section>
        )}

        {/* CONSTRAINTS */}
        {question.constraints?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Constraints
            </h2>

            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {question.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </section>
        )}

        {/* TEST CASES */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Cases
          </h2>

          {question.testCases.length === 0 ? (
            <p className="text-gray-500">No test cases available.</p>
          ) : (
            question.testCases.map((tc, index) => (
              <div
                key={index}
                className="mb-4 border rounded-md p-4 bg-gray-50"
              >
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Test Case {index + 1}
                </div>

                <div className="mb-2">
                  <div className="text-xs text-gray-500 mb-1">Input</div>
                  <pre className="bg-white border rounded p-2 text-sm whitespace-pre-wrap">
                    {tc.input}
                  </pre>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Expected Output
                  </div>
                  <pre className="bg-white border rounded p-2 text-sm whitespace-pre-wrap">
                    {tc.expected}
                  </pre>
                </div>
              </div>
            ))
          )}
        </section>

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          ← Back
        </button>

      </div>
    </div>
  );
}
