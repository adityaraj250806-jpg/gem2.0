import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import tenderRoutes from "./routes/tenders.js";
import { seedDatabase } from "./seed.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "*", // allow all origins for SIH deployment & local dev
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "GemxAI Sovereign Procurement API",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tenders", tenderRoutes);

// MongoDB Atlas Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in environment variables!");
  process.exit(1);
}

console.log("⏳ Connecting to MongoDB Atlas Cloud Cluster...");

mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log("✅ Successfully connected to MongoDB Atlas (Database: gemxai)!");
    
    // Auto-seed default accounts & tenders if empty
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 GemxAI API Server running on http://localhost:${PORT}`);
      console.log(`📡 Endpoints:`);
      console.log(`   - POST /api/auth/login`);
      console.log(`   - POST /api/auth/register`);
      console.log(`   - GET  /api/auth/me`);
      console.log(`   - GET  /api/tenders`);
      console.log(`   - POST /api/tenders/:id/analyze`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Atlas connection error:", err.message);
  });
