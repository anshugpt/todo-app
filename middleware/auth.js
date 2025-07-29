import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers["authorization"];
    if (!token) {
      return res.redirect("/user/signin");
    }

    const user = await User.findByToken(token);
    if (!user) {
      return res.redirect("/user/signin");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.redirect("/user/signin");
  }
};
