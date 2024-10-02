import { createContext, useContext, useReducer } from "react";

const initialState = {
  wishlist: [],
  products: [],
};
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return { ...state, wishlist: action.payload };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
export const WishlistContext = createContext();
export const WishlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  return useContext(WishlistContext);
};
