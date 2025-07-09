import { Notes } from "../models/note.model";
import { asyncHandler, ApiResponse } from "../utils";

export const updateNote = asyncHandler(async (req, res) => {
    try {
        //@ts-ignore
        const user = req?.user;

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const { title, content, type, items, pinned } = req.body;

        if (!title && !content) {
            return res.status(400).json({
                success: false,
                message: "Title or content are required"
            });
        }

        const { noteId } = req.params;

        const note = await Notes.findById(noteId);

        if(!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        const updatedNote = await Notes.findOneAndUpdate(
            {
                _id: noteId,
                user: user._id
            },
            {
                title: title || note.title,
                content: content || note.content,
                type: type || note.type,
                items: items || note.items,
                pinned: pinned || note.pinned
            }
        );

        if(!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res
        .status(200)
        .json( new ApiResponse(200, null, "Note updated successfully!", true) );

        return;
    } catch (error) {
        return res.status(500).json({
            message: "Error while updating notes",
            success: false
        });
    }
});