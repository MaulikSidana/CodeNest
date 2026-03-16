import { useState } from "react";
import Editor from "@monaco-editor/react";
import app from "../../app/axios";

export default function CodeEditor({ title, setResult }) {
  const [code, setCode] = useState(`#include <bits/stdc++.h>
using namespace std;

int main() {
    return 0;
}
`);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) return;

    try {
      setLoading(true);

      const res = await app.post(`/problems/${title}`, {
        code,
        language: "cpp",
      });

      setResult(res.data);
    } catch (err) {
      setResult({
        status: "Runtime Error",
        error: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <div className="h-12 px-4 border-b flex items-center justify-between bg-gray-50">
        <span className="font-medium text-gray-700">Code</span>
        <span className="text-xs bg-gray-200 px-2 py-1 rounded">C++</span>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language="cpp"
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            fontFamily: "Fira Code, monospace",
          }}
        />
      </div>

      {/* Footer */}
      <div className="h-14 border-t px-4 flex justify-end items-center bg-gray-50">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded text-white transition
            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

    </div>
  );
}
