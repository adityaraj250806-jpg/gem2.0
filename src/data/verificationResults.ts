export interface VerificationCheck {
  parameter: string;
  status: string;
  type: "success" | "warning" | "error" | string;
  icon: string;
  details: string;
}

export interface VerificationAnomaly {
  id: string;
  title: string;
  severity: "CRITICAL_REVIEW" | "MODERATE" | "LOW" | string;
  description: string;
  evidenceRef: string | null;
}

export interface AiAdvisory {
  status: string;
  statusBadge: string;
  summary: string;
  fullNote: string;
}

export interface VerificationResult {
  bidId: string;
  bidderName: string;
  tenderRef: string;
  evaluatedAt: string;
  complianceScore: number;
  scoreOutOf: number;
  riskLevel: string;
  riskLevelBadge: string;
  aiConfidence: string;
  checks: VerificationCheck[];
  anomaliesCount: number;
  anomalies: VerificationAnomaly[];
  aiAdvisory: AiAdvisory;
}

export const mockVerificationResults: Record<string, VerificationResult> = {
  "BID-001": {
    bidId: "BID-001",
    bidderName: "ABC ENGINEERING LTD",
    tenderRef: "CPCL/2026/TE/045",
    evaluatedAt: "01 Sep 2026, 10:14 AM",
    complianceScore: 82,
    scoreOutOf: 100,
    riskLevel: "LOW RISK",
    riskLevelBadge: "badge-success",
    aiConfidence: "96%",
    checks: [
      {
        parameter: "Udyam / MSME",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "Active Medium Enterprise verified directly against MSME Udyam Databank API."
      },
      {
        parameter: "GST & Returns",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "GSTIN 33AABCA1234F1Z8 active. GSTR-3B & GSTR-1 filed consistently for last 24 months."
      },
      {
        parameter: "PAN / ITR",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "PAN matches corporate CIN. Corporate ITR-6 e-verified for AY 2025-26."
      },
      {
        parameter: "EPFO / ESIC",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "Active EPFO establishment TN/MAS/0048291. TRRN payment confirmed for current payroll cycle."
      },
      {
        parameter: "Make in India",
        status: "INCONSISTENT",
        type: "warning",
        icon: "⚠",
        details: "Material contradiction: Local content declared as 75%, but BOQ lists imported high-pressure pump from Germany."
      },
      {
        parameter: "Blacklisting",
        status: "CLEAR",
        type: "success",
        icon: "✓",
        details: "Cross-checked with CPPP debarment register, GeM incident list, and World Bank listing. No adverse history."
      },
      {
        parameter: "Technical Criteria",
        status: "PASSED",
        type: "success",
        icon: "✓",
        details: "API 6D compliance verified through valid independent lab test reports."
      }
    ],
    anomaliesCount: 2,
    anomalies: [
      {
        id: "ano-1",
        title: "Make-in-India declaration mismatch",
        severity: "CRITICAL_REVIEW",
        description: "Bidder declared 75% local content in Make in India Declaration (Page 3), yet Technical BOQ (Page 64, Line Item 14.2) specifies imported primary valve pump assembly from Germany without adequate domestic value breakdown.",
        evidenceRef: "evidence-mii-boq"
      },
      {
        id: "ano-2",
        title: "Missing supporting document",
        severity: "MODERATE",
        description: "Sub-tier component supplier ISO 9001 quality accreditation certificate referenced on Technical Data Sheet Page 12 is omitted from the submission package.",
        evidenceRef: null
      }
    ],
    aiAdvisory: {
      status: "CONDITIONAL",
      statusBadge: "badge-warning",
      summary: "Human review recommended before final decision.",
      fullNote: "Bidder demonstrates exceptional statutory, tax, and labor compliance (Score 82/100, Low General Risk). However, an unresolved material discrepancy exists between the Make-in-India declaration (75% claimed local content) and the Technical BOQ (imported core components from Germany). Under Public Procurement Order 2017 Sec 9(a), the Competent Procurement Officer is advised to seek clarification or review supplier localization calculations before qualifying."
    }
  }
};
