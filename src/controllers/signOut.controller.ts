import { asyncHandler, ApiResponse } from "../utils";
import { CookieOptions } from "express";

export const signOut = asyncHandler(async (req, res) => {
    
    const options: CookieOptions = {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(
        new ApiResponse(
            200, 
            {}, 
            "User logged Out",
            true
        )
    );
})