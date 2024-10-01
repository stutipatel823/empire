import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
function Signup() {
  const { signup, isLoading, error } = useSignup();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault(); // Normally default action refreshes the page
    await signup(`${firstName} ${lastName}`, email, password);
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col items-center w-full max-w-xs"
    >
      <input
        type="text"
        placeholder="First Name"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-primary-dark"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-primary-dark"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-primary-dark"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-primary-dark"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        disabled={isLoading}
        type="submit"
        className="bg-primary-dark hover:bg-opacity-90 text-white py-2 rounded-md w-full mt-5"
      >
        Create Account
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
export default Signup;
