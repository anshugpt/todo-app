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

app.set("view engine", "ejs");
app.set("views", "./views");

// import routes
import userRoutes from "../routes/user.routes.js";

// Public routes
app.use("/user", userRoutes);

// Protected home route
app.get("/", isAuthenticated, (req, res) => {
  res.render("home", {
    username: req.user.username,
    fullName: req.user.fullName,
    email: req.user.email,
    todos: [], // or fetch user's todos
  });
});

export { app };
