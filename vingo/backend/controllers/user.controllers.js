import User from "../models/user.model.js";

export const getCurrentUser=async(req,res)=>{
    try{
        const userID=req.userID;
        if(!userID){
            return res.status(401).json({message:"Unauthorized: No user ID found"});
        }
        const user=await User.findById(userID)
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({user});
    } catch(error){
        return res.status(500).json({message:"Internal server error"});
    }
}