import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Card from "../components/Card";
import BaseUrl from "../constant/BaseUrl";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("DESC");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${BaseUrl}/pub/products`, {
        params: { search, category, sort, page },
      });

      setProducts(data.data);
      setTotalPage(data.totalPage);
    } catch (err) {
      console.log(err);
      setError("Failed load products");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}/pub/categories`);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm">Loading Home...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-3">UNIQLA</h1>

        <p className="text-blue-100">Temukan product terbaik dari toko kami</p>
      </div>

      <div className="max-w-6xl mx-auto -mt-8 bg-white shadow-md rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Categories</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="DESC">Newest</option>
          <option value="ASC">Oldest</option>
        </select>
      </div>

      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {loading ? (
        <div className="flex justify-center mt-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
              <Card
                key={product.id}
                product={product}
                onDetail={() => navigate(`/detail/${product.id}`)}
              />
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-center mt-10 text-gray-500">No products found</p>
          )}

          <div className="flex justify-center items-center gap-4 pb-12">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-40"
            >
              Prev
            </button>

            <span className="font-medium">
              Page {page} / {totalPage}
            </span>

            <button
              disabled={page === totalPage}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
