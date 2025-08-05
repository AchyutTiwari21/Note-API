import { Router } from "express";
import { sendOTP } from "../controllers/otp.controller";
import { signUp } from "../controllers/signUp.controller";
import { signIn } from "../controllers/signIn.controller";
import { signOut } from "../controllers/signOut.controller";
import { verifyJWT } from "../middleware/auth.middleware";
import { signUpGoogle } from "../controllers/google.controller";
import { getUserData } from "../controllers/userData.controller";
import { loginAsGuest } from "../controllers/loginAsGuestUser";

const router = Router();

router.route("/send-otp").post(sendOTP);

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").post(verifyJWT, signOut);

router.route("/loginAsGuest").post(loginAsGuest);

router.route("/me").get(verifyJWT, getUserData);

router.route("/signupWithGoogle").get(signUpGoogle);

export default router;