import dotenv from "dotenv";

dotenv.config({
    path: './.env'
});

export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const DB_NAME = "Note-App";