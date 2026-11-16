import { useState } from "react";

function ProductForm({ initialValues, onSubmit, onCancel }) {
  const [name, setName] = useState(initialValues.name || "");
  const [price, setPrice] = useState(initialValues.price ?? "");
  const [category, setCategory] = useState(initialValues.category || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Укажите название товара.");
      return;
    }
    const numericPrice = Number(price);
    if (!price || isNaN(numericPrice) || numericPrice <= 0) {
      setError("Укажите корректную цену больше нуля.");
      return;
    }
    setError("");
    onSubmit({
      name: name.trim(),
      price: numericPrice,
      category: category.trim(),
      description: description.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="alert alert-danger" role="status">
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Название товара
        </label>
        <input
          id="name"
          name="name"
          className="form-control"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="price" className="form-label">
            Цена, ₽
          </label>
          <input
            id="price"
            name="price"
            type="number"
            className="form-control"
            value={price}
            onChange={event => setPrice(event.target.value)}
            required
            min="0"
            step="1"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="category" className="form-label">
            Категория
          </label>
          <input
            id="category"
            name="category"
            className="form-control"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Описание
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          rows="4"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

export default ProductForm;