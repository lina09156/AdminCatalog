import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProductListPage from "./components/ProductListPage.jsx";
import ProductFormPage from "./components/ProductFormPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/admin/products" element={<ProductListPage />} />
        <Route path="/admin/products/new" element={<ProductFormPage />} />
        <Route path="/admin/products/:id/edit" element={<ProductFormPage />} />
        <Route path="*" element={<Navigate to="/admin/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;