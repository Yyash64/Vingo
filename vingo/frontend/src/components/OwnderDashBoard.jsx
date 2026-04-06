import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import{ FaUtensils } from "react-icons/fa";
function OwnerDashBoard() {
  const navigate = useNavigate();
  const myShopData = useSelector((state) => state.owner);
  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Nav />
      {myShopData && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full  max-w-md  bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
            <FaUtensils size={25} className="text-[#ff4d2d] mb-4 w-16 h-16  sm:w-20 sm:h-20 " />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Add Your restaurant </h2>
            <p className="text-gray-600 m-b text-sm sm:text-base">Join our platform and start selling your delicious food!</p>
            </div>
            <button className="bg-[#ff4d2d] text-white px-4 py-2 rounded-full mt-6 w-full hover:bg-[#e04324] transition-colors duration-300" onClick={() => navigate('/create-edit-shop')}>
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashBoard;
