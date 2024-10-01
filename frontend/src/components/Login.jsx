import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Normally default action refreshes the page
    const success = await login(email, password);
    console.log(success);
    if (success) {
      console.log("Login successful, navigating to home...");
      navigate("/home");
    }
  };
  return (
    <form
      className="flex flex-col items-center w-full max-w-xs"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-primary-dark"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-primary-dark"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-primary-dark hover:bg-opacity-90 text-white py-2 rounded-md w-full mt-5"
        disabled={isLoading}
      >
        Log In
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
