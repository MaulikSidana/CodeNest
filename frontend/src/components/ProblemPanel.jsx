import { useState } from "react";

export default function ProblemPanel({ problem, solved }) {
  const [showAllExamples, setShowAllExamples] = useState(false);

  const testcases = showAllExamples
    ? problem.testCases || []
    : problem.testCases?.slice(0, 2) || [];

  return (
    <div className="relative h-full overflow-y-auto p-6">

      {/* ✅ SOLVED BADGE */}
      {solved && (
        <div className="absolute top-6 right-6">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
            ✔ Solved
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">
        {problem.title}
      </h1>

      {/* Difficulty */}
      <div className="mt-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
            ${
              problem.difficulty === "Easy"
                ? "bg-green-100 text-green-700"
                : problem.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* Description */}
      <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
        {problem.description}
      </div>

      {/* 🔹 INPUT / OUTPUT FORMAT */}
      {problem.interaction && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Input / Output Format
          </h2>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <pre className="text-sm text-gray-800 whitespace-pre-line font-mono">
              {problem.interaction}
            </pre>
          </div>
        </div>
      )}

      {/* 🔹 CONSTRAINTS */}
      {problem.constraints?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Constraints
          </h2>

          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 EXAMPLES */}
      {testcases.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Examples
          </h2>

          {testcases.map((tc, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Input:</span>{" "}
                <span className="font-mono whitespace-pre-wrap">{tc.input}</span>
              </p>

              <p className="mt-2 text-sm text-gray-700">
                <span className="font-semibold">Output:</span>{" "}
                <span className="font-mono whitespace-pre-wrap">{tc.expected}</span>
              </p>
            </div>
          ))}

          {/* 🔹 SHOW MORE / LESS */}
          {problem.testCases?.length > 2 && (
            <button
              onClick={() => setShowAllExamples(!showAllExamples)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showAllExamples ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}

    </div>
  );
}
