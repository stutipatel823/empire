import React, { useState } from "react";
import Figure from "../assets/Figure1.png"; // Adjust path to the new location
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; // Updated import path for Heroicons v2

export default function HomeScreen() {
  const [activeButton, setActiveButton] = useState("Best Sellers");

  const products = [
    {
      id: "1",
      name: "Chopard Happy",
      price: "$249.00",
      image: Figure, // Update this path to a valid image URL
    },
    {
      id: "2",
      name: "Chopard Happy",
      price: "$249.00",
      image: Figure, // Update this path to a valid image URL
    },
    {
      id: "3",
      name: "Chopard Happy",
      price: "$249.00",
      image: Figure, // Update this path to a valid image URL
    },
    {
      id: "4",
      name: "Chopard Happy",
      price: "$249.00",
      image: Figure, // Update this path to a valid image URL
    },
    {
      id: "5",
      name: "Chopard Happy",
      price: "$249.00",
      image: Figure, // Update this path to a valid image URL
    },
    {
      id: "6",
      name: "Chopard Happy",
      price: "$249.00",
      image: Figure, // Update this path to a valid image URL
    },
    // Add more products as needed
  ];

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 border rounded-md focus:border-2 focus:border-primary-dark focus:outline-none"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>
      {/* Button Group */}
      <div className="flex justify-between border-b-2 border-b-secondary-light-gray text-sm sm:text-xl">
        <button
          className={`sm:py-2 sm:px-4 ${
            activeButton === "Best Sellers"
              ? "border-b-4 border-b-primary-dark"
              : "text-secondary-middle-gray"
          }`}
          onClick={() => setActiveButton("Best Sellers")}
        >
          Best Sellers
        </button>
        <button
          className={` ${
            activeButton === "Just Arrived"
              ? "border-b-4 border-b-primary-dark"
              : "text-secondary-middle-gray"
          }`}
          onClick={() => setActiveButton("Just Arrived")}
        >
          Just Arrived
        </button>
        <button
          className={`sm:py-2 sm:px-4 ${
            activeButton === "Trending"
              ? "border-b-4 border-b-primary-dark"
              : "text-secondary-middle-gray"
          }`}
          onClick={() => setActiveButton("Trending")}
        >
          Trending
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2">
        {products.map((product, index) => (
          <div
            className={`py-10 text-center border-b border-gray-300 ${
              index % 2 === 0 ? "border-r border-gray-300" : ""
            }`}
            key={product.id}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-28 sm:h-48 object-contain mb-2"
            />
            <p className=" text-xl sm:text-2xl font-light">{product.name}</p>
            <p className=" text-md sm:text-lg text-secondary-gray font-semibold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
