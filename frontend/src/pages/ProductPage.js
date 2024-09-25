import React, { useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider"; // Import the custom ImageSlider component
import Rating from "@mui/material/Rating"; // Import Rating from MUI
import Box from "@mui/material/Box"; // Import Box for styling

function ProductPage() {
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const productId = "66f1334d16b3319853dd6f88"; // Example product ID

  const fetchProductDetails = async (productId) => {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product data.");
    const json = await response.json();
    return json;
  };

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const details = await fetchProductDetails(productId);
        setProductDetails(details);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadProductData();
  }, [productId]);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productDetails) return <div>No product details.</div>;

  return (
    <div
      className="p-5 flex flex-col"
      style={{ height: "100vh", maxHeight: "calc(100vh - 100px)" }} // Ensures the main container takes up available height
    >
      <h1 className="text-2xl sm:text-3xl font-light">{productDetails.name}</h1>
      <p className="text-xs sm:text-sm font-semibold sm:text-lg text-secondary-gray">
        ${productDetails.price}
      </p>
      {/* Use the custom ImageSlider component */}
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <ImageSlider
          images={productDetails.images.map((image) => `/assets/${image}`)}
        />
      </div>

      <div className="w-full mt-2 py-5 border-y border-secondary-light-gray flex justify-between items-center sm:justify-between">
        <div className="flex items-center sm:space-x-2">
          <p>Qty:</p>
          <select
            value={1}
            className="border border-secondary-light-gray rounded-full py-1 px-2 sm:px-5 flex justify-center"
          >
            {[...Array(9)].map((_, qty) => (
              <option key={qty} value={qty + 1}>
                {qty + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Box>
            <Rating
              name="rating-read"
              precision={0.5}
              readOnly
              value={productDetails.averageRating}
            />
          </Box>
        </div>
      </div>

      {/* Flex container for product details and add to cart */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start w-full mt-5">
        {/* Product Details */}
        <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:pr-5">
          <p className="text-xs sm:text-sm font-thin text-secondary-middle-gray">
            {productDetails.description}
          </p>
          <div className="my-1 flex items-center">
            <p className="text-xs sm:text-sm text-secondary-gray font-normal">
              Stock:
            </p>
            <p className="text-xs sm:text-sm text-primary-color font-normal ml-1">
              {productDetails.stock > 0 ? "Available" : "Out of Stock"}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-xs sm:text-sm text-secondary-gray font-normal">
              Category:
            </p>
            <p className="text-xs sm:text-sm text-primary-color font-normal ml-1">
              {productDetails.category}
            </p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="w-full sm:w-1/2 flex justify-end">
          <button className="w-full sm:w-auto py-3 px-6 rounded-md bg-primary-dark text-white flex justify-center items-center font-thin">
            <p className="text-2xl -mt-1 mr-2">+</p>
            <p className="text-md">Add to cart</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
