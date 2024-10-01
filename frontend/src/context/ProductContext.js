import React, { useContext, useReducer, createContext } from "react";

// Create the context
const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state; // Handle unexpected action types
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

// Create a custom hook to use the ProductContext
export const useProductContext = () => {
  return useContext(ProductContext);
};
