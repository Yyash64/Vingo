import jwt from "jsonwebtoken";
const isAuth=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized: No token provided"});
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded || !decoded.userID){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        req.userID=decoded.userID;
        next(); 

    } catch (error) {
        return res.status(401).json({message:"Unauthorized: Invalid token"});
    }

}
export default isAuth;