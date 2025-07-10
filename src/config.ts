import dotenv from "dotenv";

dotenv.config({
    path: './.env'
});

export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const DB_NAME = "Note-App";

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

export const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CALLBACK_URL = "https://note-api-bepr.onrender.com/api/v1/google/googleCallback";
export const GOOGLE_OAUTH_SCOPES = [
"https%3A//www.googleapis.com/auth/userinfo.email",
"https%3A//www.googleapis.com/auth/userinfo.profile",
];

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
export const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_URL;

export const FRONTEND_URL = process.env.FRONTEND_URL;