function getProducts() {
  const data = localStorage.getItem("products");
  if (!data) {
    return [];
  }
  try {
    const products = JSON.parse(data);
    return Array.isArray(products) ? products : [];
  } catch {
    return [];
  }
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

export { getProducts, saveProducts };