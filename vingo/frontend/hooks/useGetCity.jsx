import { useEffect } from "react";
import axios from "axios";
import { setUserCity } from "./../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

function useGetCity() {
  const dispatch = useDispatch();
  const apikey = import.meta.env.VITE_GEOAPI_KEY;
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apikey}`
          );

          const city = result?.data?.features?.[0]?.properties?.city;

          if (city) {
            dispatch(setUserCity(city));
          }
        } catch (error) {
          console.error("Failed to fetch city:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error.message);
      }
    );
  }, [dispatch, apikey]); 

}

export default useGetCity;