import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice";

function SignUp() {
  const primaryColor = "#FF4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();

  
  const handleSignUp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true },
      );
      setError("");
      dispatch(setUserData(result.data.user));
    } catch (error) {
      setError(error?.response?.data?.message || "Error signing up");
    }finally {
      setLoading(false);
    }
  };
  const handleGoogleAuth = async () => {
    if (!mobile || !role) {
      setError("Please fill all the fields before signing up with Google");
      return;
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          name: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true },
      );
      dispatch(setUserData(data.user));
    } catch (error) {
      setError(
        error?.response?.data?.message || "Error signing in with Google",
      );
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
          Create your account to start ordering delicious food from your
          favorite restaurants!
        </p>
        {/* fullName */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-1"
          >
            FullName
          </label>
          <input
            required
            placeholder="Enter your full name"
            type="text"
            id="name"
            className="w-full border rounded-lg px-3 py-2  focus:outline-none"
            style={{ border: `1px solid ${borderColor}` }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* email */}
        <div className="mb-4">
          <label
            required
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
        {/* Mobile */}
        <div className="mb-4">
          <label
            htmlFor="Mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            required
            placeholder="Enter your mobile number"
            type="text"
            id="Mobile"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
              required
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
        {/*role*/}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryboy"].map((r) => (
              <button
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors"
                onClick={() => setRole(r)}
                style={
                  role === r
                    ? {
                        backgroundColor: primaryColor,
                        color: "#fff",
                        border: `1px solid ${primaryColor}`,
                      }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: "black",
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e64323]"
          onClick={handleSignUp} disabled={loading}
        >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Sign Up"}
        
        </button>
        {error && <p className="text-red-500 text-center mt-5">*{error}</p>}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-100"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          Sign Up with Google
        </button>
        <p onClick={() => navigate("/signin")} className="text-center mt-6">
          Already have an account?
          <span className="text-blue-500 hover:underline cursor-pointer">
            {" "}
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
