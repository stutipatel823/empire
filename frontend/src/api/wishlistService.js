const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = `${API_URL}/api/wishlists/`;
export const fetchWishlist = async (token) => {
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

export const updateWishlist = async (wishlist, token) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "PATCH",
      body: JSON.stringify({ wishlist }),
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

export const deleteItemFromWishlist = async (product_id, token) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "DELETE",
      body: JSON.stringify({ product: product_id }),
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

export const addItemToWishlist = async (product_id, token) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product: product_id }),
    });
    if (!response.ok) {
      throw new Error("Failed to update cart.");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
