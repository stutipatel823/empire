require("dotenv").config();

import { useAuthContext } from "./useAuthContext";
const API_URL = process.env.REACT_APP_API_URL;

import { useState } from "react";
export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(null);

  const login = async (email, password) => {
    setIsloading(true);
    setError(null);
    
    const response = await fetch(`${API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setIsloading(false);
      return false
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsloading(false);
      return true
    }
  };

  return { login, error, isLoading };
};
