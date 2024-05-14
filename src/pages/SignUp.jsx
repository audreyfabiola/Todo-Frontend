import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerWithEmailAndPassword } from "../firebase";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate username to disallow spaces
    if (name === "username" && value.includes(" ")) {
      toast.error("Username cannot contain spaces");
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      // Make a POST request to register the user
      const response = await axios.post("http://127.0.0.1:8000/users/", {
        username,
        email,
        password
      });
      console.log("User registered successfully:", response.data);
  
      // Show success message
      toast.success("Registration Successful!");
  
      // Wait for 2.5 seconds before navigating to the login page
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error("Error signing up:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 400 && error.response.data.detail === "Email already registered") {
        toast.error("Email address is already in use");
      } else {
        toast.error(error.response ? error.response.data.detail || error.message : "An error occurred while signing up");
      }
    }
    // Clear the form fields
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <div className="bg-white p-10 rounded-lg shadow-xl">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-pink-400"> Sign Up </h1>
            {/* Sign up form */}
            <form className="mt-4" onSubmit={handleSignUp}>
              <div className="mb-4">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="border rounded-md p-2 w-full"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="border rounded-md p-2 w-full"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="border rounded-md p-2 w-full pr-10"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="mb-4 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="border rounded-md p-2 w-full pr-10"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
              
              {/* Sign up button */}
              <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-full">
                Sign Up
              </button>

              {/* Toast notifications */}
              {/* <ToastContainer /> */}

              {/* Login link */}
              <p className="text-sm text-pink-700 mt-2">
                <span className="text-black">Already have an account? </span>
                <Link to="/" className="hover:underline">
                  Login here.
                </Link>
              </p>
            </form>

          </div>
          
        </div>

        <div className="flex justify-center mt-6">
            <ColorModeSwitcher />
        </div>
          
      </div>
      
    </div>
  );
}
