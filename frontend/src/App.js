import './index.css'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from './pages/ProfilePage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <div className="App bg-primary-light">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/product" element={<ProductPage/>}></Route>
            <Route path="/wishlist" element={<WishlistPage />}></Route>
            <Route path="/cart" element={<CartPage/>}></Route>
            <Route path="/profile" element={<ProfilePage/>}></Route>
            <Route path="/changepassword" element={<ChangePasswordPage/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;