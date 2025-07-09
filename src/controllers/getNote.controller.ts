import { Notes } from "../models/note.model";
import { asyncHandler, ApiResponse } from "../utils";

export const getNotes = asyncHandler(async (req, res) => {
    try {
        // @ts-ignore
        const user = req?.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const notes = await Notes.find({ user: user._id }).select("-__v -type -items -pinned -archived -user");
        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                notes, 
                "Notes retrieved successfully", 
                true
            )
        );
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while retrieving notes"
        });
    }
})
