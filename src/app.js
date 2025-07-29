import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "../middleware/auth.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "21kb" }));
app.use(express.urlencoded({ extended: true, limit: "21kb" }));
app.use(cookieParser());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

// import routes
import userRoutes from "../routes/user.routes.js";
import todoRoutes from "../routes/todo.routes.js";
import { getTodos } from "../controllers/todo.controller.js";

// Public routes
app.use("/user", userRoutes);
app.use("/todos", todoRoutes);

// Protected home route
app.get("/", isAuthenticated, getTodos);

export { app };
