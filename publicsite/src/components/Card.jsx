export default function Card({ product, onDetail }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group">
      <div className="overflow-hidden">
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        {product.Category?.name && (
          <span className="text-xs text-blue-500 font-medium">
            {product.Category.name}
          </span>
        )}

        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>

        <p className="text-xl font-bold text-blue-600">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <p className="text-xs text-gray-400">
          Stock available: {product.stock}
        </p>

        <button
          onClick={onDetail}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          View Detail
        </button>
      </div>
    </div>
  );
}
