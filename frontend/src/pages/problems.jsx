import { useState, useEffect } from "react";
import app from "../../app/axios";
import { useNavigate } from "react-router-dom";

export default function Problems() {
  const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await app.get("/problems");
      setProblems(response.data.problems); 
    } catch (error) {
      console.error("There was an error fetching the problems!", error);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
    <div className="max-w-5xl mx-auto px-4">

      {/* Card */}
      <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden">

        {/* Title */}
        <div className="px-8 py-6 border-b">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Problems
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Practice coding problems by difficulty
          </p>
        </div>

        {/* Header */}
        <div className="grid grid-cols-12 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 border-b">
          <div className="col-span-1">#</div>
          <div className="col-span-8">Problem</div>
          <div className="col-span-3 text-right">Difficulty</div>
        </div>

        {/* Problems */}
        {problems.map((problem, index) => (
          <div
            key={problem._id}
            className="
              group grid grid-cols-12 px-8 py-4 items-center
              border-b last:border-none
              transition-all duration-200
              hover:bg-white hover:shadow-sm hover:-translate-y-[1px]
            "
          >
            {/* Index */}
            <div className="col-span-1 text-gray-400 font-medium">
              {index + 1}
            </div>

            {/* Title */}
            <div
              className="
                col-span-8 font-medium text-gray-800
                cursor-pointer
                group-hover:text-indigo-600
                transition
              "
              onClick={() =>
                navigate(`/${problem.title.split(" ").join("-")}`)
              }
            >
              {problem.title}
            </div>

            {/* Difficulty */}
            <div className="col-span-3 text-right">
              <span
                className={`px-4 py-1 rounded-full text-xs font-semibold
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
          </div>
        ))}

        {/* Empty */}
        {problems.length === 0 && (
          <div className="px-6 py-16 text-center text-gray-500">
            No problems available
          </div>
        )}
      </div>
    </div>
  </div>
);
}