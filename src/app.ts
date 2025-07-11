import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "./config";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
});

app.use(limiter);

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/keep-alive', (req, res) => {
  res.status(200).send('OK');
});

import userRoutes from "./routes/user.route";
app.use("/api/v1/user", userRoutes);

import noteRoutes from "./routes/note.route";
app.use("/api/v1/note", noteRoutes);

import googleRoutes from "./routes/google.route";
app.use("/api/v1/google", googleRoutes);

export { app }