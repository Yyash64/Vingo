import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function SignIn() {
  const primaryColor = "#FF4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white border rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Log in to your account to start ordering delicious food from your
          favorite restaurants!
        </p>
        {/* email */}
        <div className="mb-4">
          <label
            htmlFor="Email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            placeholder="Enter your email"
            type="email"
            id="Email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/*Password*/}
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              id="Password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              style={{ border: `1px solid ${borderColor}` }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div
          className="text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer hover:underline"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </div>
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e64323]"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-100">
          <FcGoogle size={20} />
          Sign In with Google
        </button>
        <p onClick={() => navigate("/signup")} className="text-center mt-6">
          Do not have an account?
          <span className="text-blue-500 hover:underline cursor-pointer">
            {" "}
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
