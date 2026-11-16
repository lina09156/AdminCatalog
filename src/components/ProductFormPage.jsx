import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProducts, saveProducts } from "../storage.js";
import ProductForm from "./ProductForm.jsx";

function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => getProducts());

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const isEditMode = Boolean(id);
  const product = isEditMode ? products.find(p => p.id === id) : null;
  const notFound = isEditMode && !product;

  const handleSubmit = (values) => {
    if (isEditMode && product) {
      setProducts(current =>
        current.map(p =>
          p.id === id ? { ...p, ...values } : p
        )
      );
    } else {
      const newProduct = { ...values, id: crypto.randomUUID() };
      setProducts(current => [...current, newProduct]);
    }
    navigate("/admin/products");
  };

  if (notFound) {
    return (
      <main className="container py-4">
        <div className="alert alert-danger" role="status">
          Товар не найден.
        </div>
        <Link to="/admin/products" className="btn btn-secondary">
          Вернуться к каталогу
        </Link>
      </main>
    );
  }

  const initialValues = isEditMode
    ? product
    : { name: "", price: "", category: "", description: "" };

  return (
    <main className="container py-4">
      <h1 className="mb-4">
        {isEditMode ? "Редактирование товара" : "Новый товар"}
      </h1>
      <ProductForm
        key={id || "new"}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/products")}
      />
    </main>
  );
}

export default ProductFormPage;