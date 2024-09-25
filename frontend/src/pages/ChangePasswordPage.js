import React, { useState } from "react";
import "../styles/FormStyles.css"; // Ensure the path is correct
import AlertModal from "../components/modal/AlertModal";

function ChangePasswordPage() {
  const [formState, setFormState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: "",
    successMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      error: "", // Reset error message on input change
      successMessage: "", // Reset success message on input change
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = formState;

    if (newPassword !== confirmPassword) {
      setFormState((prevState) => ({
        ...prevState,
        error: "New passwords don't match!",
        successMessage: "",
      }));
      return;
    }

    console.log("Old Password:", formState.oldPassword);
    console.log("New Password:", newPassword);

    // Assuming the password change is successful
    setFormState((prevState) => ({
      ...prevState,
      successMessage: "New Password Created!",
      error: "",
    }));

    // Handle password change logic here (e.g., API call)
  };

  const inputs = [
    {
      id: 1,
      name: "oldPassword",
      type: "password",
      placeholder: "Old Password",
      label: "Old Password",
      required: true,
    },
    {
      id: 2,
      name: "newPassword",
      type: "password",
      placeholder: "New Password",
      label: "New Password",
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h1>Change Password</h1>
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
                value={formState[item.name]}
                onChange={handleChange} // Use single change handler
              />
            </label>
          </div>
        ))}
        {formState.error && <AlertModal message={formState.error} status={false} />}
        {formState.successMessage && <AlertModal message={formState.successMessage} status={true} />}
        <button
          type="submit"
          className="w-1/2 py-3 rounded-md bg-primary-dark text-white hover:bg-opacity-90"
        >
          Save Changes
        </button>
        <a href="/profile" className="text-sm underline mt-2">
          Back to profile
        </a>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
