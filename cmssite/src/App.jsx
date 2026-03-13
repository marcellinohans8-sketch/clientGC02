import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./views/Login";
import ProductList from "./views/ProductList";
import CreateProduct from "./views/CreateProduct";
import EditProduct from "./views/EditProduct";
import UploadImage from "./views/UploadImage";
import AddUser from "./views/AddUser";
import BaseLayout from "./components/BaseLayout";
import CategoryList from "./views/CategoryList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<BaseLayout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/upload-image/:id" element={<UploadImage />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/adduser" element={<AddUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
