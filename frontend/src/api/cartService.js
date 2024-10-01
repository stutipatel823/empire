// /api/cartService.js
const BASE_URL = "/api/carts"; // Base URL for the cart API

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
  try {
      const response = await fetch("/api/carts/items/", {
          method: "POST",
          body: JSON.stringify({ cartItem }),
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          const errorData = await response.json(); // Retrieve error message from the response
          return { error: errorData.error || "Failed to update cart." };
      }

      return await response.json(); // Return the JSON data on success
  } catch (error) {
      return { error: error.message }; // Return the error message on failure
  }
};
