import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import Toastify from "toastify-js";
import BaseUrl from "../constant/BaseUrl";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${BaseUrl}/login`, form);

      localStorage.setItem("access_token", data.access_token);

      Toastify({
        text: "Login success",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#22c55e" },
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Login failed",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#ef4444" },
      }).showToast();
    }
  }

  if (localStorage.access_token) {
    Toastify({
      text: "You already logged in",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#F87171",
        color: "#000000",
      },
    }).showToast();
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
            CMS
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign in
        </h1>

        <p className="text-center text-gray-500 text-sm mt-1 mb-6">
          Login akun kamu di sini!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          UNIQLA CMS Product
        </p>
      </div>
    </div>
  );
}
