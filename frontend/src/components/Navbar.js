import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, ShoppingBagIcon, HeartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <nav className="sm:w-screen flex justify-between items-center p-5 font-bold">
        {/* Logo / Home Link */}
        <Link to="/" className="text-2xl flex items-center space-x-2 text-primary-dark">
          <span>Empire</span>
        </Link>

        {/* Hamburger icon on small screens */}
        <button 
          className="block sm:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-8 w-8 text-secondary-accent" />  // Close icon when menu is open
          ) : (
            <Bars3Icon className="h-8 w-8 text-primary-dark" />  // 3-bar menu icon
          )}
        </button>

        {/* Navigation Links (Hidden on small screens) */}
        <div className="hidden sm:flex space-x-6 items-center">
          <Link to="/cart" className="flex items-center space-x-1 text-primary-dark hover:text-secondary-accent">
            <ShoppingBagIcon className="h-6 w-6" />
            <span>Cart</span>
          </Link>
          <Link to="/wishlist" className="flex items-center space-x-1 text-primary-dark hover:text-secondary-accent">
            <HeartIcon className="h-6 w-6" />
            <span>Wishlist</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-1 text-primary-dark hover:text-secondary-accent">
            <UserIcon className="h-6 w-6" />
            <span>Profile</span>
          </Link>
        </div>

        {/* Mobile Menu (Takes up the entire screen when open) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-primary-light z-50 flex flex-col items-center justify-center space-y-8 py-8 sm:hidden">
            <button 
              className="absolute top-5 right-5"
              onClick={toggleMobileMenu}
            >
              <XMarkIcon className="h-10 w-10 text-secondary-accent" /> 
            </button>

            <Link to="/cart" className="text-primary-dark hover:text-secondary-accent text-2xl" onClick={toggleMobileMenu}>
              <ShoppingBagIcon className="h-8 w-8 inline-block" />
              <span className="ml-2">Cart</span>
            </Link>
            <Link to="/wishlist" className="text-primary-dark hover:text-secondary-accent text-2xl" onClick={toggleMobileMenu}>
              <HeartIcon className="h-8 w-8 inline-block" />
              <span className="ml-2">Wishlist</span>
            </Link>
            <Link to="/profile" className="text-primary-dark hover:text-secondary-accent text-2xl" onClick={toggleMobileMenu}>
              <UserIcon className="h-8 w-8 inline-block" />
              <span className="ml-2">Profile</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
