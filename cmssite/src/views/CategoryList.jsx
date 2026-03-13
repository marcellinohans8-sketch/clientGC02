import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../constant/BaseUrl";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";
import Button from "../components/Button";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BaseUrl}/category`, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        setCategories(data.data);
      } catch (error) {
        Toastify({
          text: error.response?.data?.message || "Failed fetch categories",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: { background: "#dc2626" },
        }).showToast();
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    fetchCategory();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading categories...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Categories</h1>
          <p className="text-gray-500 text-sm">
            List category product yang tersedia
          </p>
        </div>

        <Button
          text="Product List"
          color="blue"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="hidden md:block max-w-4xl mx-auto bg-white rounded-xl shadow-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Category Name</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {categories.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50 transition">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-medium">{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="bg-white p-4 rounded-xl shadow border"
          >
            <p className="text-sm text-gray-400">Category #{index + 1}</p>

            <h2 className="text-lg font-semibold text-gray-800">
              {category.name}
            </h2>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No categories found
        </div>
      )}
    </div>
  );
}
