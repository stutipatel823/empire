import React, { useEffect, useState, useContext } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import ConfirmModal from "../components/modal/ConfirmModal";
import AlertModal from "../components/modal/AlertModal";
import { GlobalContext } from "../context/GlobalContext"; // Import the context

function CartPage() {
  const { state, dispatch } = useContext(GlobalContext); // Access global state and dispatch
  const { cart, products, user, loading, error } = state; // Destructure from global state

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", status: true });

  const userId = user?._id || "66f1334e16b3319853dd6fac"; // Get userId from context or fallback

  const fetchCartId = async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user data.");
    const json = await response.json();
    return json.cart; // Return the cart ID
  };

  const fetchCartItems = async (cartId) => {
    const response = await fetch(`/api/carts/${cartId}`);
    if (!response.ok) throw new Error("Failed to fetch cart data.");
    const json = await response.json();
    return json.cartItems;
  };

  const fetchProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product data.");
    const json = await response.json();
    return json;
  };

  useEffect(() => {
    const loadCartData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const cartId = await fetchCartId(userId);
        const items = await fetchCartItems(cartId);

        // Dispatch the cart items to global state
        dispatch({ type: "SET_CART", payload: items });

        // Fetch product details for each cart item
        const productPromises = items.map((item) => fetchProduct(item.product));
        const productDetails = await Promise.all(productPromises);

        // Dispatch the fetched products to global state
        dispatch({ type: "SET_PRODUCTS", payload: productDetails });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadCartData();
  }, [userId, dispatch]);

  const calculateTotalPrice = () => {
    if (!cart || cart.length === 0 || products.length === 0) return "0.00";
    return cart
      .reduce((total, cartItem, index) => {
        const product = products[index];
        if (!product) return total;
        return total + product.price * cartItem.quantity;
      }, 0)
      .toFixed(2);
  };
  const updateCartItemQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem._id === id
        ? { ...cartItem, quantity: parseInt(newQuantity) }
        : cartItem
    );
    dispatch({ type: "SET_CART", payload: updatedCart }); // Dispatch updated cart
    fetchAndUpdateCart(updatedCart);
  };

  const fetchAndUpdateCart = async (updatedCart) => {
    try {
      const cartId = await fetchCartId(userId)
      const response = await fetch(`/api/carts/${cartId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: updatedCart }),
      });
      const json = await response.json()
      console.log(json);
    } catch (error) {
      console.error("Error updating cart:", error)
    }
   
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedCart = cart.filter((item) => item._id !== itemToDelete);
    dispatch({ type: "SET_CART", payload: updatedCart }); // Dispatch updated cart
    setIsModalOpen(false);
    setItemToDelete(null);
    showAlertWithMessage("Item deleted successfully!", true);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  const showAlertWithMessage = (message, status) => {
    setAlertInfo({ message, status });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1000);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
        {cart.map((cartItem, index) => (
          <div
            className="flex items-center justify-between py-2 border-b border-secondary-light-gray"
            key={cartItem._id}
          >
            {products[index] ? (
              <>
                <img
                  src={`/assets/${products[index].images[0]}`}
                  alt={products[index].name}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex-1 ml-2">
                  <p className="text-lg sm:text-xl sm:font-light">
                    {products[index].name}
                  </p>
                  <p className="text-sm sm:text-lg text-secondary-gray">
                    ${products[index].price}
                  </p>
                </div>
              </>
            ) : (
              <div>Loading Product..</div>
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
                onClick={() => handleDelete(cartItem._id)}
              >
                <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-accent hover:text-opacity-80" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-bold py-2 border-t-2 border-primary-dark">
        <p>Total Amount:</p>
        <p>${calculateTotalPrice()}</p>
      </div>

      <div className="sm:ml-auto">
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
          Checkout
        </button>
      </div>

      {isModalOpen && (
        <ConfirmModal
          message={"Do you want to delete this item?"}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {showAlert && (
        <AlertModal message={alertInfo.message} status={alertInfo.status} />
      )}
    </div>
  );
}

export default CartPage;
