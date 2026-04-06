import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        currentCity:null,
        currentState:null,
        currentAddress:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload;
        },
        setUserCity:(state,action)=>{
            state.currentCity=action.payload;
        },
        setUserState:(state,action)=>{
            state.currentState=action.payload;
        },
        setUserAddress:(state,action)=>{
            state.currentAddress=action.payload;
        }
    }
});

export const {setUserData,setUserCity,setUserState,setUserAddress}=userSlice.actions;
export default userSlice.reducer;