import mongoose from "mongoose";
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully")
    }catch(error){
        console.error("Error connecting to database:", error)
    }
}
export default connectDb;