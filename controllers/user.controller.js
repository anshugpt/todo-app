import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; // Use named import

// Sign Up Controller
export const handleSignUp = asyncHandler(async (req, res) => {
  const { username, fullName, email, password } = req.body;
  if ([username, fullName, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  const user = await User.create({
    username,
    fullName,
    email,
    password,
  });

  // Generate tokens if needed
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Optionally save refreshToken to user
  user.refreshToken = refreshToken;
  await user.save();

  // Set access token in cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // Redirect to home page
  res.redirect("/");
});

// Sign In Controller
export const handleSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate tokens if needed
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Optionally save refreshToken to user
  user.refreshToken = refreshToken;
  await user.save();

  // Set access token in cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  // Redirect to home page
  res.redirect("/");
});

// Logout Controller
export const handleLogout = asyncHandler(async (req, res) => {
  // Clear the access token cookie
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // Optionally, clear refreshToken from user in DB if you use it
  // if (req.user) {
  //   req.user.refreshToken = "";
  //   await req.user.save();
  // }

  // Redirect to sign in page
  res.redirect("/user/signin");
});
