import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Updated import path for Heroicons v2

export default function HomeScreen() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Best Sellers");
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products')
      const json = await response.json();
      if (response.ok){
        setProducts(json);
        console.log(products);
      }
    }
  
    fetchProducts();
  }, [])

  // const products = [
  //   {
  //     id: "1",
  //     name: "Chopard Happy",
  //     price: 249.0,
  //     image: "/assets/cluthes-gucci-marmount-mini-bag-black.avif",
  //   },
  //   {
  //     id: "2",
  //     name: "Chopard Happy",
  //     price: 249.0,
  //     image: "/assets/handbags-hermes-kelly-bag-orange.avif",
  //   },
  //   {
  //     id: "3",
  //     name: "Chopard Happy",
  //     price: 249.0,
  //     image: "/assets/handbangs-chanel-classic-flap-bag-beige.avif",
  //   },
  //   {
  //     id: "4",
  //     name: "Chopard Happy",
  //     price: 249.0,
  //     image: "/assets/totes-louis-vuitton-neverfull-mm-monogram-totes-red.avif",
  //   },
  //   {
  //     id: "5",
  //     name: "Chopard Happy",
  //     price: 249.0,
  //     image: "/assets/handbangs-chanel-classic-flap-bag-white.avif",
  //   },
  // ];

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
        {products &&
          products.map((product, index) => (
            <div
              key={product._id}
              className={`py-10 cursor-pointer border-b border-gray-300 ${
                index % 2 === 0 ? "border-r border-gray-300" : ""
              }`}
              onClick={(e)=>{navigate('/product')}}
            >
              <div className="ml-5">
                <p className="text-lg sm:text-2xl font-light">{product.name}</p>
                <p className=" text-md sm:text-lg text-secondary-gray font-semibold">
                  ${product.price}
                </p>
                <img
                  src={`/assets/${product.images[0]}`}
                  alt={product.name}
                  className="h-28 sm:h-48 object-contain my-2 sm:w-fit"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
