// /api/cartService.js
const API_URL = process.env.REACT_APP_API_URL;

const BASE_URL = `${API_URL}/api/carts`; // Base URL for the cart API

export const fetchCart = async (token) => {
  try {
    const response = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCart = async (cartItems, token) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "PATCH",
      body: JSON.stringify({ cartItems }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update cart.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addItemToCart = async (cartItem, token) => {
  const { product, quantity = 1 } = cartItem;
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product, quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to update cart.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteItemFromCart = async (product_id, token) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product: product_id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete product from cart");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
