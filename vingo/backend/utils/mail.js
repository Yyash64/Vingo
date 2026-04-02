import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); 
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail=async(to,otp)=>{
    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Your OTP for password reset",
        html: `<p>Your OTP for password reset is: <b>${otp}</b>. It will expire in 10 minutes.</p>`
    })
}