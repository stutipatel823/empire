import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartContextProvider } from "./context/CartContext";
import { ProductContextProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext";
import { WishlistContextProvider } from "./context/WishlistContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
