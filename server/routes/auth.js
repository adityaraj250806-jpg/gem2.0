import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET || "gemxai_fallback_secret",
    { expiresIn: "7d" }
  );
};

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address with '@' and domain."
      });
    }

    // Strict role isolation: an account created as Officer cannot be used for Bidder and vice-versa
    const query = { email: email.toLowerCase().trim() };
    if (role) {
      query.role = role.toUpperCase();
    }

    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No account exists with these credentials."
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please check your credentials."
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        roleTitle: user.roleTitle,
        orgName: user.orgName,
        avatarInitial: user.avatarInitial
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login.",
      error: error.message
    });
  }
});

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, role, orgName, gstin } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required."
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address containing '@' and domain."
      });
    }

    const nameRegex = /^[A-Za-z\s.'-]+$/;
    if (!nameRegex.test(name.trim())) {
      return res.status(400).json({
        success: false,
        message: "Name should only contain alphabetic letters and spaces."
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists. An email can only be registered once."
      });
    }

    const newUserRole = role === "OFFICER" ? "OFFICER" : "BIDDER";
    const roleTitle = newUserRole === "OFFICER" ? "Procurement Officer" : "Registered Bidder";
    const avatarInitial = name.charAt(0).toUpperCase();

    const user = new User({
      email,
      password,
      name,
      role: newUserRole,
      roleTitle,
      orgName: orgName || (newUserRole === "OFFICER" ? "CPCL / Ministry of Petroleum" : "ABC Engineering Ltd"),
      gstin: gstin || "",
      avatarInitial
    });

    await user.save();

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        roleTitle: user.roleTitle,
        orgName: user.orgName,
        avatarInitial: user.avatarInitial
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration.",
      error: error.message
    });
  }
});

// GET /api/auth/me
router.get("/me", authenticateToken, async (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
});

export default router;
