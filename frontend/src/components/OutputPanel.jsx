export default function OutputPanel({ result }) {
  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="h-12 px-4 border-b bg-gray-50 flex items-center font-medium text-gray-700">
        Output
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-black text-gray-200 space-y-4">

        {!result && (
          <div className="text-gray-500 italic">
            Run your code to see output
          </div>
        )}

        {/* ACCEPTED */}
        {result?.status === "Accepted" && (
          <div className="border border-green-500/30 rounded-md p-4 bg-[#0f1f14]">
            <div className="font-semibold text-green-400 mb-1">
              ✅ Accepted
            </div>
            <div className="text-green-300">
              Passed {result?.totalTests} / {result?.totalTests} test cases
            </div>
          </div>
        )}

        {/* WRONG ANSWER */}
        {result?.status === "Wrong Answer" && (
          <div className="border border-red-500/30 rounded-md p-4 bg-[#1a0f0f] space-y-4">

            <div>
              <div className="font-semibold text-red-400 mb-1">
                ❌ Wrong Answer
              </div>
              <div className="text-red-300">
                Passed {result?.failedTest - 1} / {result?.totalTests} test cases
              </div>
            </div>

            <div>
              <div className="text-gray-400 mb-1">Your Output</div>
              <pre className="bg-[#1e1e1e] p-3 rounded overflow-x-auto">
                {result.output}
              </pre>
            </div>

            <div>
              <div className="text-gray-400 mb-1">Expected Output</div>
              <pre className="bg-[#1e1e1e] p-3 rounded overflow-x-auto">
                {result.expected}
              </pre>
            </div>

          </div>
        )}

        {/* RUNTIME ERROR */}
        {result?.status === "Runtime Error" && (
          <div className="border border-red-500/30 rounded-md p-4 bg-[#1a0f0f] space-y-3">

            <div className="font-semibold text-red-400">
              💥 Runtime Error
            </div>

            <pre className="bg-[#1e1e1e] p-3 rounded overflow-x-auto">
              {result.error}
            </pre>

            <div className="text-red-300">
              Passed {result?.failedTest - 1} / {result?.totalTests} test cases
            </div>
          </div>
        )}

        {/* COMPILATION ERROR */}
        {result?.status === "Compilation Error" && (
          <div className="border border-yellow-500/30 rounded-md p-4 bg-[#1a160a] space-y-3">

            <div className="font-semibold text-yellow-400">
              ⚠️ Compilation Error
            </div>

            <pre className="bg-[#1e1e1e] p-3 rounded overflow-x-auto">
              {result.error}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}
