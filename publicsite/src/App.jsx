import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./views/Home";
import Detail from "./views/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
