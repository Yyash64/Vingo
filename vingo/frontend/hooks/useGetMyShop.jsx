import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../src/App";
import  {setMyShopData}  from "./../redux/ownerSlice";
import { useDispatch } from "react-redux";

function useGetMyShop() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/my-shop`, {
          withCredentials: true,
        });
        dispatch(setMyShopData(result.data.shop));
      } catch (error) {
        console.error("Error fetching my shop:", error);
      }
    };

    fetchMyShop();
  }, [dispatch]);                   
}

export default useGetMyShop;
