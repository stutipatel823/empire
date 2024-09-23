import React, { useState } from "react";
import Figure from "../assets/Figure1.png"; // Adjust path to the new location
import {
  HomeIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/solid"; // Use the solid version for filled heart

export default function WishlistScreen() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: "1",
      name: "Chopard Happy",
      price: 249.0,
      image: Figure,
    },
    {
      id: "2",
      name: "Chopard Happy",
      price: 249.0,
      image: Figure,
    },
    {
      id: "3",
      name: "Chopard Happy",
      price: 249.0,
      image: Figure,
    },
    {
      id: "4",
      name: "Chopard Happy",
      price: 249.0,
      image: Figure,
    },
    {
      id: "5",
      name: "Chopard Happy",
      price: 249.0,
      image: Figure,
    },
  ]);

  return (
    <div className="p-1 sm:p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Wishlist ❤️</h1>
      <div className="sm:space-y-4">
        {wishlistItems.map((item) => (
          <div
            className="flex items-center justify-between p-3 sm:p-4 border-y-secondary-light-gray border-b-2"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
            <div className="flex-1 ml-4">
              <p className="text-lg sm:text-2xl sm:font-light">{item.name}</p>
              <p className="text-sm sm:text-lg font-semibold text-secondary-gray">
                ${item.price}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="flex p-1 text-sm sm:text-base space-x-1 sm:px-4 sm:py-1 bg-primary-dark text-white rounded-md hover:bg-opacity-90">
                <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:block">Add to cart</span>
              </button>
              <button>
                <HeartIcon className="h-6 w-6 text-secondary-accent hover:text-opacity-80" />
                {/* Filled heart, colored */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
