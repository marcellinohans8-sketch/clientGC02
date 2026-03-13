import { useEffect, useState } from "react";

export default function ProductForm({
  handleSubmit,
  categories = [],
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imgUrl: "",
    categoryId: "",
  });

  useEffect(() => {
    if (!initialData || !initialData.id) return;

    setForm({
      name: initialData.name,
      description: initialData.description,
      price: initialData.price,
      stock: initialData.stock,
      imgUrl: initialData.imgUrl,
      categoryId: initialData.categoryId,
    });
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitForm(e) {
    e.preventDefault();
    handleSubmit(form);
  }

  return (
    <form onSubmit={submitForm} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product name"
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="price"
        min={0}
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="stock"
        min={0}
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="imgUrl"
        value={form.imgUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border p-2 rounded"
      />

      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Category</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
