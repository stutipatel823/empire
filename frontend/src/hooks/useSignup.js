import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Send request to create a user
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Signup failed");
      }

      const token = json.token;
      
      // Step 2: If user created successfully, create a cart
      const cartResponse = await fetch("/api/carts/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userID: json._id }),
      });

      const cartJSON = await cartResponse.json();
      if (!cartResponse.ok) {
        throw new Error(cartJSON.error || "Cart creation failed");
      }

      // Step 4: If user and cart are created successfully, create a wishlist
      const wishlistResponse = await fetch("/api/wishlists/admin",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userID: json._id }),
      });
      const wishlistJSON = await wishlistResponse.json();
      if (!wishlistResponse.ok) {
        throw new Error(wishlistJSON.error || "Cart creation failed");
      }


      // Step 5: Save user and cart in localStorage
      localStorage.setItem("user", JSON.stringify(json));

      // Step 6: Update AuthContext with the new user and cart
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      return true;

    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  return { signup, isLoading, error };
};
