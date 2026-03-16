import { useEffect, useState } from "react";
import app from "../../app/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [lastProblem, setLastProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await app.get("/dashboard");

      // Backend response mapping
      console.log(res.data);
      setUser(res.data.user);
      setStats(res.data.stats);
      setLastProblem(res.data.lastProblemSolved);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Track your progress and activity
          </p>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Profile
          </h2>

          <div className="text-sm text-gray-600">
            <p>
                
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

          <StatCard
            title="Total Solved"
            value={stats.total}
            color="text-blue-600"
          />

          <StatCard
            title="Easy"
            value={stats.easy}
            color="text-green-600"
          />

          <StatCard
            title="Medium"
            value={stats.medium}
            color="text-yellow-600"
          />

          <StatCard
            title="Hard"
            value={stats.hard}
            color="text-red-600"
          />

        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Activity
          </h2>

          {lastProblem ? (
            <p className="text-sm text-gray-500">
              You solved{" "}
              <span className="font-medium text-gray-700">
                {lastProblem}
              </span>{" "}
              recently.
            </p>
          ) : (
            <p className="text-sm text-gray-400">
              No problems solved yet.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

/* -------------------- Reusable Stat Card -------------------- */

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`text-2xl font-bold ${color}`}>
        {value}
      </div>
    </div>
  );
}
