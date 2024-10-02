// CartPage.jsx
import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import ConfirmModal from "../components/modal/ConfirmModal";
import AlertModal from "../components/modal/AlertModal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { deleteItemFromCart, fetchCart, updateCart } from "../api/cartService";
import { fetchProduct } from "../api/productService";
function CartPage() {
  const { user } = useAuthContext();
  const { state, dispatch } = useCartContext();
  const { cart, products } = state;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [alert, setAlert] = useState({ message: "", isSuccess: false });
  const [loading, setLoading] = useState(true);

  const showAlert = (message, isSuccess = false) => {
    setAlert({ message, isSuccess });
  };
  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        try {
          const json = await fetchCart(user.token); // Fetch cart
          dispatch({ type: "SET_CART", payload: json.cartItems });

          const allProductDetails = await Promise.all(
            json.cartItems.map((item) => fetchProduct(item.product, user.token))
          );
          console.log(allProductDetails); // Log to verify product data
          dispatch({ type: "SET_PRODUCTS", payload: allProductDetails });
        } catch (error) {
          showAlert(error.message, false); // Show error alert
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCartData();
  }, [user, dispatch]);

  const updateCartItemQuantity = async (id, new_quantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: new_quantity } : item
    );

    dispatch({ type: "SET_CART", payload: updatedCart });

    try {
      await updateCart(updatedCart, user.token); // Sync with backend
      showAlert("Cart updated successfully", true); // Show success alert
    } catch (error) {
      showAlert(error.message, false); // Show error alert
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) =>
        total +
          item.quantity * products.find((p) => p._id === item.product)?.price ||
        0,
      0
    );
  };

  const handleDelete = (itemId) => {
    setItemToDelete(itemId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteItemFromCart(itemToDelete, user.token); // Sync with backend
      showAlert("Item deleted successfully", true); // Show success alert
      const updatedCart = cart.filter((item) => item.product !== itemToDelete);
      dispatch({ type: "SET_CART", payload: updatedCart }); // Update state immediately
    } catch (error) {
      showAlert(error.message, false); // Show error alert
    } finally {
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (!cart.length) return <div>Your cart is empty.</div>;

  return (
    <div
      className="p-5 flex flex-col"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <h1 className="text-3xl font-bold text-center">My Cart 🛒</h1>
      <p>{cart.length} Items</p>

      <div
        className="border-t border-secondary-light-gray mt-2 flex-1 overflow-auto"
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        {cart.map((cartItem, index) => {
          const product = products.find(
            (item) => cartItem.product === item._id
          );

          return (
            <div
              className="flex items-center justify-between py-2 border-b border-secondary-light-gray"
              key={cartItem.product}
            >
              {product ? (
                <div
                  className="flex items-center hover:cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={`/assets/${product.images[0]}`}
                    alt={product.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1 ml-2">
                    <p className="text-lg sm:text-xl sm:font-light">
                      {product.name}
                    </p>
                    <p className="text-sm sm:text-lg text-secondary-gray">
                      ${product.price}
                    </p>
                  </div>
                </div>
              ) : (
                <div>Loading Product...</div>
              )}
              <div className="flex justify-center">
                <select
                  value={cartItem.quantity}
                  onChange={(e) =>
                    updateCartItemQuantity(cartItem._id, e.target.value)
                  }
                  className="border border-secondary-light-gray rounded-full py-1 px-2 flex justify-center"
                >
                  {[...Array(9)].map((_, qty) => (
                    <option key={qty} value={qty + 1}>
                      {qty + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="ml-2"
                  onClick={() => handleDelete(product._id)}
                >
                  <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-accent hover:text-opacity-80" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between font-bold py-2 border-t-2 border-primary-dark">
        <p>Total Amount:</p>
        <p>${calculateTotalPrice()}</p>
      </div>

      <div className="sm:ml-auto">
        {/* Promo Code and Checkout */}
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Enter Promo Code"
            className="flex-1 p-2 border border-secondary-gray rounded-l-md focus:border-2 focus:border-primary-dark focus:outline-none"
          />
          <button className="p-2 bg-primary-dark text-white border-none rounded-r-md cursor-pointer hover:bg-opacity-90">
            Apply
          </button>
        </div>

        <div className="flex mb-2">
          <span>🚚</span>
          <p className="ml-2">Free Shipping applied over $299.00</p>
        </div>
        <button className="py-3 w-full bg-primary-dark text-white border-none rounded-md cursor-pointer hover:bg-opacity-90">
          Proceed to Checkout
        </button>
      </div>

      {isModalOpen && (
        <ConfirmModal
          title="Confirm Deletion"
          message="Are you sure you want to remove this item from your cart?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

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

export default CartPage;
