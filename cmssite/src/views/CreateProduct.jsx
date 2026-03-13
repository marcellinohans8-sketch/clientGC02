import { useEffect, useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import BaseUrl from "../constant/BaseUrl";
import ProductForm from "../components/ProductForm";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function handleSubmit(form) {
    try {
      await axios.post(`${BaseUrl}/products`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Product created successfully",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: { background: "#16a34a" },
      }).showToast();

      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Create failed",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#dc2626" },
      }).showToast();
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BaseUrl}/category`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setCategories(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading add product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Add Product</h1>
        <p className="text-gray-500 text-sm mt-1">
          Tambahkan product baru sesuai kategori di bawah ini
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <ProductForm handleSubmit={handleSubmit} categories={categories} />
      </div>
    </div>
  );
}
