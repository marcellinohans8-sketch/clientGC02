import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Toastify from "toastify-js";

export default function BaseLayout() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    Toastify({
      text: "Please login first",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      style: {
        background: "#F87171",
        color: "#000000",
      },
    }).showToast();

    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
}
