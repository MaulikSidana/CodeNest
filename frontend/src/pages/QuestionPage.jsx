import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Split from "react-split";

import app from "../../app/axios";
import ProblemPanel from "../components/ProblemPanel";
import CodeEditor from "../components/CodeEditor";
import OutputPanel from "../components/OutputPanel";

export default function Question() {
  const { title } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    fetchProblem();
  }, [title]);

  const fetchProblem = async () => {
    try {
      const final_title = title.split("-").join(" ");
      const res = await app.get(`/problems/${final_title}`);
      setProblem(res.data.problem);
      setSolved(res.data.isSolved)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!problem)
    return <div className="h-screen flex items-center justify-center">Problem not found</div>;

  return (
    <div className="h-screen bg-gray-100">
      <div className="h-full max-w-[1600px] mx-auto p-2">

        <div className="h-full bg-white border rounded-md overflow-hidden">

          {/* 🔥 OUTER SPLIT (LEFT | RIGHT) */}
          <Split
            className="flex h-full"
            sizes={[45, 55]}          // Problem | Right
            minSize={300}
            gutterSize={6}
            direction="horizontal"
          >
            {/* LEFT: Problem */}
            <div className="h-full overflow-hidden border-r">
              <ProblemPanel problem={problem} solved={solved} />
            </div>

            {/* RIGHT: Code + Output */}
            <div className="h-full overflow-hidden">

              {/* 🔥 INNER SPLIT (CODE | OUTPUT) */}
              <Split
                className="flex flex-col h-full"
                sizes={[65, 35]}     // Code | Output
                minSize={150}
                gutterSize={6}
                direction="vertical"
              >
                <div className="overflow-hidden border-b">
                  <CodeEditor title={title} setResult={setResult} />
                </div>

                <div className="overflow-hidden">
                  <OutputPanel result={result} />
                </div>
              </Split>

            </div>
          </Split>

        </div>
      </div>
    </div>
  );
}
