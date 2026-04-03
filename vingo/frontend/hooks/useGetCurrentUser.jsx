import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../src/App";
import  {setUserData}  from "./../redux/userSlice";
import { useDispatch } from "react-redux";

function useGetCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data.user));
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
