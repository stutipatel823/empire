import React, { useState, useEffect } from "react";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/solid";
import AlertModal from "../components/modal/AlertModal";

import { useWishlistContext } from "../context/WishlistContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { deleteItemFromWishlist, fetchWishlist } from "../api/wishlistService";
import { fetchProduct } from "../api/productService";
import { useNavigate } from "react-router-dom";
import { addItemToCart, fetchCart } from "../api/cartService";
import { useCartContext } from "../context/CartContext";

export default function WishlistScreen() {
  const { user } = useAuthContext();
  const { state, dispatch } = useWishlistContext();
  const { wishlist, products } = state;
  const { state: cartState, dispatch: cartDispatch } = useCartContext(); // Access cart state
  const { cart } = cartState; // Retrieve cart from CartContext
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", isSuccess: false });

  const showAlert = (message, isSuccess = false) => {
    setAlert({ message, isSuccess });
  };

  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        setLoading(true);
        try {
          const json = await fetchWishlist(user.token);
          dispatch({ type: "SET_WISHLIST", payload: json.wishlistItems });

          const wishlistItems = json.wishlistItems;
          const allProductDetails = await Promise.all(
            wishlistItems.map((wishlistItem) =>
              fetchProduct(wishlistItem.product, user.token)
            )
          );
          dispatch({ type: "SET_PRODUCTS", payload: allProductDetails });

          const cartResponse = await fetchCart(user.token); // Fetch cart
          cartDispatch({ type: "SET_CART", payload: cartResponse.cartItems });
        } catch (error) {
          showAlert(error.message, false);
        } finally {
          setLoading(false);
        }
      }
    };

    loadWishlist();
  }, [user, dispatch, cartDispatch]);

  async function removeFromWishlist(product_id) {
    try {
      await deleteItemFromWishlist(product_id, user.token);
      const updatedWishlist = wishlist.filter(
        (item) => item.product !== product_id
      );
      dispatch({ type: "SET_WISHLIST", payload: updatedWishlist });

      const updatedProducts = products.filter(
        (item) => item._id !== product_id
      );
      dispatch({ type: "SET_PRODUCTS", payload: updatedProducts });

      showAlert("Item Removed from Wishlist", true);
    } catch (error) {
      showAlert(error.message, false);
    }
  }

  async function handleAddToCart(product_id) {
    // Ensure cart is an array
    if (!Array.isArray(cart)) {
        console.error("Cart is not an array:", cart);
        showAlert("An error occurred. Please try again.", false);
        return;
    }

    // Check if the item already exists in the cart
    const itemExistsInCart = cart.some(item => item.product === product_id);
    if (itemExistsInCart) {
        showAlert("Item already exists in the cart", false);
        return; // Exit early if the item is already in the cart
    }

    try {
        const cartItem = { product: product_id, quantity: 1 };
        const updatedCart = await addItemToCart(cartItem, user.token);
        cartDispatch({ type: "SET_CART", payload: updatedCart }); // Update the cart in context
        showAlert("Item Added to Cart", true);
    } catch (error) {
        showAlert(error.message, false);
    }
}

  if (loading) return <div className="text-center">Loading...</div>;
  if (wishlist.length === 0 && products.length === 0)
    return <div>Your wishlist is empty.</div>;

  return (
    <div className="p-1 sm:p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Wishlist ❤️</h1>
      <div className="sm:space-y-4">
        {wishlist.map((wishlistItem, index) => {
          const product = products.find(
            (item) => wishlistItem.product === item._id
          );
          return (
            <div
              className="flex items-center justify-between p-3 sm:p-4 border-y-secondary-light-gray border-b"
              key={wishlistItem._id}
            >
              <div
                className="flex items-center sm:w-1/2 justify-between hover:cursor-pointer"
                onClick={() => navigate(`/product/${wishlistItem.product}`)}
              >
                <img
                  src={`/assets/${product.images[0]}`}
                  alt={product.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
                <div className="flex-1 ml-4">
                  <p className="text-lg sm:text-2xl sm:font-light">
                    {product.name}
                  </p>
                  <p className="text-sm sm:text-lg font-semibold text-secondary-gray">
                    ${product.price}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="flex p-1 text-sm sm:text-base space-x-1 sm:px-4 sm:py-2 bg-primary-dark text-white rounded-md hover:bg-opacity-90"
                  onClick={() => handleAddToCart(product._id)} // Corrected the onClick
                >
                  <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:block">Add to cart</span>
                </button>
                <button onClick={() => removeFromWishlist(product._id)}>
                  <HeartIcon className="mx-2 h-6 w-6 text-secondary-accent" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {alert.message && (
        <AlertModal
          message={alert.message}
          isSuccess={alert.isSuccess}
          onClose={() => setAlert({ message: "", isSuccess: false })}
        />
      )}
    </div>
  );
}
