import { asyncHandler } from "../utils/index";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
        if (!ACCESS_TOKEN_SECRET) {
            res.status(500).json({
                message: "Access token secret is not defined in environment variables.",
                success: false
            });
            return;
        }

        const authHeader = req.headers["Authorization"];

        const token = req.cookies?.accessToken ||
        (typeof authHeader === "string" ? authHeader.replace("Bearer ", "") : undefined);
    
        if(!token) {
            res.status(401).json({
                message: "Access token is required.",
                success: false
            });
            return;
        }

        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        if(typeof(decodedToken) === "string") {
            res.status(500).json({
                message: "Type of decoded token is not jwt payload.",
                success: false
            });
            return;
        }
    
        const user = await User.findById(decodedToken._id).select("-__v");

        if(!user) {
            res.status(401).json({
                message: "Invalid Access Token",
                success: false
            });
            return;
        }

        // @ts-ignore
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
});