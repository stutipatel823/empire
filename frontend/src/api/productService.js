// src/api/productService.js
export const fetchProduct = async (product_id, token) => {
  try {
    const response = await fetch(`/api/products/${product_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchProducts = async (token) => {// fetch all products in database
  try {
    const response = await fetch("/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    return json
  } catch (error) {
    throw new Error(error.message);
  }
};