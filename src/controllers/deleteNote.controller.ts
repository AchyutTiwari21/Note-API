import { Notes } from "../models/note.model";
import { asyncHandler, ApiResponse } from "../utils";

export const deleteNote = asyncHandler(async (req, res) => {
    try {
        // @ts-ignore
        const user = req?.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const { noteId } = req.params;
        const note = await Notes.findOneAndDelete({ _id: noteId, user: user._id });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        return res.status(200).json(
            new ApiResponse(200, note, "Note deleted successfully", true)
        );
    } catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting note"
        });
    }
});
