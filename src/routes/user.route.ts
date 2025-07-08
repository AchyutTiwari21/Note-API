import { Router } from "express";
import { sendOTP } from "../controllers/otp.controller";
import { signUp } from "../controllers/signUp.controller";
import { signIn } from "../controllers/signIn.controller";

const router = Router();

router.route("/send-otp").post(sendOTP);
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);

export default router;