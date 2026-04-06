import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        city:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload;
        },
        setUserCity:(state,action)=>{
            state.city=action.payload;
        }
    }
});

export const {setUserData,setUserCity}=userSlice.actions;
export default userSlice.reducer;