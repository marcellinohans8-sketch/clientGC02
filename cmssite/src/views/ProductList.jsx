import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../constant/BaseUrl";
import Toastify from "toastify-js";
import { useNavigate } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      await axios.delete(`${BaseUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Product deleted",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: { background: "#16a34a" },
      }).showToast();

      fetchProducts();
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Delete failed",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#dc2626" },
      }).showToast();
    }
  }

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${BaseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProducts(data.data);
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Failed fetch products",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#dc2626" },
      }).showToast();
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchProducts();

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    loadData();
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading product list...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Products
        </h1>

        <button
          onClick={() => navigate("/add-product")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Add Product
        </button>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 text-left">No</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Author</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="p-4">{index + 1}</td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 max-w-xs truncate">{product.description}</td>
                <td className="p-4">{formatRupiah(product.price)}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">{product.Category?.name}</td>
                <td className="p-4">{product.User?.email}</td>

                <td className="p-4 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => navigate(`/upload-image/${product.id}`)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-xs"
                  >
                    Upload
                  </button>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow border"
          >
            <h2 className="font-semibold text-lg">{product.name}</h2>

            <p className="text-sm text-gray-500 mb-2">{product.description}</p>

            <div className="text-sm space-y-1">
              <p className="text-2xl font-semibold text-blue-600 mt-4">
                {formatRupiah(product.price)}
              </p>
              <p>
                <span className="font-medium">Stock:</span> {product.stock}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {product.Category?.name}
              </p>
              <p>
                <span className="font-medium">Author:</span>{" "}
                {product.User?.email}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/edit-product/${product.id}`)}
                className="flex-1 bg-yellow-400 text-white py-1 rounded-md text-xs"
              >
                Edit
              </button>

              <button
                onClick={() => navigate(`/upload-image/${product.id}`)}
                className="flex-1 bg-indigo-500 text-white py-1 rounded-md text-xs"
              >
                Upload
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-500 text-white py-1 rounded-md text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center mt-10 text-gray-400">
          No products available
        </div>
      )}
    </div>
  );
}
