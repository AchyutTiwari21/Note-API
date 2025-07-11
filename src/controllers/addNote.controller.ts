import { Notes } from "../models/note.model";
import { User } from "../models/user.model";
import { asyncHandler, ApiResponse } from "../utils";

export const addNote = asyncHandler(async (req, res) => {
    try {
        // Check if the user is authenticated
        //@ts-ignore
        const user = req?.user;

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const { title, content, type, items, pinned } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const note = await Notes.create({
            title,
            content,
            type: type || 'text',
            items: items || [],
            pinned: pinned || false,
            user: user._id
        });

        await User.findByIdAndUpdate(user._id, {
            $push: { notes: note._id }
        });

        return res
        .status(201)
        .json(
            new ApiResponse(201, null, "Note added successfully!", true)
        );
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while adding note"
        });
    }
});