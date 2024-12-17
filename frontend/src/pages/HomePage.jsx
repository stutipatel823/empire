import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProductContext } from "../context/ProductContext";
import { fetchProducts } from "../api/productService";

export default function HomeScreen() {
  const { state, dispatch } = useProductContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Best Sellers");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store the full list of products from the database

  useEffect(() => {
    const loadProducts = async () => {
      if (user && user.token) {
        try {
          const products = await fetchProducts(user.token); // Fetch all products from the database
          setAllProducts(products); // Store the full list of products
          dispatch({ type: "SET_PRODUCTS", payload: products }); // Dispatch the fetched products
        } catch (error) {
          console.error("Error fetching products: ", error); // Log any errors
        }
      }
    };

    loadProducts(); // Call the loadProducts function
  }, [dispatch, user]);

  useEffect(() => {
    // Determine if user is searching
    const isSearching = searchQuery.trim().length > 0;

    const filtered = allProducts.filter((product) => {
      // Search filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // If searching, ignore toggle filtering
      if (isSearching) {
        return matchesSearch;
      }

      // Toggle-specific filter
      if (activeButton === "Best Sellers") {
        return product.displayCategory === "BestSellers";
      } else if (activeButton === "Just Arrived") {
        return product.displayCategory === "JustArrived";
      } else if (activeButton === "Trending") {
        return product.displayCategory === "Trending";
      }

      return true; // Default: Show all products
    });

    setFilteredProducts(filtered);
  }, [allProducts, activeButton, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    // Reset active button when searching
    if (e.target.value.trim().length > 0) {
      setActiveButton(""); // Deselect all toggles
    }
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4 flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 border rounded-md focus:border-2 focus:border-primary-dark focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Button Group */}
      <div className="flex justify-between border-b-2 border-b-secondary-light-gray text-sm sm:text-xl">
        {["Best Sellers", "Just Arrived", "Trending"].map((label) => (
          <button
            key={label}
            className={`sm:py-2 sm:px-4 ${
              activeButton === label
                ? "border-b-4 border-b-primary-dark"
                : "text-secondary-middle-gray"
            }`}
            onClick={() => {
              setActiveButton(label);
              setSearchQuery(""); // Clear search query when a toggle is selected
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2">
        {filteredProducts.length === 0 ? (
          <p>No items...</p>
        ) : (
          filteredProducts.map((product, index) => (
            <div
              key={product._id} // Use product ID as key
              className={`py-10 cursor-pointer border-b border-gray-300 ${
                index % 2 === 0 ? "border-r border-gray-300" : ""
              }`}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className="ml-5">
                <p className="text-lg sm:text-2xl font-light">{product.name}</p>
                <p className="text-md sm:text-lg text-secondary-gray font-semibold">
                  ${product.price}
                </p>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={`/assets/${product.images[0]}`}
                    alt={product.name}
                    className="h-28 sm:h-48 object-contain my-2 sm:w-fit"
                  />
                ) : (
                  <p>No image available</p> // Fallback if no images exist
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
