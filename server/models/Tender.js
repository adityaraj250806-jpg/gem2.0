import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  docId: { type: String, required: true },
  title: { type: String, required: true },
  docType: { type: String, required: true }, // GST_CERT, BALANCE_SHEET, TECHNICAL_SPEC, MII_AFFIDAVIT
  fileName: { type: String, required: true },
  fileSize: { type: String, default: "1.2 MB" },
  uploadDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
  status: { type: String, enum: ["VERIFIED", "FLAGGED", "PENDING"], default: "VERIFIED" },
  ocrText: { type: String, default: "" },
  forensicMetadata: { type: mongoose.Schema.Types.Mixed, default: {} }
});

const contradictionSchema = new mongoose.Schema({
  id: String,
  title: String,
  severity: { type: String, enum: ["HIGH", "MEDIUM", "LOW"], default: "HIGH" },
  docA: {
    title: String,
    quote: String,
    page: Number
  },
  docB: {
    title: String,
    quote: String,
    page: Number
  },
  advisory: String
});

const tenderSchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    title: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: "Works & Infrastructure"
    },
    estimatedValue: {
      type: Number,
      required: true
    },
    closingDate: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["ACTIVE", "EVALUATION", "AWARDED"],
      default: "ACTIVE"
    },
    documentsRequired: [String],
    documentsSubmitted: [documentSchema],
    biddersCount: {
      type: Number,
      default: 0
    },
    aiEvaluation: {
      complianceScore: { type: Number, default: 82 },
      riskLevel: { type: String, enum: ["LOW", "MEDIUM", "CRITICAL"], default: "LOW" },
      aiAdvisory: { type: String, default: "CONDITIONAL" },
      contradictions: [contradictionSchema],
      analyzedAt: { type: Date }
    }
  },
  {
    timestamps: true
  }
);

export const Tender = mongoose.model("Tender", tenderSchema);
