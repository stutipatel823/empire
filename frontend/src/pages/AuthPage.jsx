import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function AuthPage() {
  const location = useLocation();  // Get the current location to check which page is active
  const isLoginPage = location.pathname === '/login';  // Check if the current path is /login

  return (
    <div className="mt-20 flex flex-col items-center w-full h-screen bg-primary-light">
      <h1 className="text-6xl mb-24 text-center text-primary-dark font-serif">𝓔𝓶𝓹𝓲𝓻𝓮</h1>
      <div className="flex items-center mb-6">
        <Link to="/login">
          <button className={`px-4 py-2 ${isLoginPage ? 'text-primary-dark' : 'text-secondary-light-gray'}`}>
            Log In
          </button>
        </Link>
        <span className="text-secondary-light-gray mx-2">|</span>
        <Link to="/signup">
          <button className={`px-4 py-2 ${!isLoginPage ? 'text-primary-dark' : 'text-secondary-light-gray'}`}>
            Sign Up
          </button>
        </Link>
      </div>
      {isLoginPage ? <Login /> : <Signup />}  {/* Render based on the current path */}
    </div>
  );
}
