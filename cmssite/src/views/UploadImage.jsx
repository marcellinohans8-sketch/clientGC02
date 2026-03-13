import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router";
import BaseUrl from "../constant/BaseUrl";

export default function UploadImage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("imgUrl", image);

      await axios.patch(`${BaseUrl}/products/upload/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Image uploaded",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: { background: "green" },
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Upload failed",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "red" },
      }).showToast();
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Upload Gambar Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Upload
        </button>
      </form>
    </div>
  );
}
