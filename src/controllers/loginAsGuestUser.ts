import { User } from "../models/user.model";
import { asyncHandler, ApiResponse } from "../utils";
import { CookieOptions } from "express";

export const generateAccessToken = async function(userId: string) {
    try {
        const user = await User.findById(userId);
        const accessToken = user?.generateAccessToken();

        return {accessToken};
    } catch (error) {
        console.error("Error generating access token:", error);
        throw new Error("Failed to generate access token");
    }
}

export const loginAsGuest = asyncHandler(async (req, res) => {
    try {
        const { email, fullName } = req.body;
    
        if (!email || !fullName) {
            res.status(400).json({
                success: false,
                message: "Email and Full Name are required"
            });
            return;
        }

        // Check if the user exists
        const user = await User.findOne({ email });

        if(!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const { accessToken } = await generateAccessToken(user._id.toString());

        if (!accessToken) throw new Error("Access Token required");

        const options: CookieOptions = {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        };

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: {
                        _id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        dob: user?.dob
                    }, 
                    accessToken
                },
                "User logged In Successfuly",
                true
            )
        );
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
});