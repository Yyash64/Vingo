import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role, mobile } = req.body;
    const user = await User.findOne({ email });
    if (!name || !email || !password || !mobile || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (mobile.length != 10) {
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
    console.log("Error in signUp controller:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error:" + error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email does not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid password" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const { password: _, ...userData } = user._doc;
    return res.status(StatusCodes.OK).json({ user: userData });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error:" + error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(StatusCodes.OK)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server signout error:" + error.message });
  }
};
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User with this email does not exist" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpire = new Date(Date.now() + 5 * 60 * 1000);
    user.isOtpVerified = false;
    await user.save();
    await sendOtpMail(email, otp);
    return res.status(StatusCodes.OK).json({ message: "OTP sent to email" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error:" + error.message });
  }
};
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpire < new Date()) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid OTP" });
    }
    user.isOtpVerified = true;
    user.resetOtp = null;
    user.otpExpire = null;
    await user.save();
    return res
      .status(StatusCodes.OK)
      .json({ message: "OTP verified successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error:" + error.message });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid request" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Password reset successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error:" + error.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        mobile,
        role,
      });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const { password: _, ...userData } = user._doc;
    return res.status(StatusCodes.OK).json({ user: userData });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error:" + error.message });
  }
};
