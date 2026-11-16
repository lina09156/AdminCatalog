import { Link } from "react-router-dom";

function ProductItem({ product, onDelete }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price} ₽</td>
      <td>
        <Link
          to={`/admin/products/${product.id}/edit`}
          className="btn btn-sm btn-outline-primary me-2"
        >
          Редактировать
        </Link>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(product.id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

export default ProductItem;