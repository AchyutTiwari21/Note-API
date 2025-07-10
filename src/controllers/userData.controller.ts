import { User } from "../models/user.model";
import { asyncHandler, ApiResponse } from "../utils";

export const getUserData = asyncHandler(async(req, res) => {
    try {
        // @ts-ignore
        const user = req?.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const existingUser = await User.findById(user._id)
        .select("-__v -createdAt -updatedAt")
        .populate({
            path: 'notes',
            select: "-__v -type -items -pinned -archived -user"
        });


        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                existingUser, 
                "User data retrieved successfully.", 
                true
            )
        );
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while retrieving user data."
        });
    }
})