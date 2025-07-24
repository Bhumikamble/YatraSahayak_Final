import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from './routes/user.routes.js';
import postRoutes from './routes/post.route.js';
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});

// API Routes
app.use("/posts", postRoutes);
app.use("/api/v1/users", userRouter);

// Path config for frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../Frontend/dist");

// Serve React frontend static files
app.use(express.static(frontendPath));

// Catch-all: React routes handled by frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Error handler
app.use(errorHandler);

export { app };
