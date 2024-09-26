import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// pages & components
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ProductPage from "./pages/ProductPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <div className="App bg-primary-light">
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

function Content() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div className="pages">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/changepassword" element={<ChangePasswordPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
