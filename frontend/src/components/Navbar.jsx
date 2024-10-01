import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const { logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    logout();
    console.log("User logged out");
  };

  return (
    <header>
      <nav className="sm:w-screen flex justify-between items-center p-5 font-bold">
        <Link
          to="/home"
          className="text-2xl flex items-center space-x-2 text-primary-dark font-serif"
        >
          <span>𝓔𝓶𝓹𝓲𝓻𝓮</span>
        </Link>

        {/* Hamburger icon on small screens */}
        <button className="block sm:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-8 w-8 text-secondary-accent" /> // Close icon when menu is open
          ) : (
            <Bars3Icon className="h-8 w-8 text-primary-dark" /> // 3-bar menu icon
          )}
        </button>

        {/* Navigation Links (Hidden on small screens) */}
        <div className="hidden sm:flex space-x-6 items-center">
          <Link
            to="/cart"
            // to="/api/carts/"
            className="flex items-center space-x-1 text-primary-dark hover:text-secondary-accent"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            <span>Cart</span>
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center space-x-1 text-primary-dark hover:text-secondary-accent"
          >
            <HeartIcon className="h-6 w-6" />
            <span>Wishlist</span>
          </Link>

          {/* Profile Menu */}
          <div className="relative group">
            <Link
              to="/profile"
              className="flex items-center space-x-1 text-primary-dark hover:text-secondary-accent"
            >
              <UserIcon className="h-6 w-6" />
              <span>Profile</span>
            </Link>

            {/* Profile dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-primary-dark hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-primary-dark hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Takes up the entire screen when open) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-primary-light z-50 flex flex-col items-center justify-center  sm:hidden">
            <button
              className="absolute top-5 right-5"
              onClick={toggleMobileMenu}
            >
              <XMarkIcon className="h-10 w-10 text-secondary-accent" />
            </button>
            <div className="flex flex-col items-start space-y-4">
              <Link
                to="/cart"
                // to="/api/carts/"
                className="text-primary-dark hover:text-secondary-accent text-2xl"
                onClick={toggleMobileMenu}
              >
                <ShoppingBagIcon className="h-8 w-8 inline-block" />
                <span className="ml-2">Cart</span>
              </Link>
              <Link
                to="/wishlist"
                className="text-primary-dark hover:text-secondary-accent text-2xl"
                onClick={toggleMobileMenu}
              >
                <HeartIcon className="h-8 w-8 inline-block" />
                <span className="ml-2">Wishlist</span>
              </Link>
              <Link
                to="/profile"
                className="text-primary-dark hover:text-secondary-accent text-2xl"
                onClick={toggleMobileMenu}
              >
                <UserIcon className="h-8 w-8 inline-block" />
                <span className="ml-2">Profile</span>
              </Link>
              <Link
                to="/signup"
                className="px-10 py-2 border-t border-secondary-gray text-primary-dark hover:text-secondary-accent text-2xl"
                onClick={() => {
                  toggleMobileMenu();
                  handleLogout();
                }}
              >
                <span className="">Logout</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
