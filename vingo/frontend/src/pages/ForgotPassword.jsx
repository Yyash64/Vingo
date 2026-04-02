import React from "react";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const handleSendOtp = async() => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        {
          email,
        },
      );
      console.log(result);
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }
  const handleVerifyOtp = async() => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        {
          email,
          otp: OTP,
        },
      );
      console.log(result);
      setStep(3);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  }
  const handleResetPassword = async() => {
    if(newpassword !== confirmPassword){
      console.error("Passwords do not match");
      return;
    }
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        {
          email,
          newPassword: newpassword,
        },
      );
      console.log(result);
      navigate("/signin");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  }

       
  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-2 mb-4">
          <IoIosArrowBack size={25} className="mt-1 cursor-pointer text-[#ff4d2d]" onClick={()=>navigate("/signIn")} />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className="mb-6">
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
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
             <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e64323]"
          onClick={handleSendOtp}
        >
          Send OTP
        </button>
          </div>
        )}
        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="OTP"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter OTP
              </label>
              <input
                placeholder="Enter OTP"
                type="email"
                id="Email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
             <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e64323]"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>
          </div>
        )}
          {step == 3 && (
            <div>
              <div className="mb-6">
                <label
                  htmlFor="Password"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Enter New Password
                </label>
                <input
                  placeholder="Enter new password"
                  type="password"
                  id="Password"
                  className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label
                  htmlFor="Password"
                  className="mt-4 block text-gray-700 font-medium mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  placeholder="Confirm new password"
                  type="password"
                  id="Password"
                  className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white cursor-pointer hover:bg-[#e64323]"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          )}

      </div>
    </div>
  );
}

export default ForgotPassword;
