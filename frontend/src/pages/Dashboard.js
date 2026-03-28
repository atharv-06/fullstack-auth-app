import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setData(res.data.message);
      } catch {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <h2 className="text-lg font-semibold text-gray-800">
            Dashboard
          </h2>

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => (window.location.href = "/users")}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Users
            </button>

            <button
              onClick={() => (window.location.href = "/teachers")}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Teachers
            </button>

            <button
              onClick={logout}
              className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
            >
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Welcome Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

            <h3 className="text-sm text-gray-500 mb-1">
              Welcome
            </h3>

            <p className="text-lg font-semibold text-gray-800">
              You are logged in
            </p>

            <div className="mt-3 text-sm">
              {loading ? (
                <span className="text-gray-400">Loading...</span>
              ) : (
                <span className="text-green-600 font-medium">
                  {data}
                </span>
              )}
            </div>
          </div>

          {/* Users Card */}
          <div
            onClick={() => (window.location.href = "/users")}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm cursor-pointer hover:bg-gray-50 transition"
          >
            <h3 className="text-sm text-gray-500 mb-1">
              Manage
            </h3>

            <p className="text-lg font-semibold text-gray-800">
              Users
            </p>

            <p className="text-sm text-gray-400 mt-2">
              View and manage users
            </p>
          </div>

          {/* Teachers Card */}
          <div
            onClick={() => (window.location.href = "/teachers")}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm cursor-pointer hover:bg-gray-50 transition"
          >
            <h3 className="text-sm text-gray-500 mb-1">
              Manage
            </h3>

            <p className="text-lg font-semibold text-gray-800">
              Teachers
            </p>

            <p className="text-sm text-gray-400 mt-2">
              View teacher records
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;