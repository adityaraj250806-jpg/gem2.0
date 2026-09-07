/**
 * Utility for generating authentic demo statutory compliance documents
 * for Government e-Marketplace (GeM) Tender Submission.
 */

export interface DemoDocDefinition {
  id: string;
  name: string;
  fileName: string;
  fileSize: string;
  category: string;
  officialRef: string;
  summary: string;
  lines: string[];
  metadata: Record<string, any>;
}

// 1. Exact definitions for all 10 GeM statutory documents
export const DEMO_DOCUMENTS: DemoDocDefinition[] = [
  {
    id: "doc-gst",
    name: "1. GST Registration Certificate & GSTR-3B",
    fileName: "GST_Certificate_33AABCA1234F1Z8.pdf",
    fileSize: "1.02 MB",
    category: "Statutory / Tax",
    officialRef: "GSTIN: 33AABCA1234F1Z8",
    summary: "Active regular taxpayer certificate under CGST Act Section 25 with 24 months filed returns",
    lines: [
      "GOVERNMENT OF INDIA - GOODS AND SERVICES TAX",
      "REGISTRATION CERTIFICATE (FORM GST REG-06)",
      "Registration Number (GSTIN): 33AABCA1234F1Z8",
      "Legal Name: ABC ENGINEERING LIMITED",
      "Trade Name: ABC FLOW SOLUTIONS & HEAVY VALVES",
      "Constitution of Business: Public Limited Company",
      "Address: Plot 14-B, Ambattur Industrial Estate, Chennai - 600058",
      "Date of Liability: 01/07/2017 | Status: Active & Valid",
      "Jurisdiction: Range-IV, Division-II, Chennai Central Commissionerate",
      "GSTR-3B Filing Compliance: 100% Filed on time up to July 2026",
      "Digital Verification: Validated via CBIC Common Portal API"
    ],
    metadata: {
      registrationNumber: "33AABCA1234F1Z8",
      legalName: "ABC ENGINEERING LIMITED",
      tradeName: "ABC FLOW SOLUTIONS",
      dateOfLiability: "01/07/2017",
      validity: "Active / Verified",
      jurisdiction: "Range-IV, Division-II, Chennai Central",
      typeOfTaxpayer: "Regular",
      signatory: "Commissioner of Commercial Taxes, Tamil Nadu"
    }
  },
  {
    id: "doc-pan",
    name: "2. Permanent Account Number (PAN) Card",
    fileName: "PAN_AABCA1234F.pdf",
    fileSize: "840 KB",
    category: "Statutory / Identity",
    officialRef: "PAN: AABCA1234F",
    summary: "Enterprise Corporate PAN certificate issued by Income Tax Department, Govt of India",
    lines: [
      "INCOME TAX DEPARTMENT - GOVERNMENT OF INDIA",
      "PERMANENT ACCOUNT NUMBER (PAN) CERTIFICATE",
      "PAN Number: AABCA1234F",
      "Entity Name: ABC ENGINEERING LIMITED",
      "Date of Incorporation: 14/05/2004",
      "Category: Indian Company (Public Limited)",
      "Corporate Identification Number (CIN): L28120TN2004PLC053210",
      "Issuing Authority: Income Tax Department, Govt of India",
      "ITD System Verification Status: Authenticated / Matches MCA Registry"
    ],
    metadata: {
      panNumber: "AABCA1234F",
      name: "ABC ENGINEERING LIMITED",
      incorporationDate: "14/05/2004",
      fathersName: "N/A (Corporate Entity)",
      issuingAuthority: "Income Tax Department, Government of India"
    }
  },
  {
    id: "doc-udyam",
    name: "3. Udyam / MSME Certificate",
    fileName: "Udyam_Registration_TN_02_0045892.pdf",
    fileSize: "1.1 MB",
    category: "Enterprise Classification",
    officialRef: "UDYAM-TN-02-0045892",
    summary: "Government of India MSME Classification certificate qualifying for GFR Rule 170 EMD Waiver",
    lines: [
      "MINISTRY OF MICRO, SMALL AND MEDIUM ENTERPRISES",
      "UDYAM REGISTRATION CERTIFICATE",
      "Udyam Registration Number: UDYAM-TN-02-0045892",
      "Enterprise Name: ABC ENGINEERING LIMITED",
      "Classification Type: Medium Enterprise (Manufacturing)",
      "National Industry Classification (NIC): 28120 (Industrial Valves & Fluid Equipment)",
      "Investment in Plant & Machinery (FY 2024-25): Rs. 24.80 Crores",
      "Net Turnover (FY 2024-25): Rs. 68.40 Crores",
      "EMD Exemption Eligibility: Qualified under GFR 2017 Rule 170"
    ],
    metadata: {
      udyamNumber: "UDYAM-TN-02-0045892",
      enterpriseName: "ABC ENGINEERING LIMITED",
      classification: "Medium Enterprise (Manufacturing)",
      majorActivity: "Manufacture of valves, industrial flow components and high pressure fittings (NIC Code: 28120)",
      dateOfIncorporation: "14/05/2004",
      investmentInPlant: "₹24.80 Crores",
      turnover: "₹68.40 Crores"
    }
  },
  {
    id: "doc-itr",
    name: "4. Income Tax Return (ITR-V)",
    fileName: "ITR_V_AY2025_26_Acknowledgment.pdf",
    fileSize: "2.8 MB",
    category: "Financial / Compliance",
    officialRef: "Ack No: 982347102938472",
    summary: "Filed acknowledgment for AY 2025-26 (FY 2024-25) Form ITR-6 Corporate Tax Return",
    lines: [
      "INCOME TAX DEPARTMENT - CENTRALIZED PROCESSING CENTER",
      "INDIAN INCOME TAX RETURN VERIFICATION FORM (ITR-V)",
      "Assessment Year: 2025-2026 | Financial Year: 2024-2025",
      "Acknowledgment Number: 982347102938472",
      "Form: ITR-6 (Companies other than claiming exemption under section 11)",
      "Filing Date: 31/07/2025 | Filing Mode: Electronic (DSC Verified)",
      "Gross Total Income: Rs. 14,92,40,000",
      "Total Tax Payable & Paid: Rs. 3,72,10,000",
      "Refund Claimed: Nil | Verification Status: e-Verified successfully"
    ],
    metadata: {
      assessmentYear: "2025-26",
      filingDate: "31/07/2025",
      acknowledgementNo: "982347102938472",
      grossTotalIncome: "₹14,92,40,000",
      taxPaid: "₹3,72,10,000",
      formType: "ITR-6 (Corporate Return)"
    }
  },
  {
    id: "doc-epfo",
    name: "5. EPFO & ESIC Registration Certificate",
    fileName: "EPFO_ECR_Payment_Challan.pdf",
    fileSize: "920 KB",
    category: "Labor & Social Security",
    officialRef: "TRRN: 312260800921",
    summary: "Proof of statutory employee social security compliance with paid electronic challan",
    lines: [
      "EMPLOYEES' PROVIDENT FUND ORGANISATION (EPFO)",
      "ELECTRONIC CHALLAN CUM RETURN (ECR) ACKNOWLEDGMENT",
      "Establishment Code: TN/MAS/0048291/000",
      "Establishment Name: ABC ENGINEERING LIMITED",
      "Wage Month / Year: July 2026",
      "TRRN Number: 312260800921",
      "Active Contributing Employees: 248 Workers",
      "Total Statutory Contribution Paid: Rs. 12,84,390",
      "ESIC Code: 51000849200000606 (Paid up-to-date up to July 2026)"
    ],
    metadata: {
      establishmentCode: "TN/MAS/0048291/000",
      establishmentName: "ABC ENGINEERING LIMITED",
      activeContributingMembers: "248 Employees",
      ecrFilingStatus: "Up to date (ECR filed for July 2026)",
      electronicChallanNo: "TRRN: 312260800921"
    }
  },
  {
    id: "doc-mii",
    name: "6. Make in India Declaration (PPO 2017)",
    fileName: "Make_in_India_Class1_Declaration.pdf",
    fileSize: "1.2 MB",
    category: "Policy & Preferential Procurement",
    officialRef: "PPO-2017 Rev. Annexure-III",
    summary: "Class-I Local Supplier certification claiming 75% local domestic value addition",
    lines: [
      "STATUTORY DECLARATION UNDER MAKE IN INDIA ORDER (PPO 2017)",
      "Tender Reference: CPCL/2026/TE/045 (High Pressure Valves)",
      "Supplier Classification Claimed: Class-I Local Supplier",
      "Declared Local Value Addition: 75.00%",
      "Primary Manufacturing Facility: Plot 14-B, Ambattur IE, Chennai, TN",
      "Indigenous Line Items: Valve Castings, Stems, Bonnet, Flanges, Seat Rings",
      "Statutory Note: Verified by Chief Operating Officer on Company Letterhead"
    ],
    metadata: {
      supplierClassification: "Class-I Local Supplier",
      claimedLocalContent: "75%",
      declarationClause: "Public Procurement (Preference to Make in India) Order 2017 - Rev.",
      locationOfValueAddition: "Plot 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu",
      statutoryDeclaration: "We hereby solemnly confirm and certify that the products offered contain 75% local domestic value addition.",
      targetLineItem: "Item 1: High Pressure Cryogenic Valves"
    }
  },
  {
    id: "doc-balance-sheet",
    name: "7. Audited Balance Sheet & CA Turnover Certificate",
    fileName: "Audited_Financial_Statements_FY25.pdf",
    fileSize: "4.6 MB",
    category: "Financial Compliance",
    officialRef: "UDIN: 25042318AAAAAB8892",
    summary: "3-year audited financial statements certified by independent Chartered Accountant with UDIN",
    lines: [
      "INDEPENDENT AUDITOR'S REPORT & CA TURNOVER CERTIFICATE",
      "Auditing Firm: M/s Ramanathan & Associates, Chartered Accountants",
      "Statutory ICAI UDIN: 25042318AAAAAB8892",
      "Subject Entity: ABC ENGINEERING LIMITED",
      "FY 2024-2025 Operating Revenue: Rs. 68.40 Crores",
      "FY 2023-2024 Operating Revenue: Rs. 61.20 Crores",
      "FY 2022-2023 Operating Revenue: Rs. 54.80 Crores",
      "3-Year Average Annual Turnover: Rs. 61.47 Crores (Exceeds ₹15 Cr requirement)",
      "Tangible Net Worth: Rs. 42.30 Crores (Positive & Solvent)"
    ],
    metadata: {
      financialYear: "FY 2024-2025",
      netWorth: "₹42.30 Crores",
      operatingRevenue: "₹68.40 Crores",
      ebitda: "₹11.20 Crores",
      caFirm: "M/s Ramanathan & Associates, Chartered Accountants",
      caUdin: "25042318AAAAAB8892"
    }
  },
  {
    id: "doc-boq",
    name: "8. Technical BOQ Line-Item Compliance",
    fileName: "Technical_BOQ_API6D_Compliance.pdf",
    fileSize: "7.1 MB",
    category: "Engineering & Technical",
    officialRef: "Standard: API 6D / ASME B16.34",
    summary: "Signed technical datasheets matching tender specification clauses for API 6D high pressure valves",
    lines: [
      "TECHNICAL BILL OF QUANTITIES & SPECIFICATION COMPLIANCE",
      "Tender Reference: CPCL/2026/TE/045",
      "Specification Code: API 6D, ASME B16.34, Shell MESC SPE 77/300",
      "Total Line Items Evaluated: 156 Items",
      "Body Material: ASTM A216 WCB Cast Carbon Steel (Domestic Foundry)",
      "Pressure Class: Class 600 / 900 / 1500 / 2500 High Pressure Ratings",
      "Third Party Lab Testing: Certified by L&T Central Testing Laboratory",
      "Line Item 14.2 Sub-Assembly: High Pressure Actuator Pump (Voith-Rexroth Germany)"
    ],
    metadata: {
      specificationStandard: "API 6D, ASME B16.34, Shell MESC SPE 77/300",
      totalLineItems: "156 Items",
      keyComponent1: "Valve Casting Body: Cast Carbon Steel WCB (Indigenous)",
      keyComponent2: "Line Item 14.2: High Pressure Cryogenic Valve Actuator / Imported Pump Assembly (Germany)",
      countryOfOriginNote: "Country of Origin for primary pump sub-assembly: Germany"
    }
  },
  {
    id: "doc-oem",
    name: "9. OEM Authorization / Manufacturing License",
    fileName: "OEM_Manufacturer_Authorization.pdf",
    fileSize: "1.5 MB",
    category: "Manufacturer Authority",
    officialRef: "MAF Ref: VALVECRAFT/OEM/2026/092",
    summary: "Manufacturer Authorization Form (MAF) from authorized manufacturing plant with 36-month warranty",
    lines: [
      "MANUFACTURER AUTHORIZATION FORM (MAF) FOR GeM TENDER",
      "Authorizing OEM: ABC Valvecraft Manufacturing Ltd (Plant Ambattur)",
      "Authorized Partner / Bidder: ABC ENGINEERING LIMITED",
      "Authorization Scope: Full warranty backing and supply guarantee for CPCL Tender",
      "Tender Reference: CPCL/2026/TE/045",
      "Validity Period: Valid through 31st December 2027",
      "Warranty Commitment: Comprehensive 36 Months On-site PSU Warranty"
    ],
    metadata: {
      authorizingManufacturer: "ABC Valvecraft Manufacturing Ltd",
      territory: "Pan-India PSUs and Refineries",
      validThrough: "31/12/2027",
      warrantyCommitment: "Comprehensive 36 Months On-site PSU Warranty"
    }
  },
  {
    id: "doc-undertaking",
    name: "10. Non-Blacklisting & Integrity Undertaking",
    fileName: "Non_Blacklisting_Integrity_Undertaking.pdf",
    fileSize: "845 KB",
    category: "Legal & Debarment Compliance",
    officialRef: "Affidavit: AFF-2026/BL-9042",
    summary: "Notarized affidavit on ₹100 Non-Judicial Stamp Paper confirming non-debarment under GFR Rule 151",
    lines: [
      "GOVERNMENT OF INDIA - NOTARIAL ACT & AFFIDAVIT",
      "NON-BLACKLISTING & INTEGRITY COMPLIANCE UNDERTAKING",
      "Executed on: Rs. 100/- Non-Judicial e-Stamp Paper (IN-TN98234710298374U)",
      "Deponent: Rajesh Kumar, Managing Director, ABC ENGINEERING LIMITED",
      "1. Debarment Status: NEVER blacklisted by GeM, MoPNG, CPCL, or any PSU/Ministry",
      "2. GFR Rule 151: Fully compliant; No debarment order operative under GFR 2017",
      "3. CVC Integrity Pact: Fully subscribed; No corruption, bribery, or cartelization",
      "4. Insolvency Status: Fully solvent; No NCLT or IBC 2016 proceedings pending",
      "5. Attestation: Notarized by R. Shanmugam, Advocate & Notary Public (Reg No. 4412/2014)"
    ],
    metadata: {
      affidavitNumber: "AFF-2026/BL-9042",
      stampPaperValue: "₹100 (Non-Judicial Stamp Paper)",
      stampSerialNumber: "IN-TN98234710298374U",
      notaryAdvocate: "R. Shanmugam, B.Sc., B.L., Advocate & Notary Public (Reg No. 4412/2014)",
      deponentName: "Mr. Rajesh Kumar, Managing Director, ABC Engineering Limited",
      notarizedDate: "28/08/2026",
      declarationClause: "Undertaking under Rule 151 of General Financial Rules (GFR) 2017 & GeM Policy",
      debarmentStatus: "Never Debarred / Non-Blacklisted",
      solemnAffirmation: "We hereby solemnly affirm and state on oath that M/s ABC Engineering Limited, its directors, partners, and key managerial personnel have never been blacklisted, debarred, suspended, or put on holiday list by GeM, Ministry of Petroleum & Natural Gas, CPCL, any Central/State Government Ministry, PSU, or multilateral funding agency. We also confirm full compliance with the Integrity Pact without any conflict of interest.",
      courtCasesPending: "Nil / None",
      jurisdiction: "High Court of Judicature at Madras / Chennai"
    }
  }
];

