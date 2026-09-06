import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { Tender } from "./models/Tender.js";

dotenv.config();

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("🌱 Seeding default users into MongoDB Atlas...");

      // 1. Procurement Officer
      const officer = new User({
        email: "procurement.officer@cpcl.gov.in",
        password: "Officer#2026",
        name: "Dr. K. S. Ramanathan",
        role: "OFFICER",
        roleTitle: "Chief Procurement Officer",
        orgName: "CPCL / Ministry of Petroleum & Natural Gas",
        avatarInitial: "O"
      });
      await officer.save();

      // 2. Registered Bidder
      const bidder = new User({
        email: "tenders@abcengineering.com",
        password: "Demo@GeM2026",
        name: "ABC Engineering Ltd",
        role: "BIDDER",
        roleTitle: "Registered Bidder",
        orgName: "ABC Engineering Ltd (Chennai)",
        gstin: "33AABCA1234F1Z5",
        avatarInitial: "A"
      });
      await bidder.save();

      console.log("✅ Default users created successfully:");
      console.log("   - Officer: procurement.officer@cpcl.gov.in / Officer#2026");
      console.log("   - Bidder: tenders@abcengineering.com / Demo@GeM2026");
    }

    const tenderCount = await Tender.countDocuments();
    if (tenderCount === 0) {
      console.log("🌱 Seeding default tenders into MongoDB Atlas...");

      const tender1 = new Tender({
        referenceNumber: "CPCL/2026/TE/045",
        title: "Engineering, Procurement & Construction (EPC) of Crude Distillation Unit (CDU-III)",
        department: "Chennai Petroleum Corporation Ltd (CPCL)",
        category: "Works & Infrastructure",
        estimatedValue: 485000000,
        closingDate: "2026-09-30",
        status: "ACTIVE",
        biddersCount: 4,
        documentsRequired: [
          "Audited Balance Sheets (Last 3 FYs)",
          "GST Registration Certificate",
          "Make in India (MII) Statutory Declaration",
          "Technical Compliance BOQ",
          "EPFO / ESIC Statutory Deposit Challans",
          "Earnest Money Deposit (EMD) Bank Guarantee"
        ],
        documentsSubmitted: [
          {
            docId: "doc-01",
            title: "GST Registration Certificate (Form REG-06)",
            docType: "GST_CERT",
            fileName: "ABC_Engg_GST_Reg06.pdf",
            fileSize: "1.4 MB",
            uploadDate: "2026-09-01",
            status: "VERIFIED",
            ocrText: "GOODS AND SERVICES TAX IDENTIFICATION NUMBER: 33AABCA1234F1Z5. LEGAL NAME: ABC ENGINEERING LIMITED. JURISDICTION: TAMIL NADU CHENNAI."
          },
          {
            docId: "doc-02",
            title: "Make in India (MII) Affidavit",
            docType: "MII_AFFIDAVIT",
            fileName: "Annexure_IV_MII_Affidavit.pdf",
            fileSize: "850 KB",
            uploadDate: "2026-09-02",
            status: "FLAGGED",
            ocrText: "We certify that local value addition across all equipment supplies shall exceed 75.4% as per PPP-MII Order 2017."
          },
          {
            docId: "doc-03",
            title: "Technical Bill of Quantities (BOQ)",
            docType: "TECHNICAL_SPEC",
            fileName: "Technical_BOQ_Priced_Spec.pdf",
            fileSize: "4.2 MB",
            uploadDate: "2026-09-02",
            status: "FLAGGED",
            ocrText: "Line Item 14.2: High-pressure forged valves (Grade 316) imported directly from OEM facilities in Munich, Germany."
          }
        ],
        aiEvaluation: {
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
        }
      });
      await tender1.save();

      console.log("✅ Default tender CPCL/2026/TE/045 seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// If run directly via `node seed.js`
if (process.argv[1]?.endsWith("seed.js")) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log("Connected to MongoDB Atlas for seeding...");
      await seedDatabase();
      mongoose.disconnect();
      process.exit(0);
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      process.exit(1);
    });
}
