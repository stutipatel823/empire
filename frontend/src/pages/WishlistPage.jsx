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
// /api/wishlists/:id
{
  "_id": "66f1334e16b3319853dd6fb0",
  "user": "66f1334e16b3319853dd6fac",
  "wishlistItems": [
    {
      "product": "66f1334d16b3319853dd6f88",
      "_id": "66f1334f16b3319853dd6fd8"
    },
    {
      "product": "66f1334d16b3319853dd6f89",
      "_id": "66f1334f16b3319853dd6fd9"
    },
    {
      "product": "66f1334d16b3319853dd6f8a",
      "_id": "66f1334f16b3319853dd6fda"
    },
    {
      "product": "66f1334d16b3319853dd6f8b",
      "_id": "66f1334f16b3319853dd6fdb"
    },
    {
      "product": "66f1334d16b3319853dd6f8c",
      "_id": "66f1334f16b3319853dd6fdc"
    },
    {
      "product": "66f1334d16b3319853dd6f8d",
      "_id": "66f1334f16b3319853dd6fdd"
    }
  ],
  "createdAt": "2024-09-23T09:22:22.848Z",
  "updatedAt": "2024-09-23T09:22:23.976Z",
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
import React, { useState, useEffect, useContext } from "react";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/solid"; // Use the solid version for filled heart
import { GlobalContext } from "../context/GlobalContext";
export default function WishlistScreen() {
  const [state, dispatch] = useContext(GlobalContext);
  const { wishlist, products, user, loading, error } = state; // Destructure from global state

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState(null);
  // const [showAlert, setShowAlert] = useState(false);
  // const [alertInfo, setAlertInfo] = useState({ message: "", status: true });

  const userId = user?._id || "66f1334e16b3319853dd6fac"; // Get userId from context or fallback
  // const [wishlistItems, setWishlistItems] = useState([]);
  // const [products, setProducts] = useState([]);

  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  const fetchWishlistId = async (userId) => {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user data.");
    const json = await response.json();
    return json.wishlist;
  };
  const fetchWishlistItems = async (wishlistId) => {
    const response = await fetch(`/api/wishlists/${wishlistId}`);
    if (!response.ok) throw new Error("Failed to fetch wishlist data.");
    const json = await response.json();
    return json.wishlistItems;
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
        const wishlistId = await fetchWishlistId(userId);
        const items = await fetchWishlistItems(wishlistId);
        
        // Dispatch the cart items to global state
        dispatch({ type: "SET_WISHLIST", payload: items });
        
        // setWishlistItems(items);

        // Fetch product details for each cart item
        const productPromises = items.map((item) => fetchProduct(item.product)); // all fetch requests/promises for each item runs concurrently
        const productDetails = await Promise.all(productPromises); // waits for all fetch requests/promises to be resolved
        
        // Dispatch the fetched products to global state
        dispatch({type:'SET_PRODUCTS', payload:productDetails})
        // setProducts(productDetails);

        console.log(products);
      } catch (error) {
        dispatch({type:'SET_ERROR', payload:error.message})
        // setError(error.message); // Handle errors

      } finally {
        dispatch({type:'SET_LOADING', payload:false})
        // setIsLoading(false);
      }
    };
    loadCartData();
  }, [userId]);

  if (loading) return <div className="text-center">Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>;
  if (!wishlist.length) return <div>Your wishlist is empty.</div>;

  return (
    <div className="p-1 sm:p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Wishlist ❤️</h1>
      <div className="sm:space-y-4">
        {wishlist &&
          wishlist.map((item, index) => (
            <div
              className="flex items-center justify-between p-3 sm:p-4 border-y-secondary-light-gray border-b"
              key={item._id} // Use a unique identifier if available
            >
              <img
                src={`/assets/${products[index].images[0]}`} // Optional chaining if needed
                alt={products[index].name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              />
              <div className="flex-1 ml-4">
                <p className="text-lg sm:text-2xl sm:font-light">
                  {products[index].name}
                </p>
                <p className="text-sm sm:text-lg font-semibold text-secondary-gray">
                  ${products[index].price}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="flex p-1 text-sm sm:text-base space-x-1 sm:px-4 sm:py-2 bg-primary-dark text-white rounded-md hover:bg-opacity-90">
                  <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:block">Add to cart</span>
                </button>

                <button>
                  <HeartIcon className="h-6 w-6 text-secondary-accent hover:text-opacity-80" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
