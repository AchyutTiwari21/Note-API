import { Router } from "express";
import { addNote } from "../controllers/addNote.controller";
import { getNotes } from "../controllers/getNote.controller";
import { verifyJWT } from "../middleware/auth.middleware";

const router = Router();

// Authenticated routes
router.route("/add-note").post(verifyJWT, addNote);
router.route("/get-notes").get(verifyJWT, getNotes);

export default router;