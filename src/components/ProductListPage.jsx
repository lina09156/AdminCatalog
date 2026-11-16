import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, saveProducts } from "../storage.js";
import ProductItem from "./ProductItem.jsx";

function ProductListPage() {
  const [products, setProducts] = useState(() => getProducts());

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const handleDelete = (productId) => {
    if (!window.confirm("Удалить товар?")) {
      return;
    }
    setProducts(current => current.filter(p => p.id !== productId));
  };

  return (
    <main className="container py-4">
      <h1 className="mb-4">Каталог товаров</h1>
      <Link to="/admin/products/new" className="btn btn-primary mb-3">
        Добавить товар
      </Link>
      {products.length === 0 ? (
        <div className="alert alert-info" role="status">
          Каталог пуст. Добавьте первый товар.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">Название</th>
                <th scope="col">Категория</th>
                <th scope="col">Цена</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default ProductListPage;