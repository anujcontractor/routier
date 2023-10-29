import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req,res,next) => {
    let token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);

            req.user = await User.findById(decoded.userID).select('-password');
            // console.log(req.user);
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Invalid token");
        }
    }else{
        res.status(401);
        throw new Error("Not authorised, no token");
    }
});

export {protect} 