/**
 * Generates a valid standard PDF 1.4 binary string and returns Data URL
 */
export function generateValidPdfDataUrl(doc: DemoDocDefinition): string {
  // Sanitize lines for PDF literal syntax
  const escapePdf = (text: string) => text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  let stream = `BT\n/F1 16 Tf\n50 740 Td\n(${escapePdf(doc.name)}) Tj\nET\n`;
  stream += `BT\n/F1 11 Tf\n50 718 Td\n(${escapePdf(doc.summary)}) Tj\nET\n`;
  stream += `BT\n/F1 9 Tf\n50 696 Td\n(Document Reference: ${escapePdf(doc.officialRef)} | Category: ${escapePdf(doc.category)}) Tj\nET\n`;

  let y = 660;
  for (const line of doc.lines) {
    stream += `BT\n/F1 10 Tf\n50 ${y} Td\n(${escapePdf(line)}) Tj\nET\n`;
    y -= 20;
  }

  stream += `BT\n/F1 8 Tf\n50 120 Td\n(Official GeM Portal Demonstration Document - Verified for Tender CPCL/2026/TE/045) Tj\nET\n`;
  stream += `BT\n/F1 8 Tf\n50 105 Td\n(Timestamp: ${new Date().toUTCString()} - Digital Watermark: GeM-Sentinel-2026) Tj\nET\n`;

  const streamLen = stream.length;
  const obj1 = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n";
  const obj2 = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n";
  const obj3 = "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n";
  const obj4 = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n";
  const obj5 = `5 0 obj\n<< /Length ${streamLen} >>\nstream\n${stream}\nendstream\nendobj\n`;

  const header = "%PDF-1.4\n";
  const pos1 = header.length;
  const pos2 = pos1 + obj1.length;
  const pos3 = pos2 + obj2.length;
  const pos4 = pos3 + obj3.length;
  const pos5 = pos4 + obj4.length;
  const xrefPos = pos5 + obj5.length;

  const pad = (num: number) => num.toString().padStart(10, "0");

  const xref = `xref\n0 6\n0000000000 65535 f \n${pad(pos1)} 00000 n \n${pad(pos2)} 00000 n \n${pad(pos3)} 00000 n \n${pad(pos4)} 00000 n \n${pad(pos5)} 00000 n \n`;
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

  const pdfString = header + obj1 + obj2 + obj3 + obj4 + obj5 + xref + trailer;

  // Convert to Base64 Data URL
  return "data:application/pdf;base64," + btoa(pdfString);
}

