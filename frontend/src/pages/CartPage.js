import React, { useState } from "react";
import Figure from "../assets/Figure1.png"; // Adjust path to the new location
import { TrashIcon } from "@heroicons/react/24/solid";
import ConfirmModal from "../components/modal/ConfirmModal";
import AlertModal from "../components/modal/AlertModal";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Chopard Happy",
      price: 249.0,
      image: Figure,
      quantity: 5,
    },
    {
      id: "2",
      name: "BVLGARI Rose Goldea",
      price: 229.0,
      image: Figure,
      quantity: 1,
    },
    {
      id: "3",
      name: "BVLGARI Rose Goldea",
      price: 229.0,
      image: Figure,
      quantity: 1,
    },
    {
      id: "4",
      name: "BVLGARI Rose Goldea",
      price: 229.0,
      image: Figure,
      quantity: 1,
    },
    {
      id: "5",
      name: "BVLGARI Rose Goldea",
      price: 229.0,
      image: Figure,
      quantity: 1,
    },
    {
      id: "6",
      name: "BVLGARI Rose Goldea",
      price: 229.0,
      image: Figure,
      quantity: 3,
    },
  ]);
  

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", status: true });

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: parseInt(newQuantity) }
          : cartItem
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete));
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
    }, 10000); // Hide after 3 seconds
  };

  return (
    <div className="p-5 flex flex-col" style={{ maxHeight: "calc(100vh - 100px)" }}>
      <h1 className="text-3xl font-bold text-center">My Cart 🛒</h1>
      <p>{cartItems.length} Items</p>
      <div className="border-t border-secondary-light-gray mt-2 flex-1 overflow-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
        {cartItems.map((item) => (
          <div className="flex items-center justify-between py-2 border-b border-secondary-light-gray" key={item.id}>
            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
            <div className="flex-1 ml-2">
              <p className="text-lg sm:text-xl sm:font-light">{item.name}</p>
              <p className="text-sm sm:text-lg text-secondary-gray">${item.price}</p>
            </div>
            <div className="flex justify-center">
              <select
                value={item.quantity}
                onChange={(e) => updateCartItemQuantity(item.id, e.target.value)}
                className="border border-secondary-light-gray rounded-full py-1 px-2 flex justify-center"
              >
                {[...Array(9)].map((_, index) => (
                  <option key={index} value={index + 1}>{index + 1}</option>
                ))}
              </select>
              <button className="ml-2" onClick={() => handleDeleteItem(item.id)}>
                <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-accent" />
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
        <AlertModal
          message={alertInfo.message}
          status={alertInfo.status}
        />
      )}
    </div>
  );
}
