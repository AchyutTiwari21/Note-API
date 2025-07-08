import { User } from "../models/user.model";
import { asyncHandler, ApiResponse } from "../utils";

export const signOut = asyncHandler(async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

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