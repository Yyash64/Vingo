import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role, mobile } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists" });
    }
    if (!password || password.length < 6) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (!mobile || mobile.length != 10) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "mobile no must be of 10 digits" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      password: hashedPassword,
      email,
      role,
      mobile,
    });
    const { password: _, ...userData } = newUser._doc;
    const token = await genToken(newUser._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(StatusCodes.CREATED).json({
      user: userData,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error:" + error.message });
  }
};

export const signIn=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await findOne(email);
        if(!user){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid email"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid password"})
        }
        const token=await genToken(user._id);
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        });
        const {password:_,...userData}=user._doc;
        return res.status(StatusCodes.OK).json({user:userData})
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error:"+error.message})
    }
    
};

export const signOut=async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(StatusCodes.OK).json({message:"Logged out successfully"})
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server signout error:"+error.message})
    }
}
