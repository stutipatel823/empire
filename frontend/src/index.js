import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalContextProvider } from "./context/GlobalContext";
import { CartContextProvider } from "./context/CartContext";
import { ProductContextProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <ProductContextProvider>
          <GlobalContextProvider>
            <App />
          </GlobalContextProvider>
        </ProductContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
