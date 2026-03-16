export default function Panel({
  title, setTitle,
  description, setDescription,
  interaction, setInteraction,
  difficulty, setDifficulty,

  // 🔹 NEW (optional)
  constraints,
  handleConstraintChange,
  addConstraint,
  removeConstraint,

  testCases,
  handleTestCaseChange,
  addTestCase,
  removeTestCase,

  handleSubmit,
  loading,

  heading = "Add New Question",
  submitText = "Add Question",
  waiting = "Adding..."
}) {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {heading}
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            className="mt-1 w-full border rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={4}
            className="mt-1 w-full border rounded-md p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Interaction */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Interaction / Input-Output Explanation
          </label>
          <textarea
            rows={5}
            className="mt-1 w-full border rounded-md p-2 font-mono"
            placeholder={`Input Format:\n...\n\nOutput Format:\n...`}
            value={interaction}
            onChange={(e) => setInteraction(e.target.value)}
          />
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            className="mt-1 w-40 border rounded-md p-2"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* 🔹 CONSTRAINTS (OPTIONAL & REUSABLE) */}
        {constraints && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Constraints
            </h2>

            {constraints.map((constraint, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  className="flex-1 border rounded-md p-2"
                  placeholder="e.g. 1 ≤ N ≤ 10^9"
                  value={constraint}
                  onChange={(e) =>
                    handleConstraintChange(index, e.target.value)
                  }
                />

                {constraints.length > 1 && (
                  <button
                    onClick={() => removeConstraint(index)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addConstraint}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add Constraint
            </button>
          </div>
        )}

        {/* Test Cases */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Test Cases
          </h2>

          {testCases.map((tc, index) => (
            <div
              key={index}
              className="mb-4 border rounded-md p-4 bg-gray-50"
            >
              <div className="mb-2 text-sm font-medium text-gray-600">
                Test Case {index + 1}
              </div>

              <textarea
                rows={3}
                placeholder="Input"
                className="w-full border rounded-md p-2 mb-2 font-mono"
                value={tc.input}
                onChange={(e) =>
                  handleTestCaseChange(index, "input", e.target.value)
                }
              />

              <textarea
                rows={2}
                placeholder="Expected Output"
                className="w-full border rounded-md p-2 font-mono"
                value={tc.expected}
                onChange={(e) =>
                  handleTestCaseChange(index, "expected", e.target.value)
                }
              />

              {testCases.length > 1 && (
                <button
                  onClick={() => removeTestCase(index)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addTestCase}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Test Case
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? waiting : submitText}
        </button>

      </div>
    </div>
  );
}
