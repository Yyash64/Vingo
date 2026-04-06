import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "./../../redux/userSlice";
function Nav() {
  const [showinfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { userData, city } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      // console.log(result);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      {showSearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] z-[9999] md:hidden ">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px]  border-r-[2px] border-gray-400 ">
            <FaLocationDot size={20} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600"> {city}</div>
          </div>
          <div className="flex w-[80%] items-center gap-[10px] px-[10px] ">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              className="outline-none w-[200px] md:w-[300px] lg:w-[400px]"
            />
          </div>
        </div>
      )}
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex ">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px]  border-r-[2px] border-gray-400 ">
          <FaLocationDot size={20} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600"> {city}</div>
        </div>
        <div className="flex w-[80%] items-center gap-[10px] px-[10px] ">
          <IoIosSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            className="outline-none w-[200px] md:w-[300px] lg:w-[400px]"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {showSearch ? (
          <MdOutlineClose
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        ) : (
          <IoIosSearch
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}

        <div className="relative cursor-pointer">
          <FiShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute -top-2 -right-2 bg-[#ff4d2d] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            0
          </span>
        </div>
        <button className="hidden md:block bg-[#ff4d2d]/10 text-[#ff4d2d] rounded-lg px-3 py-1 text-sm font-medium">
          My Orders
        </button>
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo(!showinfo)}
        >
          {userData ? userData.name.slice(0, 1) : null}
        </div>
        {showinfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold max-w-[200px] ">
              {userData.name.length > 15
                ? userData.name.slice(0, 15) + "..."
                : userData.name}
            </div>
            <div className="cursor-pointer md:hidden text-[#ff4d2d]">
              My Orders
            </div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer" onClick={handleLogout}>
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
