// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  products: [],
};
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      // Ensure payload is an array
      return { ...state, cart: Array.isArray(action.payload) ? action.payload : [] };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_ITEM":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter(item => item.product !== action.payload.product),
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  // function addtocart () {}
  // function removefromcart () {}
  // function addtocart () {}
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