/**
 * Downloads an authentic PDF file to the user's computer
 */
export function downloadDemoPdf(docDef: DemoDocDefinition): void {
  const dataUrl = generateValidPdfDataUrl(docDef);
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = docDef.fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Downloads all 10 demo statutory documents
 */
export function downloadAllDemoDocuments(): void {
  DEMO_DOCUMENTS.forEach((doc, idx) => {
    setTimeout(() => {
      downloadDemoPdf(doc);
    }, idx * 250);
  });
}

/**
 * Returns full legal text of the Non-Blacklisting Affidavit
 */
export function getNonBlacklistingAffidavitText(): string {
  return `FORMAT OF AFFIDAVIT / UNDERTAKING FOR NON-BLACKLISTING & INTEGRITY COMPLIANCE
(To be executed on Non-Judicial Stamp Paper of Rs. 100/- and duly attested by Notary Public)

e-Stamp Certificate No.: IN-TN98234710298374U
Stamp Paper Value: Rs. 100/- (Rupees One Hundred Only)
Purchased By: ABC ENGINEERING LIMITED
Description of Document: Article 4 Affidavit / Solemn Undertaking
Date of Execution: 28th August 2026 | Place: Chennai

I, Rajesh Kumar, S/o Late K. Ramachandran, aged about 48 years, Managing Director of M/s ABC ENGINEERING LIMITED, do hereby solemnly affirm and state on oath:

1. NON-BLACKLISTING & DEBARMENT STATUS:
   The Bidder company, its Directors, Partners, Promoters, and Key Managerial Personnel have NEVER been blacklisted, debarred, suspended, or prohibited from public procurement tenders by Government of India, GeM, MoPNG, CPCL, or any Central/State PSU/Ministry. No debarment under Rule 151 of GFR 2017 is operative.

2. GeM INCIDENT MANAGEMENT POLICY:
   The Bidder confirms full compliance with GeM Incident Management Policy. No administrative proceedings, notices, or debarment orders exist.

3. INTEGRITY PACT & ETHICS:
   The Bidder commits strictly to CVC Integrity Pact guidelines. No bribe, gift, or inducement has been offered. No conflict of interest exists.

4. INSOLVENCY & FINANCIAL STABILITY:
   The Bidder is solvent, profitable, and operational. No insolvency or liquidation proceedings are pending before NCLT under IBC 2016.

5. VERACITY OF DOCUMENTS:
   All statutory certificates, turnover proofs, and BOQ compliance sheets submitted for Tender Ref: CPCL/2026/TE/045 are genuine and accurate.

DEPONENT: (Sd/- Rajesh Kumar, Managing Director, ABC Engineering Limited)
ATTESTED & NOTARIZED BY: R. Shanmugam, Advocate & Notary Public (Reg No. 4412/2014, Chennai)`;
}
