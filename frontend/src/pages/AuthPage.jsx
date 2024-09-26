import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function AuthPage() {
  const [isLoginPage, setIsLoginPage] = useState(true); // Initially show Login

  const toggleView = () => {
    setIsLoginPage(!isLoginPage); // Toggle between Login and Signup
  };

  return (
    <div className="mt-20 flex flex-col items-center w-full h-screen bg-primary-light">
      <h1 className="text-6xl mb-24 text-center text-primary-dark font-serif">𝓔𝓶𝓹𝓲𝓻𝓮</h1>
      <div className="flex items-center mb-6">
        <button onClick={toggleView} className={`px-4 py-2 ${isLoginPage ? 'text-primary-dark' : 'text-secondary-light-gray'}`}>
          Log In
        </button>
        <span className="text-secondary-light-gray mx-2">|</span>
        <button onClick={toggleView} className={`px-4 py-2 ${!isLoginPage ? 'text-primary-dark' : 'text-secondary-light-gray'}`}>
          Sign Up
        </button>
      </div>
      {isLoginPage ? <Login /> : <Signup />}
    </div>
  );
}
