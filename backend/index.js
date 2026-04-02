import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.listen(PORT,()=>{
    connectDb
    console.log(`Server started at ${PORT}`)
})