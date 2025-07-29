import express from "express";
import {
  handleSignUp,
  handleSignIn,
  handleLogout,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

// Sign Up route
router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", handleSignUp);

// Sign In route
router.get("/signin", (req, res) => res.render("signin"));
router.post("/signin", handleSignIn);

// Logout route
router.get("/logout", handleLogout);

// Profile routes
router.get("/profile", isAuthenticated, getProfile);
router.post("/profile", isAuthenticated, updateProfile);

export default router;
