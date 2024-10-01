import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      
      // create a new cart referencing user's _id
      const token = json.token;
      const cartResponse = await fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the header
        },

        body: JSON.stringify({ userID: json._id }),
      });
      const cartJSON = await cartResponse.json();
      if (!cartResponse.ok) {
        setIsLoading(false);
        setError(cartJSON.error);
      }

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the AuthContext
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
