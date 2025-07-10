import { Router } from "express";
import { googleCallback } from "../controllers/google.controller";

const router = Router();

router.route("/googleCallback").get(googleCallback);

export default router;