/*
// /api/users/:id 
  {
    "_id": "66f1334e16b3319853dd6fac",
    "name": "Carol White",
    "email": "carol@example.com",
    "password": "carol1",
    "isAdmin": false,
    "orders": [],
    "createdAt": "2024-09-23T09:22:22.702Z",
    "updatedAt": "2024-09-23T09:22:22.929Z",
    "__v": 0,
    "cart": "66f1334e16b3319853dd6fae",
    "wishlist": "66f1334e16b3319853dd6fb0"
  }
// /api/carts/:id
{
  "_id": "66f1334e16b3319853dd6fae",
  "user": "66f1334e16b3319853dd6fac",
  "cartItems": [
    {
      "product": "66f1334d16b3319853dd6f88",
      "quantity": 7,
      "_id": "66f1334f16b3319853dd6fc5"
    },
    {
      "product": "66f1334d16b3319853dd6f89",
      "quantity": 9,
      "_id": "66f1334f16b3319853dd6fc6"
    },
    {
      "product": "66f1334d16b3319853dd6f8a",
      "quantity": 4,
      "_id": "66f1334f16b3319853dd6fc7"
    },
    {
      "product": "66f1334d16b3319853dd6f8b",
      "quantity": 9,
      "_id": "66f1334f16b3319853dd6fc8"
    }
  ],
  "createdAt": "2024-09-23T09:22:22.774Z",
  "updatedAt": "2024-09-23T09:22:23.481Z",
  "__v": 1
}

// /api/products/:id
{
  "_id": "66f1334d16b3319853dd6f88",
  "name": "Gucci Marmont Mini Bag",
  "brand": "Gucci",
  "category": "Clutches",
  "price": 1200,
  "stock": 10,
  "images": [
    "clutches-gucci-marmount-mini-bag-black.avif"
  ],
  "color": "Black",
  "ratings": [],
  "averageRating": 0,
  "numReviews": 0,
  "__v": 0,
  "createdAt": "2024-09-23T09:22:21.062Z",
  "updatedAt": "2024-09-23T09:22:21.062Z"
}
*/
import React, { useEffect, useState, useCallback } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import ConfirmModal from "../components/modal/ConfirmModal";
import AlertModal from "../components/modal/AlertModal";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal and Alert States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", status: true });

  const userId = "66f1334e16b3319853dd6fac";

  const fetchCartId = async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user data.");
    const json = await response.json();
    return json.cart; // Return the cart ID directly
  };

  const fetchCartItems = async (cartId) => {
    const response = await fetch(`/api/carts/${cartId}`);
    if (!response.ok) throw new Error("Failed to fetch cart data.");
    const json = await response.json();
    return json.cartItems; // Return the cart items directly
  };

  const fetchProduct = async (productId) => {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product data.");
    const json = await response.json();
    return json; // Return the product data directly
  };

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartId = await fetchCartId(userId);
        const items = await fetchCartItems(cartId);
        setCartItems(items);

        // Fetch product details for each cart item
        const productPromises = items.map(item => fetchProduct(item.product));
        const productDetails = await Promise.all(productPromises);
        setProducts(productDetails);
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    };

    loadCartData(); // Invoke the async function
  }, [userId]); // Depend on userId to avoid infinite loops

  const calculateTotalPrice = () => {
    if (!cartItems || cartItems.length === 0 || products.length === 0) return "0.00";

    return cartItems.reduce((total, cartItem, index) => {
      const product = products[index]; // Get corresponding product
      if (!product) return total; // Ensure the product exists
      return total + product.price * cartItem.quantity;
    }, 0).toFixed(2);
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem._id === id // Use _id here
          ? { ...cartItem, quantity: parseInt(newQuantity) }
          : cartItem
      )
    );
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemToDelete) // Fix here
    );
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

    setTimeout(() => {
      setShowAlert(false);
    }, 1000); // Hide after 10 seconds
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cartItems.length) return <div>Your cart is empty.</div>;

  return (
    <div
      className="p-5 flex flex-col"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <h1 className="text-3xl font-bold text-center">My Cart 🛒</h1>
      <p>{cartItems.length} Items</p>
      <div
        className="border-t border-secondary-light-gray mt-2 flex-1 overflow-auto"
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        {cartItems.map((cartItem, index) => (
          <div
            className="flex items-center justify-between py-2 border-b border-secondary-light-gray"
            key={cartItem._id} // Use _id as key
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
                  updateCartItemQuantity(cartItem._id, e.target.value) // Pass _id here
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
                onClick={() => handleDelete(cartItem._id)} // Use _id here
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
