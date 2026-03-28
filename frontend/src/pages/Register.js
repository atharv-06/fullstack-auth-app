import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    university_name: "",
    gender: "",
    year_joined: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (
      !form.email ||
      !form.password ||
      !form.first_name ||
      !form.last_name ||
      !form.university_name ||
      !form.gender ||
      !form.year_joined
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:8080/register", form);

      setSuccess(res.data.message || "Registered successfully");

      setTimeout(() => {
        window.location.replace("/login");
      }, 1200);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-6
                      transition-all duration-300 hover:shadow-lg">

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Create Account
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded mb-4 text-sm text-center animate-fadeIn">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-50 text-green-600 p-2 rounded mb-4 text-sm text-center animate-fadeIn">
            {success}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2.5 mb-3 border border-gray-300 rounded-md text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 
                     transition-all duration-200"
        />

        {/* Name */}
        <div className="flex gap-2 mb-3">
          <input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={handleChange}
            className="w-1/2 p-2.5 border border-gray-300 rounded-md text-sm 
                       focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={handleChange}
            className="w-1/2 p-2.5 border border-gray-300 rounded-md text-sm 
                       focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2.5 mb-3 border border-gray-300 rounded-md text-sm 
                     focus:ring-2 focus:ring-indigo-400 transition"
        />

        {/* University */}
        <input
          name="university_name"
          placeholder="University"
          value={form.university_name}
          onChange={handleChange}
          className="w-full p-2.5 mb-3 border border-gray-300 rounded-md text-sm 
                     focus:ring-2 focus:ring-indigo-400 transition"
        />

        {/* Gender + Year */}
        <div className="flex gap-2 mb-4">
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-1/2 p-2.5 border border-gray-300 rounded-md text-sm 
                       focus:ring-2 focus:ring-indigo-400 transition"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            name="year_joined"
            placeholder="Year"
            value={form.year_joined}
            onChange={handleChange}
            className="w-1/2 p-2.5 border border-gray-300 rounded-md text-sm 
                       focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-2.5 rounded-md text-sm 
                     hover:bg-indigo-700 active:scale-95 
                     transition-all duration-200 flex justify-center items-center"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Register"
          )}
        </button>

        {/* Footer */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;