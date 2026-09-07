export interface DocumentExcerpt {
  name: string;
  fileName: string;
  totalPages: number;
  currentPage: number;
  excerptTitle: string;
  highlightSnippet: string;
  surroundingText: string;
}

export interface ComparisonItem {
  doc: string;
  page: string;
  value: string;
}

export interface AiFinding {
  detectionType: string;
  findingLabel: string;
  confidenceScore: string;
  comparison: {
    itemA: ComparisonItem;
    itemB: ComparisonItem;
  };
  forensicAnalysis: string;
}

export interface EvidenceRecord {
  findingId: string;
  title: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | string;
  confidence: string;
  statusBadge: string;
  primaryDocument: DocumentExcerpt;
  secondaryDocument: DocumentExcerpt;
  aiFinding: AiFinding;
}

export const mockEvidenceList: Record<string, EvidenceRecord[]> = {
  "BID-001": [
    {
      findingId: "MII-BOQ-001",
      title: "Make-in-India Declaration (75%) vs Technical BOQ Imported German Pump",
      severity: "HIGH",
      confidence: "96%",
      statusBadge: "badge-warning",
      primaryDocument: {
        name: "Make in India Declaration",
        fileName: "Make_in_India_Declaration.pdf",
        totalPages: 8,
        currentPage: 3,
        excerptTitle: "STATUTORY LOCAL VALUE ADDITION DECLARATION",
        highlightSnippet: "LOCAL CONTENT = 75%",
        surroundingText: `ANNEXURE-III: UNDERTAKING UNDER PREFERENCE TO MAKE IN INDIA ORDER (PPO-2017)
Tender Ref: CPCL/2026/TE/045 (High Pressure Valves)

We, M/s ABC Engineering Ltd, hereby solemnly confirm and certify that the percentage of local content in the goods offered under Item 1 conforms to the threshold specified for Class-I Local Supplier.

-----------------------------------------------------------
Calculated Local Domestic Value Addition: 75.00%
Location of Manufacturing: Plot 14-B, Ambattur IE, Chennai
-----------------------------------------------------------

I hereby declare that the information furnished above is correct to the best of my knowledge and belief and no key components have been misclassified.`
      },
      secondaryDocument: {
        name: "Technical BOQ",
        fileName: "Technical_BOQ_Final.pdf",
        totalPages: 156,
        currentPage: 64,
        excerptTitle: "SCHEDULE OF BILL OF QUANTITIES & COMPONENT ORIGIN",
        highlightSnippet: "IMPORTED PUMP — Germany (42.8% of Unit Cost)",
        surroundingText: `SECTION 4.2: BILL OF MATERIALS & SUB-ASSEMBLIES (HIGH PRESSURE UNITS)
Item 14: Actuator and Drive Assembly for Cryogenic Line Valves

Line 14.1 - Valve Body Casing: ASTM A216 WCB (Domestic Cast Foundry)
Line 14.2 - High Pressure Hydraulic Actuation Pump:
    -> Model: Voith-Rexroth HydroMax 450-Bar
    -> Manufacturer: KSB Industrial Fluid Systems AG
    -> Country of Origin: Germany (Imported / Direct Import)
    -> Proportion of total equipment cost: 42.8% of total unit pricing.`
      },
      aiFinding: {
        detectionType: "MATERIAL INCONSISTENCY DETECTED",
        findingLabel: "Local Content Claim Contradicted by BOQ",
        confidenceScore: "96%",
        comparison: {
          itemA: {
            doc: "Make in India Declaration",
            page: "Page 3",
            value: "Local Content = 75.00% (Class-I Supplier)"
          },
          itemB: {
            doc: "Technical BOQ",
            page: "Page 64",
            value: "Imported Pump — Germany (42.8% of total unit cost)"
          }
        },
        forensicAnalysis: `Cross-document mathematical triangulation between the supplier's statutory Make-in-India declaration and the detailed Technical BOQ reveals an irreconcilable mathematical contradiction:

1. The bidder certifies 75% local domestic value addition in the PPO declaration.
2. In the Technical BOQ (Line 14.2, Page 64), the primary high-pressure hydraulic actuator pump is explicitly cataloged as imported from Germany, representing 42.8% of the base manufacturing value.
3. Accounting for foreign origin components (42.8%), maximum achievable domestic local content cannot exceed 57.2%, contradicting the claimed 75% Class-I Local Supplier threshold.

Recommendation: Procurement Officer should seek formal clarification and cost audit before qualification.`
      }
    },
    {
      findingId: "ISO-OMIT-002",
      title: "Sub-tier Component Supplier ISO 9001 Accreditation Omission",
      severity: "MODERATE",
      confidence: "94%",
      statusBadge: "badge-warning",
      primaryDocument: {
        name: "Technical Data Sheet",
        fileName: "Technical_Specifications_DataSheet.pdf",
        totalPages: 22,
        currentPage: 12,
        excerptTitle: "SECTION 6: ACTUATOR DRIVE SUB-SYSTEM SPECIFICATIONS",
        highlightSnippet: "SUB-TIER ISO 9001:2015 ACCREDITED — REFERENCED",
        surroundingText: `ITEM 14: SUB-TIER ACTUATION CONTROLS & DRIVE SYSTEM
Manufactured by authorized hydraulic sub-assembly partner.
Mandatory Quality Standards:
- ISO 9001:2015 Quality Management System Certification
- Factory Acceptance Test (FAT) Protocol witnessed by Lloyd's Register
Note: Sub-tier supplier certificate copy attached as Annexure Q-4.`
      },
      secondaryDocument: {
        name: "Quality Assurance Package",
        fileName: "QA_Inspection_Certificates.pdf",
        totalPages: 16,
        currentPage: 16,
        excerptTitle: "ANNEXURE Q INDEX & UPLOADED CERTIFICATES",
        highlightSnippet: "ANNEXURE Q-4 OMITTED — NOT ATTACHED",
        surroundingText: `INDEX OF ATTACHMENTS (QUALITY ASSURANCE PACKAGE):
Annexure Q-1: Foundry Mill Test Certificate ASTM A216 (Attached - Page 3)
Annexure Q-2: Hydrostatic Pressure Test Report (Attached - Page 8)
Annexure Q-3: Non-Destructive Examination (NDE) Radiography (Attached - Page 11)
Annexure Q-4: Sub-tier Actuator Drive ISO 9001 Certificate -> [OMITTED / NOT ENCLOSED]

End of QA Package.`
      },
      aiFinding: {
        detectionType: "DOCUMENTARY DEFICIENCY",
        findingLabel: "Omission of Referenced Quality Accreditation",
        confidenceScore: "94%",
        comparison: {
          itemA: {
            doc: "Technical Data Sheet",
            page: "Page 12",
            value: "References mandatory Annexure Q-4 (Sub-tier ISO 9001 Certificate)"
          },
          itemB: {
            doc: "Quality Assurance Package",
            page: "Page 16",
            value: "Annexure Q-4 omitted from the submitted documentation package"
          }
        },
        forensicAnalysis: `Document integrity check reveals an incomplete technical submission:
1. Technical specifications page 12 mandates sub-tier supplier ISO 9001:2015 certification for the actuator drive assembly.
2. Cross-referencing against the uploaded QA submission package indicates that Annexure Q-4 was omitted.
Recommendation: Request bidder to submit missing sub-tier ISO certificate within 48 hours.`
      }
    }
  ],

  "BID-002": [
    {
      findingId: "UDIN-VERIF-001",
      title: "Audited Balance Sheet vs ICAI UDIN & MCA Registry Triangulation",
      severity: "LOW",
      confidence: "99%",
      statusBadge: "badge-success",
      primaryDocument: {
        name: "Audited Balance Sheet",
        fileName: "Audited_Balance_Sheet_3Yr.pdf",
        totalPages: 18,
        currentPage: 2,
        excerptTitle: "STATUTORY INDEPENDENT AUDITOR'S REPORT & BALANCE SHEET",
        highlightSnippet: "UDIN: 25044812BMRSTX9182 — VERIFIED",
        surroundingText: `M/S BHARAT INDUSTRIES (PARTNERSHIP FIRM)
INDEPENDENT AUDITOR'S REPORT FOR FINANCIAL YEAR 2024-25
To the Partners of Bharat Industries, Mumbai

We have audited the accompanying Balance Sheet of Bharat Industries as of 31st March 2025.
Key Financial Summary:
- Gross Revenue from Operations: ₹48,50,00,000 (₹48.50 Crores)
- Net Profit After Tax: ₹4,12,00,000 (₹4.12 Crores)
- Net Worth: ₹19,80,00,000 (₹19.80 Crores)

ICAI UDIN: 25044812BMRSTX9182
Firm Registration No: 014298W | CA S.K. Agarwal (M.No. 044812)`
      },
      secondaryDocument: {
        name: "ICAI UDIN Registry Query",
        fileName: "ICAI_UDIN_Registry_Query_25044812.json",
        totalPages: 1,
        currentPage: 1,
        excerptTitle: "OFFICIAL ICAI UDIN VERIFICATION PORTAL QUERY",
        highlightSnippet: "STATUS: VALID & REGISTERED — ACTIVE",
        surroundingText: `THE INSTITUTE OF CHARTERED ACCOUNTANTS OF INDIA
UDIN VERIFICATION RESULT (GROUND TRUTH PORTAL QUERY)
-----------------------------------------------------------
UDIN Query: 25044812BMRSTX9182
Member Name: CA S.K. AGARWAL (Membership No: 044812)
Firm Name: S.K. AGARWAL & ASSOCIATES (FRN: 014298W)
Document Type: Audited Financial Statements
Date of Generation: 20/08/2025
Client / Entity Name: BHARAT INDUSTRIES
Financial Figures Declared on Portal:
- Turnover / Gross Receipts: ₹48,50,00,000
- Net Worth: ₹19,80,00,000
Portal Status: VALID & REGISTERED (Zero Discrepancies)`
      },
      aiFinding: {
        detectionType: "FULL STATUTORY CONFORMANCE",
        findingLabel: "Flawless Data Triangulation",
        confidenceScore: "99%",
        comparison: {
          itemA: {
            doc: "Audited Balance Sheet",
            page: "Page 2",
            value: "Turnover ₹48.50 Cr | UDIN 25044812BMRSTX9182"
          },
          itemB: {
            doc: "ICAI UDIN Registry",
            page: "Portal Query",
            value: "Verified Active | Turnover ₹48.50 Cr (Exact Match)"
          }
        },
        forensicAnalysis: `Automated cross-system triangulation between the submitted financial statements and the official ICAI UDIN registry confirms 100% authenticity:
1. UDIN 25044812BMRSTX9182 was generated on 20/08/2025 by registered CA S.K. Agarwal (M.No 044812).
2. The gross turnover of ₹48.50 Cr stated in the bid matches the figure locked in the ICAI registry without any variance.
3. Bidder easily clears the ₹15.00 Cr PQC turnover threshold and holds active GST and Class-I MII status.
Recommendation: Bidder is fully verified for commercial and technical qualification.`
      }
    },
    {
      findingId: "GST-COMPL-002",
      title: "Form GST REG-06 vs CBIC Live Network Taxpayer Filings",
      severity: "LOW",
      confidence: "99%",
      statusBadge: "badge-success",
      primaryDocument: {
        name: "Form GST REG-06 Certificate",
        fileName: "GST_Registration_Certificate.pdf",
        totalPages: 3,
        currentPage: 1,
        excerptTitle: "GOODS AND SERVICES TAX REGISTRATION CERTIFICATE",
        highlightSnippet: "GSTIN: 27AABCB9876E1ZT — REGULAR TAXPAYER",
        surroundingText: `GOVERNMENT OF INDIA • FORM GST REG-06
Registration Number: 27AABCB9876E1ZT
Legal Name: BHARAT INDUSTRIES
Trade Name: BHARAT INDUSTRIES & HEAVY VALVES
Constitution: Partnership Firm
Address: Plot 88, TTC Industrial Area, MIDC Mahape, Navi Mumbai, Maharashtra 400710
Status: Active Regular Taxpayer`
      },
      secondaryDocument: {
        name: "CBIC GST Portal Query",
        fileName: "CBIC_Live_GST_Status_27AABCB9876E1ZT.json",
        totalPages: 1,
        currentPage: 1,
        excerptTitle: "CBIC GSTIN RETURN FILING STATUS & VENDOR TRACKER",
        highlightSnippet: "STATUS: ACTIVE — ZERO FILING DEFAULTS (36 MONTHS)",
        surroundingText: `CBIC GSTN TAXPAYER FILING PROFILE
-----------------------------------------------------------
GSTIN: 27AABCB9876E1ZT
Taxpayer Status: ACTIVE
Return Filing Compliance:
- GSTR-1: FILED (Latest: July 2026 - On Time)
- GSTR-3B: FILED (Latest: July 2026 - On Time)
- Filing Track Record: 36 consecutive months on-time compliance
- Compliance Rating: 10/10`
      },
      aiFinding: {
        detectionType: "TAX COMPLIANCE VERIFIED",
        findingLabel: "Unbroken Regular Tax Filing History",
        confidenceScore: "99%",
        comparison: {
          itemA: {
            doc: "Form GST REG-06",
            page: "Page 1",
            value: "GSTIN 27AABCB9876E1ZT (Active Regular)"
          },
          itemB: {
            doc: "CBIC GST Portal",
            page: "Live Profile",
            value: "Status Active | 36 Consecutive Months On-Time Filing"
          }
        },
        forensicAnalysis: `Official tax registry check confirms exemplary statutory compliance. GSTIN 27AABCB9876E1ZT is completely active with zero defaults across GSTR-1 and GSTR-3B filings for 36 consecutive months.`
      }
    },
    {
      findingId: "MII-AUDIT-003",
      title: "Make in India Declaration vs Factory Production Cost Audit",
      severity: "LOW",
      confidence: "99%",
      statusBadge: "badge-success",
      primaryDocument: {
        name: "Make in India Declaration",
        fileName: "Make_in_India_Declaration.pdf",
        totalPages: 4,
        currentPage: 2,
        excerptTitle: "PPO-2017 LOCAL CONTENT UNDERTAKING",
        highlightSnippet: "LOCAL CONTENT: 82.00% (CLASS-I LOCAL SUPPLIER)",
        surroundingText: `ANNEXURE-III: UNDERTAKING UNDER PREFERENCE TO MAKE IN INDIA ORDER (PPO-2017)
Tender Ref: CPCL/2026/TE/045

We, M/s Bharat Industries, hereby confirm:
- Percentage of Domestic Local Content: 82.00%
- Supplier Category: Class-I Local Supplier (>= 50%)
- Manufacturing Facility: Plot 88, TTC Industrial Area, MIDC Mahape, Navi Mumbai`
      },
      secondaryDocument: {
        name: "Chartered Engineer Cost Audit",
        fileName: "Chartered_Engineer_Localization_Audit.pdf",
        totalPages: 8,
        currentPage: 3,
        excerptTitle: "INDEPENDENT DOMESTIC VALUE ADDITION AUDIT",
        highlightSnippet: "AUDITED LOCAL CONTENT = 82.40% (CONFIRMED)",
        surroundingText: `INDEPENDENT CHARTERED ENGINEER CERTIFICATE (PPO-2017 COMPLIANCE)
To CPCL Procurement Evaluation Committee

Having inspected the manufacturing facility of M/s Bharat Industries at MIDC Mahape, Navi Mumbai and audited the bill of materials for Tender CPCL/2026/TE/045:
- Total Factory Ex-Works Value: ₹4,85,00,000
- Indigenous Raw Materials & Domestic Value Addition: ₹3,99,64,000 (82.40%)
- Imported Content: ₹85,36,000 (17.60%)
Category Confirmed: CLASS-I LOCAL SUPPLIER.`
      },
      aiFinding: {
        detectionType: "SOVEREIGN PREFERENCE QUALIFIED",
        findingLabel: "Class-I Local Supplier Status Substantiated",
        confidenceScore: "99%",
        comparison: {
          itemA: {
            doc: "MII Declaration",
            page: "Page 2",
            value: "Claimed Local Content: 82.00% (Class-I)"
          },
          itemB: {
            doc: "Chartered Engineer Audit",
            page: "Page 3",
            value: "Audited Domestic Content: 82.40% (Independent Verification)"
          }
        },
        forensicAnalysis: `The bidder's Make in India declaration of 82.00% local content is fully corroborated by an independent Chartered Engineer factory audit report verifying 82.40% domestic value addition. Full entitlement to Class-I purchase preference is confirmed.`
      }
    }
  ],

  "BID-003": [
    {
      findingId: "GST-SUSP-001",
      title: "Submitted Active GST Certificate vs CBIC Portal Suspension Order",
      severity: "HIGH",
      confidence: "98%",
      statusBadge: "badge-danger",
      primaryDocument: {
        name: "Form GST REG-06 Certificate",
        fileName: "GST_Registration_Certificate.pdf",
        totalPages: 3,
        currentPage: 1,
        excerptTitle: "FORM GST REG-06: REGISTRATION CERTIFICATE SUBMITTED BY BIDDER",
        highlightSnippet: "GSTIN: 07AABCZ5544K1ZS — CLAIMED ACTIVE",
        surroundingText: `GOVERNMENT OF INDIA • GOODS AND SERVICES TAX
REGISTRATION CERTIFICATE (FORM GST REG-06)
Tender Ref: CPCL/2026/TE/045

Registration Number: 07AABCZ5544K1ZS
Legal Name: ZENITH TRADING & LOGISTICS
Trade Name: ZENITH TRADING
Constitution of Business: Limited Liability Partnership
Address: Unit 402, Barakhamba Road, Connaught Place, New Delhi 110001
Date of Liability: 01/07/2017
Period of Validity: From 18/08/2018 To Perpetual
Type of Registration: Regular`
      },
      secondaryDocument: {
        name: "CBIC GST Portal Registry Query",
        fileName: "CBIC_GSTIN_Live_Status_07AABCZ5544K1ZS.json",
        totalPages: 1,
        currentPage: 1,
        excerptTitle: "CENTRAL BOARD OF INDIRECT TAXES & CUSTOMS (CBIC) REGISTRY RECORD",
        highlightSnippet: "STATUS: SUSPENDED — RULE 21A(2A)",
        surroundingText: `GOODS AND SERVICES TAX NETWORK (GSTN) • CBIC TAXPAYER SEARCH
-----------------------------------------------------------
GSTIN: 07AABCZ5544K1ZS
Legal Name: ZENITH TRADING & LOGISTICS LLP
Taxpayer Status: SUSPENDED (Effective from 14/07/2026)
Jurisdiction: Central - Ward 45, Range 18, Division IV, Delhi West
Filing Default Profile:
- GSTR-1: DEFAULTER (Last Filed: December 2025)
- GSTR-3B: DEFAULTER (Last Filed: December 2025)
- Consecutive Default Months: 7 consecutive tax periods
Suspension Rule: CGST Rule 21A(2A) - Automated suspension due to continuous non-filing of monthly returns.`
      },
      aiFinding: {
        detectionType: "CRITICAL STATUTORY VIOLATION",
        findingLabel: "Concealed GST Suspension Order",
        confidenceScore: "98%",
        comparison: {
          itemA: {
            doc: "Submitted GST Certificate",
            page: "Page 1",
            value: "Submitted as Active Taxpayer (Zenith Pvt Ltd)"
          },
          itemB: {
            doc: "CBIC GST Portal Query",
            page: "Portal Status",
            value: "SUSPENDED on 14/07/2026 under Rule 21A(2A)"
          }
        },
        forensicAnalysis: `Forensic cross-verification between submitted registration papers and the government CBIC GST portal reveals grave statutory fraud:
1. CONCEALED SUSPENSION: GSTIN 07AABCZ5544K1ZS was suspended by tax authorities on 14/07/2026 under Rule 21A(2A) for 7 consecutive months of failure to file GSTR-3B.
2. The bidder submitted an outdated certificate to conceal active regulatory suspension.
Recommendation: Immediate disqualification and vendor flagging.`
      }
    },
    {
      findingId: "PAN-MISMATCH-002",
      title: "Applicant Legal Entity (Pvt Ltd) vs CBDT PAN Constitution (LLP)",
      severity: "HIGH",
      confidence: "99%",
      statusBadge: "badge-danger",
      primaryDocument: {
        name: "Tender Application & PAN Copy",
        fileName: "PAN_Card_Copy.pdf",
        totalPages: 2,
        currentPage: 1,
        excerptTitle: "TENDER APPLICATION APPLICANT PROFILE",
        highlightSnippet: "APPLICANT NAME: ZENITH PVT LTD (PRIVATE LIMITED)",
        surroundingText: `GeM 4.0 SOVEREIGN TENDER APPLICATION FORM
Tender Ref: CPCL/2026/TE/045

1. General Bidder Profile:
- Applicant Legal Name: ZENITH PVT LTD
- Corporate Constitution: Private Limited Company (Companies Act 2013)
- PAN Number Furnished: AABCZ5544K
- Authorized Signatory: Arun Mehra (Managing Director)`
      },
      secondaryDocument: {
        name: "CBDT PAN / MCA Registry Query",
        fileName: "CBDT_PAN_Master_AABCZ5544K.json",
        totalPages: 1,
        currentPage: 1,
        excerptTitle: "INCOME TAX DEPARTMENT • PAN VERIFICATION PORTAL",
        highlightSnippet: "CONSTITUTION: LIMITED LIABILITY PARTNERSHIP (LLP)",
        surroundingText: `DIRECTORATE OF INCOME TAX (SYSTEMS) • PAN ENTITY VALIDATION
-----------------------------------------------------------
PAN: AABCZ5544K
Registered Legal Name: ZENITH TRADING & LOGISTICS LLP
Entity Category: Limited Liability Partnership (LLP)
LLP Identification Number (LLPIN): AAK-4821
PAN Status: Active
Corporate CIN: NONE (Entity is NOT a Private Limited Company)`
      },
      aiFinding: {
        detectionType: "LEGAL ENTITY TYPE MISREPRESENTATION",
        findingLabel: "LLP Bidding Under Disguised Corporate Entity",
        confidenceScore: "99%",
        comparison: {
          itemA: {
            doc: "Tender Application Form",
            page: "Page 1",
            value: "Applied as: ZENITH PVT LTD (Private Limited Company)"
          },
          itemB: {
            doc: "CBDT PAN Registry",
            page: "Portal Master Data",
            value: "Registered to: ZENITH TRADING & LOGISTICS LLP (LLP Entity)"
          }
        },
        forensicAnalysis: `Cross-checking submitted bidder profile against the Ministry of Finance / CBDT PAN database reveals serious legal misrepresentation:
1. Bidder submitted the tender under the name "Zenith Pvt Ltd" asserting status as a Private Limited Company.
2. The PAN furnished (AABCZ5544K) is legally registered to a Limited Liability Partnership ("Zenith Trading & Logistics LLP").
3. Under Indian Contract Act and GFR 2017, a bid tendered under a non-existent corporate identity is void ab initio.
Recommendation: Disqualify for material misrepresentation.`
      }
    },
    {
      findingId: "CA-UDIN-FAKE-003",
      title: "Audited Balance Sheet CA UDIN vs ICAI Master Verification Registry",
      severity: "HIGH",
      confidence: "99%",
      statusBadge: "badge-danger",
      primaryDocument: {
        name: "Audited Balance Sheet",
        fileName: "Audited_Balance_Sheet_3Yr.pdf",
        totalPages: 12,
        currentPage: 2,
        excerptTitle: "STATUTORY AUDITOR'S REPORT SUBMITTED BY BIDDER",
        highlightSnippet: "UDIN: 26048192AAAAAA0000 — CLAIMED",
        surroundingText: `INDEPENDENT AUDITOR'S REPORT
To the Shareholders of Zenith Pvt Ltd

We have audited the financial statements of Zenith Pvt Ltd for FY 2024-25.
Turnover declared: ₹12,10,00,000 (₹12.10 Crores)
Net Profit: ₹95,00,000

Chartered Accountant Firm: S.P. KOTHARI & ASSOCIATES
CA Membership No: 048192
ICAI UDIN: 26048192AAAAAA0000
Date of Report: 15/08/2025`
      },
      secondaryDocument: {
        name: "ICAI UDIN Portal Live Query",
        fileName: "ICAI_UDIN_Registry_Query_26048192.json",
        totalPages: 1,
        currentPage: 1,
        excerptTitle: "INSTITUTE OF CHARTERED ACCOUNTANTS OF INDIA UDIN LOOKUP",
        highlightSnippet: "STATUS: UNREGISTERED / DOES NOT EXIST",
        surroundingText: `ICAI UDIN VERIFICATION PORTAL (udin.icai.org)
OFFICIAL QUERY RESULT
-----------------------------------------------------------
Queried UDIN: 26048192AAAAAA0000
Verification Result: INVALID / NOT FOUND
Message: "No record exists for the queried UDIN in the ICAI national repository. 
The document has not been certified by any registered Chartered Accountant in India."
Timestamp: 2026-09-01T10:45:12Z`
      },
      aiFinding: {
        detectionType: "FORGED AUDIT DOCUMENT DETECTED",
        findingLabel: "Counterfeit / Non-Existent CA UDIN",
        confidenceScore: "99%",
        comparison: {
          itemA: {
            doc: "Audited Balance Sheet",
            page: "Page 2",
            value: "Cites CA UDIN: 26048192AAAAAA0000"
          },
          itemB: {
            doc: "ICAI UDIN Registry",
            page: "Portal Status",
            value: "INVALID / DOES NOT EXIST on National Repository"
          }
        },
        forensicAnalysis: `Mandatory ICAI verification of the Unique Document Identification Number (UDIN) confirms that UDIN 26048192AAAAAA0000 does not exist on the national registry. Under Ministry of Corporate Affairs and CPPP mandates, any financial statement lacking a valid ICAI UDIN is fraudulent and inadmissible.
Recommendation: Immediate disqualification and referral to ICAI disciplinary committee.`
      }
    },
    {
      findingId: "MAF-MISSING-004",
      title: "Mandatory OEM Manufacturer Authorization Form (MAF) Omission",
      severity: "HIGH",
      confidence: "99%",
      statusBadge: "badge-danger",
      primaryDocument: {
        name: "Submitted Document Package",
        fileName: "Bid_Submission_Index.pdf",
        totalPages: 1,
        currentPage: 1,
        excerptTitle: "BIDDER UPLOADED DOCUMENTS SUMMARY",
        highlightSnippet: "9 / 10 DOCUMENTS UPLOADED — OEM MAF MISSING",
        surroundingText: `UPLOADED DOCUMENT CHECKLIST (BIDDER: ZENITH PVT LTD):
1. Non-Blacklisting Affidavit [Uploaded]
2. Form GST REG-06 [Uploaded]
3. e-PAN Card [Uploaded]
4. Udyam Registration [Uploaded]
5. ITR-V Acknowledgement [Uploaded]
6. EPFO Registration [Uploaded]
7. ESIC Registration [Uploaded]
8. Make in India Declaration [Uploaded]
9. Audited Balance Sheet [Uploaded]
10. OEM Manufacturer Authorization Form (MAF) -> [NOT UPLOADED / MISSING]`
      },
      secondaryDocument: {
        name: "Tender NIT Clause 7.2 Checklist",
        fileName: "Official_Notice_Inviting_Tender.pdf",
        totalPages: 24,
        currentPage: 11,
        excerptTitle: "SECTION 7: MANDATORY DOCUMENT ELIGIBILITY GATEWAY",
        highlightSnippet: "DOCUMENT 10: OEM MAF IS STRICTLY MANDATORY",
        surroundingText: `SECTION 7.2: COMPULSORY SUBMISSION ARTIFACTS
Tender Ref: CPCL/2026/TE/045

Item 10: Manufacturer Authorization Form (MAF)
In case the bidder is not the Original Equipment Manufacturer (OEM) of the high-pressure actuation drive, submission of a valid, signed OEM Authorization Form (Annexure M) is mandatory.

Bids lacking a valid OEM MAF will be summarily rejected at the Technical Scrutiny Gateway without seeking further clarification.`
      },
      aiFinding: {
        detectionType: "MANDATORY DOCUMENT OMISSION",
        findingLabel: "Absence of Non-Negotiable OEM Authorization",
        confidenceScore: "99%",
        comparison: {
          itemA: {
            doc: "Bid Submission Index",
            page: "Page 1",
            value: "9 Documents Uploaded (OEM MAF Missing)"
          },
          itemB: {
            doc: "Tender NIT Clause 7.2",
            page: "Page 11",
            value: "OEM MAF Mandatory (Failure mandates summary rejection)"
          }
        },
        forensicAnalysis: `Bid package audit reveals that Document 10 (OEM Manufacturer Authorization Form) was omitted from the submission. NIT Clause 7.2 clearly stipulates that failure to enclose OEM authorization is fatal to the bid.
Recommendation: Summary rejection at technical scrutiny stage.`
      }
    }
  ],

  "BID-004": [
    {
      findingId: "PQC-TURNOVER-001",
      title: "Mandatory Financial Turnover Shortfall Below PQC Threshold",
      severity: "HIGH",
      confidence: "99%",
      statusBadge: "badge-danger",
      primaryDocument: {
        name: "Tender CPCL PQC Clause 4.1",
        fileName: "Official_Notice_Inviting_Tender.pdf",
        totalPages: 24,
        currentPage: 5,
        excerptTitle: "PRE-QUALIFICATION CRITERIA (FINANCIAL TURNOVER)",
        highlightSnippet: "MANDATORY MINIMUM TURNOVER = ₹15.00 CRORES",
        surroundingText: `SECTION 4.1: COMMERCIAL & FINANCIAL ELIGIBILITY (PQC)
Tender Ref: CPCL/2026/TE/045 - High Pressure Valve Package

1. Average Annual Financial Turnover:
The minimum average annual financial turnover of the bidder during the last 3 (three) consecutive financial years ending 31st March 2025 shall not be less than:
₹15,00,00,000 (Rupees Fifteen Crores Only).

Failure to satisfy this criterion shall result in immediate commercial disqualification. Audited Balance Sheets and Income Tax Returns must substantiate this threshold.`
      },
      secondaryDocument: {
        name: "Audited Balance Sheet & ITR-3",
        fileName: "Audited_Balance_Sheet_3Yr.pdf",
        totalPages: 14,
        currentPage: 3,
        excerptTitle: "CA CERTIFIED PROFIT & LOSS / ANNUAL TURNOVER STATEMENT",
        highlightSnippet: "AUDITED TURNOVER = ₹8.40 CRORES (45.7% DEFICIT)",
        surroundingText: `M/S SHREERAM ENTERPRISES (PROP: POOJA DESHMUKH)
FINANCIAL TURNOVER CERTIFICATE (AUDITED UNDER SEC 44AB)
Firm Registration No: 019283W | CA Hitesh Patel (M.No 089123)
UDIN: 25089123BVBNMA8821

Annual Turnover Summary (Last 3 Financial Years):
- FY 2022-23: ₹7,85,00,000 (₹7.85 Cr)
- FY 2023-24: ₹8,20,00,000 (₹8.20 Cr)
- FY 2024-25: ₹8,40,00,000 (₹8.40 Cr)
-----------------------------------------------------------
3-Year Average Annual Turnover: ₹8,15,00,000 (₹8.15 Crores)
Shortfall against tender eligibility requirement: ₹6.85 Crores (45.7% Shortfall)`
      },
      aiFinding: {
        detectionType: "PQC FINANCIAL THRESHOLD FAILURE",
        findingLabel: "Mandatory Turnover Criteria Deficit",
        confidenceScore: "99%",
        comparison: {
          itemA: {
            doc: "Tender PQC Clause 4.1",
            page: "Page 5",
            value: "Mandatory Minimum Turnover: ₹15.00 Crores"
          },
          itemB: {
            doc: "Audited Balance Sheet",
            page: "Page 3",
            value: "Certified Average Turnover: ₹8.15 Crores (45.7% Shortfall)"
          }
        },
        forensicAnalysis: `Commercial eligibility analysis identifies outright failure of mandatory tender qualification criteria:
1. PQC TURNOVER DEFICIT: Clause 4.1 requires a minimum 3-year average turnover of ₹15.00 Cr. ShreeRam Enterprises certifies only ₹8.15 Cr average (FY 2024-25 turnover ₹8.40 Cr), representing an unbridgeable 45.7% deficit.
2. Under GFR Rule 173(v) and CPPP procurement norms, failure to meet PQC financial turnover is non-curable.
Recommendation: Immediate technical/commercial disqualification.`
      }
    },
    {
      findingId: "ESIC-ARREARS-002",
      title: "Submitted ESIC Registration vs Shram Suvidha Statutory Arrears Demand Notice",
      severity: "HIGH",
      confidence: "98%",
      statusBadge: "badge-danger",
      primaryDocument: {
        name: "ESIC Form C-11 Certificate",
        fileName: "ESIC_Registration_Certificate.pdf",
        totalPages: 2,
        currentPage: 1,
        excerptTitle: "EMPLOYEES' STATE INSURANCE CORPORATION FORM C-11",
        highlightSnippet: "EMPLOYER CODE: 41000892100000101 — SUBMITTED AS REGULAR",
        surroundingText: `EMPLOYEES' STATE INSURANCE CORPORATION (MINISTRY OF LABOUR & EMPLOYMENT)
REGISTRATION CERTIFICATE UNDER SECTION 2-A OF ESI ACT 1948

Employer Code Number: 41000892100000101
Name of the Principal Employer: Pooja Deshmukh
Name of Establishment: M/s ShreeRam Enterprises
Address: Shed 42, GIDC Industrial Estate, Naroda, Ahmedabad, Gujarat 382330
Coverage Date: 01/04/2019
Sub-Regional Office: Regional Office, Ashram Road, Ahmedabad`
      },
      secondaryDocument: {
        name: "Shram Suvidha / ESIC Portal Live Registry",
        fileName: "ESIC_Statutory_Compliance_Demand_4100089210.json",
        totalPages: 1,
        currentPage: 1,
        excerptTitle: "OFFICIAL ESIC ARREARS & DEMAND RECOVERY RECORD",
        highlightSnippet: "SHOW-CAUSE DEMAND: ₹4,28,900 — SECTION 45A NOTICE ACTIVE",
        surroundingText: `MINISTRY OF LABOUR & EMPLOYMENT • SHRAM SUVIDHA UNIFIED PORTAL
ESIC COMPLIANCE & ARREARS TRACKER
-----------------------------------------------------------
Employer Code: 41000892100000101
Establishment Name: SHREERAM ENTERPRISES
Compliance Status: ARREARS PENDING / DEFAULT NOTICE ISSUED
Notice Ref: ESIC/RO/AHD/RECOVERY/2026/SEC45A-891
Issued Under: Section 45A of Employees' State Insurance Act 1948
Outstanding Arrears Amount: ₹4,28,900 (Rupees Four Lakhs Twenty Eight Thousand Nine Hundred)
Default Period: November 2025 - February 2026 (4 Consecutive Months)
Action: Show-cause recovery proceedings initiated by Recovery Officer, Ahmedabad.`
      },
      aiFinding: {
        detectionType: "LABOR LAW STATUTORY NON-COMPLIANCE",
        findingLabel: "Concealed Statutory Arrears Demand Notice",
        confidenceScore: "98%",
        comparison: {
          itemA: {
            doc: "Submitted ESIC Certificate",
            page: "Page 1",
            value: "Submitted as regular active establishment (Code 41000892100000101)"
          },
          itemB: {
            doc: "Shram Suvidha / ESIC Portal",
            page: "Live Registry",
            value: "Section 45A Demand Notice Active: ₹4,28,900 Unpaid Arrears"
          }
        },
        forensicAnalysis: `Automated statutory labor audit confirms an outstanding default notice:
1. Bidder submitted an initial ESIC registration certificate concealing that an active recovery notice has been initiated against them.
2. Live Shram Suvidha registry records confirm an unpaid demand of ₹4,28,900 under Section 45A of the ESI Act for 4 consecutive months of unpaid worker contributions.
3. NIT Clause 8.3 mandates that bidders must not have active statutory labor recovery proceedings against them.
Recommendation: Bidder must be served a show-cause / rejected on labor compliance grounds.`
      }
    },
    {
      findingId: "MII-CLASS2-003",
      title: "Make in India Local Content Declaration vs Sovereign Purchase Preference Threshold",
      severity: "MEDIUM",
      confidence: "95%",
      statusBadge: "badge-warning",
      primaryDocument: {
        name: "Make in India Declaration",
        fileName: "Make_in_India_Declaration.pdf",
        totalPages: 4,
        currentPage: 2,
        excerptTitle: "UNDERTAKING UNDER MAKE IN INDIA ORDER (PPO-2017)",
        highlightSnippet: "DECLARED LOCAL CONTENT: 42.00% (CLASS-II LOCAL SUPPLIER)",
        surroundingText: `ANNEXURE-III: UNDERTAKING UNDER PREFERENCE TO MAKE IN INDIA ORDER (PPO-2017)
Tender Ref: CPCL/2026/TE/045

We, M/s ShreeRam Enterprises, hereby certify that the goods offered under Item 1 achieve:
- Domestic Value Addition / Local Content: 42.00%
- Supplier Classification: Class-II Local Supplier
- Location of Local Value Addition: Shed 42, GIDC Naroda, Ahmedabad, Gujarat

Declared By: Pooja Deshmukh (Proprietor)`
      },
      secondaryDocument: {
        name: "Tender NIT Clause 5.1 (PPO-2017 Policy)",
        fileName: "Official_Notice_Inviting_Tender.pdf",
        totalPages: 24,
        currentPage: 8,
        excerptTitle: "MANDATORY PURCHASE PREFERENCE CRITERIA (MAKE IN INDIA)",
        highlightSnippet: "MANDATORY CLASS-I LOCAL SUPPLIER (LOCAL CONTENT >= 50%)",
        surroundingText: `SECTION 5.1: SOVEREIGN PREFERENCE POLICY (GFR RULE 153)
Tender Ref: CPCL/2026/TE/045

In accordance with Public Procurement (Preference to Make in India) Order 2017 (revised):
1. Only "Class-I Local Suppliers" (local domestic content equal to or exceeding 50.00%) are eligible for purchase preference in this tender.
2. Bidders qualifying only as "Class-II Local Suppliers" (local content 20% to 50%) are not entitled to margin of purchase preference and cannot be awarded preference contracts under the national localization mandate.`
      },
      aiFinding: {
        detectionType: "STATUTORY PREFERENCE INELIGIBILITY",
        findingLabel: "Ineligible for Class-I Local Supplier Preference",
        confidenceScore: "95%",
        comparison: {
          itemA: {
            doc: "Submitted MII Undertaking",
            page: "Page 2",
            value: "Local Content = 42.00% (Class-II Supplier)"
          },
          itemB: {
            doc: "Tender NIT Clause 5.1",
            page: "Page 8",
            value: "Class-I Local Content Required (Minimum 50.00%)"
          }
        },
        forensicAnalysis: `Statutory localization analysis indicates:
1. Bidder's declared local content of 42.00% falls below the 50.00% threshold required for Class-I Local Supplier status under CPCL/2026/TE/045.
2. While Class-II suppliers can participate in non-restricted bids, they cannot claim purchase preference over Class-I bidders (such as Bharat Industries at 82% or ABC Engineering at 75%).
Recommendation: Bidder cannot be awarded contract under Make in India preference.`
      }
    }
  ],

  "BID-005": [
    {
      findingId: "TURNOVER-PQC-005",
      title: "Annual Turnover Deficit: Audited ₹10.50 Cr vs Tender NIT Mandate of ₹12.00 Cr",
      severity: "HIGH",
      confidence: "99%",
      statusBadge: "badge-danger",
      primaryDocument: {
        name: "Audited Balance Sheet & CA Certificate",
        fileName: "Audited_Financial_Statement_FY25.pdf",
        totalPages: 18,
        currentPage: 4,
        excerptTitle: "CA STATUTORY AUDIT REPORT — 3-YEAR REVENUE SUMMARY",
        highlightSnippet: "AVERAGE ANNUAL TURNOVER = ₹ 10.50 CRORES",
        surroundingText: `REPORT OF PRACTICING CHARTERED ACCOUNTANT UNDER ICAI REGULATIONS
Entity: M/s Kavach Engineering & Power Systems Pvt Ltd
PAN: AABCK7788P | UDIN: 25078912KAVACH9910

Statement of Annual Audited Turnover for Preceding 3 Financial Years:
- FY 2022-23: INR 9,80,45,000/- (Rupees Nine Crore Eighty Lakhs)
- FY 2023-24: INR 11,20,10,000/- (Rupees Eleven Crore Twenty Lakhs)
- FY 2024-25: INR 10,50,00,000/- (Rupees Ten Crore Fifty Lakhs)

-------------------------------------------------------------
Three-Year Average Annual Financial Turnover: ₹ 10.50 Crores
Net Worth as on 31st March 2025: ₹ 6.45 Crores (Positive)
-------------------------------------------------------------
Certified true and correct based on verified books of account.
CA R. Venkatraman (Membership No. 078912), Venkatraman & Co.`
      },
      secondaryDocument: {
        name: "ONGC Tender Notice Inviting Tender (NIT)",
        fileName: "NIT_ONGC_WEST_2026_CRYO_088.pdf",
        totalPages: 42,
        currentPage: 9,
        excerptTitle: "SECTION-II: COMMERCIAL PRE-QUALIFICATION CRITERIA (PQC)",
        highlightSnippet: "MANDATORY MINIMUM TURNOVER = ₹ 12.00 CRORES",
        surroundingText: `CLAUSE 3.1: FINANCIAL TURNOVER ELIGIBILITY CRITERIA
Tender Reference: ONGC/2026/TE/088

The bidder must have achieved a Minimum Average Annual Financial Turnover
of ₹ 12.00 Crores (Rupees Twelve Crores only) across the preceding 3
consecutive financial years (FY 2022-23, FY 2023-24, FY 2024-25).

Bids submitted with an average annual turnover below ₹ 12.00 Crores
shall be summarily rejected at the Technical Pre-Qualification Stage
without any opportunity for retrospective rectification under GFR Rule 173.`
      },
      aiFinding: {
        detectionType: "PQC Financial Threshold Failure",
        findingLabel: "Turnover Deficiency: ₹10.50 Cr vs ₹12.00 Cr Required",
        confidenceScore: "99.8%",
        comparison: {
          itemA: {
            doc: "Audited Financial Statement",
            page: "Page 4",
            value: "₹ 10.50 Crores (3-Yr Avg)"
          },
          itemB: {
            doc: "ONGC NIT Clause 3.1",
            page: "Page 9",
            value: "₹ 12.00 Crores (Mandatory Floor)"
          }
        },
        forensicAnalysis: `The AI financial analysis model extracted the 3-year turnover figures from the CA-certified audit report and calculated the arithmetic mean of ₹10.50 Crores. Comparing this against ONGC NIT Clause 3.1 reveals an absolute shortfall of ₹1.50 Crores (12.5% below the statutory qualification bar). As GFR 2017 prohibits relaxation of core financial PQC criteria post-bid opening, this constitutes a non-curable disqualification.`
      }
    },
    {
      findingId: "MII-BOQ-005",
      title: "Make in India Declaration (80%) vs BOQ Imported Swiss Servo Actuator (44%)",
      severity: "HIGH",
      confidence: "98%",
      statusBadge: "badge-warning",
      primaryDocument: {
        name: "Make in India Declaration",
        fileName: "Make_in_India_Declaration_Kavach.pdf",
        totalPages: 5,
        currentPage: 2,
        excerptTitle: "ANNEXURE-II: STATUTORY DOMESTIC LOCAL CONTENT AFFIDAVIT",
        highlightSnippet: "CLAIMED LOCAL CONTENT = 80.00%",
        surroundingText: `AFFIDAVIT UNDER PREFERENCE TO MAKE IN INDIA ORDER (PPP-MII 2017)
Tender Reference: ONGC/2026/TE/088

We, M/s Kavach Engineering & Power Systems Pvt Ltd, hereby solemnly confirm
and certify that the local value addition in the manufactured actuators
offered in this bid meets the Class-I Local Supplier category:

-------------------------------------------------------------
Total Indigenous Domestic Value Addition: 80.00%
Manufacturing Shop: Plot 44, Peenya 2nd Phase, Bangalore
-------------------------------------------------------------
We affirm that no imported components exceed permissible sub-tier limits.`
      },
      secondaryDocument: {
        name: "Technical Bill of Quantities (BOQ)",
        fileName: "Technical_BOQ_Cryogenic_Skids.pdf",
        totalPages: 84,
        currentPage: 38,
        excerptTitle: "SECTION 8: ACTUATOR DRIVE BOM & COST BREAKDOWN",
        highlightSnippet: "IMPORTED SERVO ACTUATOR — Switzerland (44% of Unit Cost)",
        surroundingText: `SUB-ASSEMBLY 8.4: HIGH-PRESSURE DIGITAL MODULATING SERVO DRIVE
- Item Description: Electro-Hydraulic Servo Modulating Actuator & Digital Positioner
- Manufacturer: Wandfluh AG, Switzerland / Germany
- Unit Import Cost: ₹ 4,15,000 per skid assembly
- Share of Total Skid Ex-Works Value: 44.0%
- Country of Origin: SWITZERLAND (Direct Air Cargo Import)`
      },
      aiFinding: {
        detectionType: "Cross-Document Mathematical Inconsistency",
        findingLabel: "Material Contradiction: 80% Local Claimed vs 44% Imported BOM",
        confidenceScore: "98.4%",
        comparison: {
          itemA: {
            doc: "Make in India Declaration",
            page: "Page 2",
            value: "80.00% Local Domestic Content"
          },
          itemB: {
            doc: "Technical BOQ Item 8.4",
            page: "Page 38",
            value: "44.0% Imported Value (Switzerland)"
          }
        },
        forensicAnalysis: `Cross-document triangulation between the statutory MII declaration and the Technical Bill of Quantities reveals a direct mathematical contradiction. The bidder declared 80% indigenous content. However, line item 8.4 reveals that the electro-hydraulic servo actuator is imported directly from Switzerland at ₹4.15 Lakhs per unit, constituting 44.0% of the total skid manufacturing cost. If one component alone accounts for 44% imported value, the maximum possible domestic local content cannot exceed 56.0%, falsifying the 80% affidavit.`
      }
    },
    {
      findingId: "ESIC-ARREARS-005",
      title: "ESIC Clean Compliance Declaration vs Active Section 45A Demand Notice",
      severity: "MEDIUM",
      confidence: "97%",
      statusBadge: "badge-danger",
      primaryDocument: {
        name: "EPFO & ESIC Compliance Package",
        fileName: "EPFO_ESIC_Combined_Compliance.pdf",
        totalPages: 6,
        currentPage: 3,
        excerptTitle: "EMPLOYER STATUTORY SOCIAL SECURITY SELF-CERTIFICATION",
        highlightSnippet: "CERTIFIED: ZERO STATUTORY ARREARS OR PENDING NOTICES",
        surroundingText: `STATUTORY COMPLIANCE DECLARATION (EPF & ESI ACTS)
Establishment: Kavach Engineering & Power Systems Pvt Ltd
ESIC Registration Code: 57000981200000303

We hereby certify that all statutory employer and employee contributions
under the Employees' State Insurance Act 1948 have been fully remitted
to the authorized corporation account. No demand notice, recovery
proceedings or default assessments are outstanding against this establishment.`
      },
      secondaryDocument: {
        name: "ESIC Regional Databank Record (Ground Truth)",
        fileName: "ESIC_Regional_Office_Bangalore_Registry.gov",
        totalPages: 1,
        currentPage: 1,
        excerptTitle: "CENTRAL ESIC RECOVERY & DEFAULT MONITORING SYSTEM",
        highlightSnippet: "ACTIVE SECTION 45A DEMAND NOTICE — ₹ 2,85,000 ARREARS",
        surroundingText: `EMPLOYER COMPLIANCE RECORD: ESIC RAJAJINAGAR BANGALORE
Code: 57000981200000303 | Name: KAVACH ENGINEERING & POWER SYSTEMS PVT LTD
Status: ARREARS PENDING / DEFAULT ACTION
-------------------------------------------------------------
Notice Reference: ESIC/RO-BNG/REC/45A/2026/0912
Assessment Type: Determination of Contribution under Section 45A
Outstanding Arrears: INR 2,85,000 (Two Lakh Eighty Five Thousand)
Period of Default: Q3 & Q4 FY 2025-26
Notice Date: 18/07/2026 | Recovery Officer Action: Initiated
-------------------------------------------------------------`
      },
      aiFinding: {
        detectionType: "Statutory Labor Registry Violation",
        findingLabel: "Active Section 45A Demand Notice for ₹2,85,000 Unpaid ESIC",
        confidenceScore: "97.5%",
        comparison: {
          itemA: {
            doc: "Submitted ESIC Package",
            page: "Page 3",
            value: "Zero Arrears / No Notice Declared"
          },
          itemB: {
            doc: "ESIC Regional Registry Databank",
            page: "Portal",
            value: "Active Sec 45A Notice (₹ 2,85,000)"
          }
        },
        forensicAnalysis: `Direct API cross-referencing with the Employees' State Insurance Corporation (ESIC) portal revealed an active Statutory Demand Notice (Ref: ESIC/RO-BNG/REC/45A/2026/0912) issued on 18/07/2026 for ₹2,85,000 in unremitted health contributions. The bidder's self-certification declaring zero pending demands is factually inaccurate, requiring formal resolution before contract award.`
      }
    }
  ]
};

// Backwards-compatible single-record map pointing to the primary finding
export const mockEvidence: Record<string, EvidenceRecord> = {
  "BID-001": mockEvidenceList["BID-001"][0],
  "BID-002": mockEvidenceList["BID-002"][0],
  "BID-003": mockEvidenceList["BID-003"][0],
  "BID-004": mockEvidenceList["BID-004"][0],
  "BID-005": mockEvidenceList["BID-005"][0]
};


