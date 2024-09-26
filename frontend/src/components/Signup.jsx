import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault(); //Normally default action refreshes the page
    // Add your signup logic here
    const name = `${firstName} ${lastName}`;
    const user = {name, email, password}
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      alert(error);
    } else {
      setError(null);
      console.log("new user added.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      navigate('/home'); 
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col items-center w-full max-w-xs"
    >
      <input
        type="text"
        placeholder="First Name"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-secondary-accent"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-secondary-accent"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-secondary-accent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-secondary-middle-gray bg-white p-2 w-full mb-4 rounded-md focus:outline-none focus:border-secondary-accent"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-primary-dark hover:bg-opacity-90 text-white py-2 rounded-md w-full mt-5"
      >
        Create Account
      </button>
    </form>
  );
}
export default Signup;