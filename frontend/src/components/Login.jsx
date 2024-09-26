import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  return (
    <form className="flex flex-col items-center w-full max-w-xs">
      <input
        type="email"
        placeholder="Email"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-secondary-accent"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-secondary-accent"
        required
      />
      <button type="submit" className="bg-primary-dark hover:bg-opacity-90 text-white py-2 rounded-md w-full mt-5">
        Log In
      </button>
    </form>
  );
}
