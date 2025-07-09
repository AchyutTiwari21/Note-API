import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "./config";

const app = express();

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRoutes from "./routes/user.route";
app.use("/api/v1/user", userRoutes);

import noteRoutes from "./routes/note.route";
app.use("/api/v1/note", noteRoutes);

export { app }