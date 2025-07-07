import { Router } from "express";
import { sendOTP } from "../controllers/otpController";
import { signUp } from "../controllers/signUpController";

const router = Router();

router.route("/send-otp").post(sendOTP);
router.route("/signup").post(signUp);

export default router;