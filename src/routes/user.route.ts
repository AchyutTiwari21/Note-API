import { Router } from "express";
import { sendOTP } from "../controllers/otp.controller";
import { signUp } from "../controllers/signUp.controller";
import { signIn } from "../controllers/signIn.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { addNote } from "../controllers/addNote.controller";

const router = Router();

router.route("/send-otp").post(sendOTP);
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

// Authenticated routes
router.route("/add-note").post(verifyJWT, addNote);
// router.route("/get-notes").get(verifyJWT, getNotes);

export default router;