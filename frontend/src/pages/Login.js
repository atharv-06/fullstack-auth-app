import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8080/login", {
        email,
        password
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 800);
      } else {
        setError(res.data.message || "Login failed");
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6
                      transition-all duration-300 hover:shadow-lg">

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm text-center animate-fadeIn">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 mb-3 border border-gray-300 rounded-md text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 
                     transition-all duration-200"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 mb-4 border border-gray-300 rounded-md text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 
                     transition-all duration-200"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2.5 rounded-md text-sm 
                     hover:bg-indigo-700 active:scale-95 
                     transition-all duration-200 flex justify-center items-center"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>

        {/* Footer */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;