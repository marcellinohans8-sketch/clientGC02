import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import BaseUrl from "../constant/BaseUrl";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDetail = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${BaseUrl}/pub/products/${id}`);

      setProduct(data);
    } catch (err) {
      console.log(err);
      setError("Failed load product detail");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  if (!product) return null;
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
        <p className="text-gray-500 text-sm">Loading detail product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          ← Kembali ke product
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-xl p-6 flex items-center justify-center">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="rounded-lg object-contain max-h-[400px]"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-blue-500 font-medium mb-2">
            {product.Category?.name}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-blue-600 mt-4">
            {formatRupiah(product.price)}
          </p>

          <p className="text-gray-500 mt-2">Stock available: {product.stock}</p>

          <p className="mt-6 text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
