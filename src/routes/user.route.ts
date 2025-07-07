import { Router } from "express";
import { sendOTP } from "../controllers/otpController";
import { signUp } from "../controllers/signUpController";
import { signIn } from "../controllers/signInController";

const router = Router();

router.route("/send-otp").post(sendOTP);
router.route("/signup").post(signUp);
router.route("/signin").post(signIn)

export default router;