import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import ownerSlice from "./userSlice";
export const store = configureStore({
    reducer: {
        user: userSlice,
        owner: ownerSlice,
    },
})
