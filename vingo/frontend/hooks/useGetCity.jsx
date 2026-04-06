import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { setUserCity } from "./../redux/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function useGetCity() {
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEOAPI_KEY;
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apikey}`,
      );
      dispatch(setUserCity(result?.data?.features[0].properties.city));
    });
  }, [userData, dispatch, apikey]);
}

export default useGetCity;
