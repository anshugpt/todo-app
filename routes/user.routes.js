import express from "express";
import {
  handleSignUp,
  handleSignIn,
  handleLogout,
} from "../controllers/user.controller.js";

const router = express.Router();

// Sign Up route
router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", handleSignUp);

// Sign In route
router.get("/signin", (req, res) => res.render("signin"));
router.post("/signin", handleSignIn);

// Logout route
router.get("/logout", handleLogout);

export default router;
