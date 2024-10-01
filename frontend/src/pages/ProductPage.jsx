import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import AlertModal from "../components/modal/AlertModal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../context/CartContext";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { fetchProduct } from "../api/productService";
import { updateCart } from "../api/cartService";
import { fetchCart } from "../api/cartService";
import { addItemToCart } from "../api/cartService";

function ProductPage() {
  const { user } = useAuthContext();
  const { state, dispatch } = useCartContext();
  const { cart, products } = state; // user's cart details
  const [isSelected, setIsSelected] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { id } = useParams();
  const [alert, setAlert] = useState({ message: "", isSuccess: false });

  const showAlert = (message, isSuccess = false) => {
    setAlert({ message, isSuccess });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const json = await fetchProduct(id, user.token);
        setProductDetails(json);

        const json2 = await fetchCart(user.token); // Fetch cart
        dispatch({ type: "SET_CART", payload: json2.cartItems });

        // Check if the item exists in the cart and set the quantity
        const itemExists = json2.cartItems.find(
          (item) => item.product === json._id
        );
        if (itemExists) {
          setQuantity(itemExists.quantity);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.token) {
      loadData();
    }
  }, [id, user, dispatch]);

  async function updateQuantity(e) {
    const new_quantity = Number(e.target.value);

    // Update local quantity state
    setQuantity(new_quantity);

    // Optimistically update the cart state
    const updatedCart = cart.map((item) =>
      item.product === id ? { ...item, quantity: new_quantity } : item
    );
    dispatch({ type: "SET_CART", payload: updatedCart });

    // Make these changes to the database
    try {
      await updateCart(updatedCart, user.token);
      showAlert("Quantity Updated Successfully", true);
    } catch (error) {
      showAlert(error.message, false);
    }
  }

  async function handleAddToCart() {
    if (cart.find((item) => item.product === productDetails._id)) {
      showAlert("Item added to cart", true);
    } else {
      const cartItem = { product: productDetails._id, quantity: quantity };
      const response = await addItemToCart(cartItem, user.token);

      // Here response is the JSON data returned from the server
      if (response.error) {
        showAlert(response.error, false);
      } else {
        showAlert("Item added to cart", true);
      }
    }
  }

  function toggleHeart() {
    setIsSelected(!isSelected);
  }

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productDetails) return <div>No product details.</div>;

  return (
    <div
      className="p-5 flex flex-col"
      style={{ height: "100vh", maxHeight: "calc(100vh - 100px)" }}
    >
      <h1 className="text-2xl sm:text-3xl font-light">{productDetails.name}</h1>
      <p className="text-sm font-semibold sm:text-lg text-secondary-gray">
        ${productDetails.price}
      </p>
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <ImageSlider
          images={productDetails.images.map((image) => `/assets/${image}`)}
        />
      </div>
      <div className="w-full mt-2 py-5 border-y border-secondary-light-gray flex justify-between items-center sm:justify-between">
        <div className="flex items-center sm:space-x-2">
          <p>Qty:</p>

          <select
            value={quantity} // Use quantity state
            className="border border-secondary-light-gray rounded-full py-1 px-2 sm:px-5 flex justify-center"
            onChange={updateQuantity} // Update the quantity state on change
          >
            {[...Array(9)].map((_, qty) => (
              <option key={qty} value={qty + 1}>
                {qty + 1}
              </option>
            ))}
          </select>

          <button onClick={toggleHeart}>
            {isSelected ? (
              <HeartSolid className="mx-2 h-6 w-6 text-secondary-accent " />
            ) : (
              <HeartOutline className="mx-2 h-6 w-6 text-secondary-accent " />
            )}
          </button>
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

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start w-full mt-5">
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

        <div className="w-full sm:w-1/2 flex justify-end">
          <button
            className="w-full sm:w-auto py-3 px-6 rounded-md bg-primary-dark text-white flex justify-center items-center font-thin hover:bg-opacity-90"
            onClick={handleAddToCart}
          >
            <p className="text-2xl -mt-1 mr-2">+</p>
            <p className="text-md">Add to cart</p>
          </button>
        </div>
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

export default ProductPage;
