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
        details: "Active Medium Enterprise (UDYAM-TN-02-0045892) verified directly against MSME Udyam Databank API."
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
        details: "PAN AABCA1234F matches corporate CIN L28120TN2004PLC053210. Corporate ITR-6 e-verified for AY 2025-26."
      },
      {
        parameter: "EPFO / ESIC",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "Active EPFO TN/MAS/0048291 and ESIC 52000849200000606. Zero statutory default notices."
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
        details: "API 6D compliance verified through valid independent lab test reports. Valid ICAI UDIN 25558996BGSVMJ2721."
      }
    ],
    anomaliesCount: 1,
    anomalies: [
      {
        id: "ano-1",
        title: "Make in India (MII) Local Content Discrepancy",
        severity: "CRITICAL_REVIEW",
        description: "Statutory MII Declaration certifies 75% domestic value addition, but Technical BOQ explicitly lists imported sub-assemblies from Munich, Germany.",
        evidenceRef: "evidence-mii-boq"
      }
    ],
    aiAdvisory: {
      status: "CONDITIONAL",
      statusBadge: "badge-warning",
      summary: "Conditional Qualification — Material discrepancy between MII declaration and BOQ sourcing.",
      fullNote: "The bidder meets primary financial (₹48.67 Cr turnover) and statutory tax registration criteria. However, an inconsistency between Make in India declaration (75%) and Technical BOQ (Line Item 14.2 actuator pump assembly) requires official clarification before commercial opening."
    }
  },

  "BID-002": {
    bidId: "BID-002",
    bidderName: "BHARAT INDUSTRIES",
    tenderRef: "CPCL/2026/TE/045",
    evaluatedAt: "01 Sep 2026, 12:45 PM",
    complianceScore: 98,
    scoreOutOf: 100,
    riskLevel: "LOW RISK",
    riskLevelBadge: "badge-success",
    aiConfidence: "99%",
    checks: [
      {
        parameter: "Udyam / MSME",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "Active Small Enterprise (UDYAM-MH-01-0081290) verified against Ministry of MSME portal. Major activity: Manufacturing."
      },
      {
        parameter: "GST & Returns",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "GSTIN 27AABCB9876E1ZT Active on CBIC portal. Zero defaults across 36 consecutive months of GSTR-1 and GSTR-3B filings."
      },
      {
        parameter: "PAN / ITR",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "PAN AABCB9876E matches Bharat Industries. Form ITR-5 filed for AY 2025-26 with turnover ₹62.40 Cr, Tax paid ₹1.82 Cr."
      },
      {
        parameter: "EPFO / ESIC",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "Active EPFO MH/BAN/0091820 (96 employees) and ESIC 31000789120000808. Zero outstanding arrears or default notices."
      },
      {
        parameter: "Make in India",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "Class-I Local Supplier (82% domestic value addition). Manufacturing location Plot 88, TTC Industrial Area, Navi Mumbai verified."
      },
      {
        parameter: "Blacklisting",
        status: "CLEAR",
        type: "success",
        icon: "✓",
        details: "Zero debarment or suspension entries in CPPP database, GeM incident tracking, or Central Vigilance portal. GeM Rating 4.9/5."
      },
      {
        parameter: "Technical Criteria",
        status: "PASSED",
        type: "success",
        icon: "✓",
        details: "API 6D compliance certified by Bureau Veritas. Audited turnover ₹48.50 Cr exceeds ₹15 Cr requirement. Valid CA UDIN 25044812BMRSTX9182."
      }
    ],
    anomaliesCount: 0,
    anomalies: [],
    aiAdvisory: {
      status: "UNCONDITIONAL QUALIFIED",
      statusBadge: "badge-success",
      summary: "Full compliance verified across all statutory, financial, and technical gates.",
      fullNote: "Bidder Bharat Industries demonstrates impeccable compliance (Score 98/100, Low Risk). All 10 submitted documents cross-checked against government databanks with 100% data integrity. Turnover of ₹48.50 Cr comfortably satisfies the ₹15.00 Cr PQC threshold, and Class-I MII domestic content of 82% entitles the bidder to statutory purchase preference under PPO-2017. Unconditional qualification strongly recommended."
    }
  },

  "BID-003": {
    bidId: "BID-003",
    bidderName: "ZENITH PVT LTD",
    tenderRef: "CPCL/2026/TE/045",
    evaluatedAt: "31 Aug 2026, 05:22 PM",
    complianceScore: 24,
    scoreOutOf: 100,
    riskLevel: "HIGH RISK",
    riskLevelBadge: "badge-danger",
    aiConfidence: "98%",
    checks: [
      {
        parameter: "Udyam / MSME",
        status: "ACTIVITY MISMATCH",
        type: "warning",
        icon: "⚠",
        details: "UDYAM-DL-05-0012450 is registered under 'SERVICES' (Micro), not Manufacturing. Enterprise trade name listed as 'Zenith Flow Systems'."
      },
      {
        parameter: "GST & Returns",
        status: "SUSPENDED ON PORTAL",
        type: "error",
        icon: "✕",
        details: "CRITICAL: GSTIN 07AABCZ5544K1ZS is SUSPENDED on CBIC GST Portal under Rule 21A(2A) for 7 consecutive months of GSTR-3B non-filing."
      },
      {
        parameter: "PAN / ITR",
        status: "ENTITY TYPE MISMATCH",
        type: "error",
        icon: "✕",
        details: "PAN AABCZ5544K is legally registered to an LLP ('ZENITH TRADING & LOGISTICS LLP'), whereas tender was applied as 'ZENITH PVT LTD'."
      },
      {
        parameter: "EPFO / ESIC",
        status: "DEFAULT NOTICE",
        type: "warning",
        icon: "⚠",
        details: "EPFO code DL/CPM/0029103 has active Show-Cause Default Notice on EPFO Unified Portal. Last payment recorded May 2026."
      },
      {
        parameter: "Make in India",
        status: "UNVERIFIED CLAIM",
        type: "warning",
        icon: "⚠",
        details: "Claimed 68% local content lacks statutory chartered engineer verification and valid domestic manufacturing plant machinery proof."
      },
      {
        parameter: "Blacklisting",
        status: "FLAGGED",
        type: "warning",
        icon: "⚠",
        details: "Automated alert: Active GST suspension status triggers GeM incident flagging. Debarment proceedings pending under Delhi SGST."
      },
      {
        parameter: "Technical Criteria",
        status: "FAILED / INVALID UDIN",
        type: "error",
        icon: "✕",
        details: "CA UDIN 26048192AAAAAA0000 on balance sheet does not exist on ICAI Registry. Mandatory OEM Manufacturer Authorization Form missing (9/10 docs)."
      }
    ],
    anomaliesCount: 4,
    anomalies: [
      {
        id: "ano-z1",
        title: "GSTIN Suspended on Official CBIC Portal",
        severity: "CRITICAL_REVIEW",
        description: "Submitted GST Certificate claims active registration, but live CBIC GST Portal verification confirms GSTIN 07AABCZ5544K1ZS was SUSPENDED on 14/07/2026 under Rule 21A(2A) for 7 months of continuous tax return non-filing.",
        evidenceRef: "evidence-gst-suspension"
      },
      {
        id: "ano-z2",
        title: "Legal Constitution Mismatch (LLP vs Pvt Ltd)",
        severity: "CRITICAL_REVIEW",
        description: "The applicant entity submitted the bid as 'Zenith Pvt Ltd' (Private Limited Company), but PAN AABCZ5544K and Income Tax records establish that the entity is legally constituted as a Limited Liability Partnership ('Zenith Trading & Logistics LLP').",
        evidenceRef: "evidence-pan-mismatch"
      },
      {
        id: "ano-z3",
        title: "Counterfeit / Unregistered CA UDIN on Balance Sheet",
        severity: "CRITICAL_REVIEW",
        description: "The audited balance sheet cites ICAI Unique Document Identification Number (UDIN) 26048192AAAAAA0000, which has been verified as completely non-existent and unregistered on the Institute of Chartered Accountants of India (ICAI) UDIN Portal.",
        evidenceRef: "evidence-fake-udin"
      },
      {
        id: "ano-z4",
        title: "Missing Mandatory OEM Authorization Form (MAF)",
        severity: "CRITICAL_REVIEW",
        description: "Bidder omitted Document 10 (OEM Manufacturer Authorization Certificate). Under NIT Clause 7.2, failure to provide valid OEM authorization for high-pressure actuation units mandates outright disqualification.",
        evidenceRef: null
      }
    ],
    aiAdvisory: {
      status: "DISQUALIFIED / REJECTED",
      statusBadge: "badge-danger",
      summary: "Outright disqualification required due to suspended GSTIN, entity misrepresentation, and counterfeit UDIN.",
      fullNote: "CRITICAL STATUTORY FRAUD & NON-COMPLIANCE DETECTED: Bidder Zenith Pvt Ltd submitted an invalid bid package with multiple disqualifying flaws: 1) Active CBIC GST suspension for tax default; 2) Misrepresentation of legal entity structure (LLP disguised as Pvt Ltd); 3) Counterfeit CA UDIN on financial statements; 4) Failure to provide mandatory OEM Manufacturer Authorization. Disqualification and referral for formal debarment under GFR Rule 151(iii) is strongly advised."
    }
  },

  "BID-004": {
    bidId: "BID-004",
    bidderName: "SHREERAM ENTERPRISES",
    tenderRef: "CPCL/2026/TE/045",
    evaluatedAt: "30 Aug 2026, 03:50 PM",
    complianceScore: 54,
    scoreOutOf: 100,
    riskLevel: "MEDIUM RISK",
    riskLevelBadge: "badge-warning",
    aiConfidence: "95%",
    checks: [
      {
        parameter: "Udyam / MSME",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "Active Micro Enterprise (UDYAM-GJ-03-0099881) in Ahmedabad, Gujarat. Verified on MSME portal."
      },
      {
        parameter: "GST & Returns",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "GSTIN 24AABCS4433D1ZP Active and Regular. GSTR-1 and GSTR-3B filings up to date."
      },
      {
        parameter: "PAN / ITR",
        status: "VERIFIED",
        type: "success",
        icon: "✓",
        details: "PAN AABCS4433D verified for proprietorship firm ShreeRam Enterprises. Form ITR-3 filed for AY 2025-26."
      },
      {
        parameter: "EPFO / ESIC",
        status: "ARREARS DEMAND PENDING",
        type: "error",
        icon: "✕",
        details: "ESIC Code 41000892100000101 flagged: Active Show-Cause Demand Notice issued under Section 45A of ESI Act for ₹4,28,900 pending contributions."
      },
      {
        parameter: "Make in India",
        status: "CLASS-II ONLY (42%)",
        type: "warning",
        icon: "⚠",
        details: "Declared local content is 42.00% (Class-II Local Supplier). Under NIT Clause 5.1, purchase preference is restricted to Class-I (>= 50%)."
      },
      {
        parameter: "Blacklisting",
        status: "CLEAR",
        type: "success",
        icon: "✓",
        details: "Zero debarment records found in CPPP, GeM watchlists, or State PSU databases."
      },
      {
        parameter: "Technical Criteria",
        status: "PQC FINANCIAL SHORTFALL",
        type: "error",
        icon: "✕",
        details: "Turnover Failure: 3-year average turnover of ₹8.40 Cr fails the mandatory tender eligibility threshold of ₹15.00 Cr (44% shortfall)."
      }
    ],
    anomaliesCount: 2,
    anomalies: [
      {
        id: "ano-s1",
        title: "Annual Turnover Shortfall Below Mandatory PQC Criteria",
        severity: "CRITICAL_REVIEW",
        description: "Tender CPCL-2026-TE-045 Pre-Qualification Criteria Clause 4.1 explicitly mandates a minimum 3-year average annual turnover of ₹15.00 Crores. The bidder's audited turnover for FY 2024-25 is only ₹8.40 Crores, failing the financial qualification criterion.",
        evidenceRef: "evidence-turnover-shortfall"
      },
      {
        id: "ano-s2",
        title: "Statutory ESIC Contribution Arrears Demand Notice",
        severity: "MODERATE",
        description: "Official ESIC portal cross-check reveals an outstanding statutory demand notice of ₹4,28,900 issued under Section 45A of the ESI Act 1948 by Regional Office Ahmedabad for 4 months of unpaid employee health contributions.",
        evidenceRef: "evidence-esic-arrears"
      }
    ],
    aiAdvisory: {
      status: "DISQUALIFIED (PQC SHORTFALL)",
      statusBadge: "badge-danger",
      summary: "Disqualified due to financial turnover deficiency (₹8.40 Cr vs ₹15.00 Cr required) and pending labor arrears.",
      fullNote: "Bidder ShreeRam Enterprises maintains active GST and PAN registrations but fails fundamental Pre-Qualification Criteria (PQC): 1) Audited turnover of ₹8.40 Cr represents a 44% deficit against the tender prerequisite of ₹15.00 Cr; 2) Outstanding Section 45A demand notice of ₹4.28 Lakhs on ESIC portal indicates statutory non-compliance; 3) Local content of 42% qualifies only as Class-II Local Supplier. Rejection on commercial PQC grounds is warranted under GFR Rule 173(v)."
    }
  },
};
