import express from "express";
import { Tender } from "../models/Tender.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/tenders - List all tenders
router.get("/", async (req, res) => {
  try {
    const tenders = await Tender.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: tenders.length, data: tenders });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching tenders.", error: error.message });
  }
});

// GET /api/tenders/:id - Get specific tender
router.get("/:id", async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) {
      return res.status(404).json({ success: false, message: "Tender not found." });
    }
    return res.json({ success: true, data: tender });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching tender.", error: error.message });
  }
});

// POST /api/tenders/:id/analyze - Run AI Verification on tender documents
router.post("/:id/analyze", authenticateToken, async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) {
      return res.status(404).json({ success: false, message: "Tender not found." });
    }

    // AI Forensic Evaluation Simulation based on GFR 2017 standards
    const evaluation = {
      complianceScore: 82,
      riskLevel: "LOW",
      aiAdvisory: "CONDITIONAL",
      analyzedAt: new Date(),
      contradictions: [
        {
          id: "contra-01",
          title: "Make in India (MII) Local Content Discrepancy",
          severity: "HIGH",
          docA: {
            title: "MII Statutory Declaration (Annexure-IV)",
            quote: "We hereby declare 75.4% domestic local value addition compliant with Class-I Local Supplier status.",
            page: 2
          },
          docB: {
            title: "Technical Bill of Quantities (BOQ)",
            quote: "Line Item 14.2: High-pressure forged valves (Grade 316) imported directly from OEM facilities in Munich, Germany.",
            page: 18
          },
          advisory: "Procurement Officer should issue official clarification notice requesting certificate of origin and revised local value breakdown."
        }
      ]
    };

    tender.aiEvaluation = evaluation;
    tender.status = "EVALUATION";
    await tender.save();

    return res.json({
      success: true,
      message: "AI Forensic Verification completed successfully.",
      evaluation: tender.aiEvaluation
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error running AI analysis.", error: error.message });
  }
});

export default router;
