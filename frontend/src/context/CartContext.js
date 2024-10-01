import React, { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cart: [], //cartItems (productId and quantity)
  products: [], // products with their details
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};


export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => React.useContext(CartContext);
