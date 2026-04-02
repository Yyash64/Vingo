import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { serverUrl } from '../src/App';
function useGetCurrentUser() {
    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
         console.log("Current User:", result);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      }

      fetchCurrentUser();
    }, []);

}

export default useGetCurrentUser