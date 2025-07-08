import { Router } from "express";
import { addNote } from "../controllers/addNote.controller";
import { getNotes } from "../controllers/getNote.controller";
import { deleteNote } from "../controllers/deleteNote.controller";
import { updateNote } from "../controllers/updateNote.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router();

// Authenticated routes
router.route("/add-note").post(verifyJWT, addNote);
router.route("/get-notes").get(verifyJWT, getNotes);
router.route("/delete-note/:noteId").delete(verifyJWT, deleteNote);
router.route("/update-note/:noteId").put(verifyJWT, updateNote);

export default router;