import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // 📡 Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8080/users", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsers(res.data);
        setFiltered(res.data);

      } catch {
        setError("Failed to load users ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 Debounced Search (better UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = users.filter((u) =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.first_name.toLowerCase().includes(search.toLowerCase()) ||
        u.last_name.toLowerCase().includes(search.toLowerCase())
      );

      setFiltered(result);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, users]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      {/* Container */}
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Users
            </h2>
            <p className="text-sm text-gray-500">
              Total: {filtered.length}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

            <input
              type="text"
              placeholder="Search users..."
              className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full sm:w-auto px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
            >
              Back
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center text-red-600 py-6 text-sm">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && filtered.length === 0 && (
            <div className="text-center text-gray-500 py-10 text-sm">
              No users found
            </div>
          )}

          {/* Desktop Table */}
          {!loading && filtered.length > 0 && (
            <>
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">

                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-3 text-left font-medium">Email</th>
                      <th className="p-3 text-left font-medium">First Name</th>
                      <th className="p-3 text-left font-medium">Last Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((u) => (
                      <tr
                        key={u.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-gray-600">{u.email}</td>
                        <td className="p-3 font-medium text-gray-800">
                          {u.first_name}
                        </td>
                        <td className="p-3 text-gray-600">
                          {u.last_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden divide-y">
                {filtered.map((u) => (
                  <div key={u.id} className="p-4">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800 mb-2">{u.email}</p>

                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-500">First Name</p>
                        <p className="font-medium text-gray-800">
                          {u.first_name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Last Name</p>
                        <p className="text-gray-700">
                          {u.last_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;