import { User } from "../models/user.model";
import { asyncHandler } from "../utils";
import { 
  GOOGLE_OAUTH_SCOPES, 
  GOOGLE_OAUTH_URL, 
  GOOGLE_CLIENT_ID, 
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_TOKEN_INFO_URL,
  FRONTEND_URL
} from "../config";
import { generateAccessToken } from "./signIn.controller";
import { CookieOptions } from "express";

export const signUpGoogle = asyncHandler(async(req, res) => {
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});

export const googleCallback = asyncHandler(async (req, res) => {
    const { code } = req.query;

    if (!code) {
        return res.redirect(`${FRONTEND_URL}/login?error=MissingCode`);
    }

    // Exchange code for token
    const tokenRes = await fetch(GOOGLE_ACCESS_TOKEN_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code: code as string,
            client_id: GOOGLE_CLIENT_ID!,
            client_secret: GOOGLE_CLIENT_SECRET!,
            redirect_uri: "https://note-api-bepr.onrender.com/api/v1/google/googleCallback",
            grant_type: "authorization_code",
        }).toString()
    });

    const tokenData = await tokenRes.json();

    const { id_token } = tokenData;

    if (!id_token) {
        return res.redirect(`${FRONTEND_URL}/login?error=InvalidToken`);
    }

    // Fetch user info using id_token
    const userInfoRes = await fetch(`${GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
    const userInfo = await userInfoRes.json();

    const { email, name, picture, sub: googleId } = userInfo;

    if (!email || !googleId) {
        return res.redirect(`${FRONTEND_URL}/login?error=MissingGoogleData`);
    }

    let user = await User.findOne({
        $or: [{ email }, { googleId }],
    });

    if (!user) {
        user = await User.create({
            email,
            fullName: name,
            googleId,
            avatar: picture,
        });
    } else {
        await User.findOneAndUpdate(
            { email: user.email },
            {
                fullName: name,
                avatar: picture,
                googleId,
            }
        );
    }

    const { accessToken } = await generateAccessToken(user._id.toString());

    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    
    return res.redirect(`${FRONTEND_URL}/dashboard`);
});
