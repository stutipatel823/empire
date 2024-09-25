import React, { useState } from "react";
import "../styles/FormStyles.css"; // Make sure the path is correct

function ProfilePage() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Name:", name);
  };

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "street",
      type: "text",
      placeholder: "Street",
      errorMessage: null,
      label: "Street",
      required: false,
    },
    {
      id: 4,
      name: "city",
      type: "text",
      placeholder: "City",
      errorMessage: null,
      label: "City",
      required: false,
    },
    {
      id: 5,
      name: "province",
      type: "text",
      placeholder: "Province",
      errorMessage: null,
      label: "Province",
      required: false,
    },
    {
      id: 6,
      name: "postalCode",
      type: "text",
      placeholder: "Postal Code",
      errorMessage: "Postal Code should be a valid format!",
      label: "Postal Code",
      pattern: "^[A-Za-z0-9 ]{3,10}$", // Adjust pattern as needed
      required: false,
    },
    {
      id: 7,
      name: "country",
      type: "text",
      placeholder: "Country",
      errorMessage: null,
      label: "Country",
      required: false,
    },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center p-2"
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Profile👤</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        {inputs.map((item) => (
          <div className="label-input-container" key={item.id}>
            <label>
              {item.label}
              <input
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
                required={item.required}
                pattern={item.pattern} // Add pattern if it exists
              />
            </label>
            {/* {item.errorMessage && <span className="error-message">{item.errorMessage}</span>} */}
          </div>
        ))}
        <button
          type="submit"
          className="w-1/2 py-3 rounded-md bg-primary-dark text-white hover:bg-opacity-90"
        >
          Save Changes
        </button>
        <a href="/changepassword" className="text-sm underline mt-2">
          Change Password?
        </a>
      </form>
    </div>
  );
}

export default ProfilePage;
