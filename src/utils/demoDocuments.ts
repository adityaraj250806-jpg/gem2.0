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
    name: "1. GST Registration Certificate (Form GST REG-06)",
    fileName: "GST_REG06_Certificate_37AABCA1234F1Z5.pdf",
    fileSize: "1.02 MB",
    category: "Statutory / Tax",
    officialRef: "GSTIN: 37AABCA1234F1Z5",
    summary: "Form GST REG-06 Registration Certificate issued under Rule 10(1) by Goods and Services Tax Network",
    lines: [
      "GOVERNMENT OF INDIA - GOODS AND SERVICES TAX",
      "FORM GST REG-06 [See Rule 10(1)] - REGISTRATION CERTIFICATE",
      "Registration Number: 37AABCA1234F1Z5",
      "1. Legal Name: ABC ENGINEERING PRIVATE LIMITED",
      "2. Trade Name: ABC ENGINEERING PRIVATE LIMITED",
      "3. Constitution of Business: Private Limited Company",
      "4. Address: Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058",
      "5. Date of Liability: 03/02/2018 | Validity: From 03/02/2018 To NA (Regular)",
      "6. Approving Authority: Andhra Pradesh / Tamil Nadu",
      "7. Approving Officer: varigonda girija (GST Officer, Jurisdictional Office: CHITTOOR-I)",
      "8. Date of issue of Certificate: 11/04/2018",
      "9. Digital Signature: DS GOODS AND SERVICES TAX NETWORK 1 (Validated)"
    ],
    metadata: {
      registrationNumber: "37AABCA1234F1Z5",
      legalName: "ABC ENGINEERING PRIVATE LIMITED",
      tradeName: "ABC ENGINEERING PRIVATE LIMITED",
      constitutionOfBusiness: "Private Limited Company",
      principalAddress: "Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058",
      dateOfLiability: "03/02/2018",
      validity: "Active / Regular",
      typeOfTaxpayer: "Regular",
      approvingState: "Andhra Pradesh",
      officerName: "varigonda girija",
      officerDesignation: "GST Officer",
      jurisdiction: "CHITTOOR-I",
      issueDate: "11/04/2018"
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
      "Category: Indian Company (Private/Public Limited)",
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
    name: "3. Udyam Registration Certificate",
    fileName: "UDYAM_KR_03_0278313.pdf",
    fileSize: "1.1 MB",
    category: "Enterprise Classification",
    officialRef: "UDYAM-KR-03-0278313",
    summary: "Official Ministry of MSME Udyam Registration Certificate with NIC classifications and services classification",
    lines: [
      "MINISTRY OF MICRO, SMALL AND MEDIUM ENTERPRISES",
      "UDYAM REGISTRATION CERTIFICATE",
      "Udyam Registration Number: UDYAM-KR-03-0278313",
      "Name of Enterprise: ABHINAM ENTERPRISES",
      "Enterprise Type: Micro (Classification Year 2023-24, Date: 26/06/2023)",
      "Major Activity: SERVICES",
      "Social Category of Entrepreneur: GENERAL",
      "Official Address: NO.60, G3 SAISUCHIN APPARTMENT, VASANTHPURA, BANGALORE - 560061",
      "Date of Incorporation & Commencement: 15/06/2017",
      "NIC 5-Digit Codes: 56210 (Event catering), 70200 (Management consultancy activities)",
      "Date of Udyam Registration: 26/06/2023 (Verified via MSME National Portal)"
    ],
    metadata: {
      udyamNumber: "UDYAM-KR-03-0278313",
      enterpriseName: "ABHINAM ENTERPRISES",
      classificationType: "Micro",
      classificationYear: "2023-24",
      classificationDate: "26/06/2023",
      majorActivityBanner: "SERVICES",
      socialCategory: "GENERAL",
      flatDoorBlock: "NO.60",
      premisesBuilding: "G3 SAISUCHIN APPARTMENT",
      villageTown: "VASANTHPURA",
      block: "MARUTHI LAYOUT",
      roadStreetLane: "BANGALORE",
      city: "BANGALORE",
      state: "KARNATAKA",
      district: "BENGALURU (URBAN) , Pin 560061",
      mobile: "9880572411",
      email: "VINAY.ASSOCI@GMAIL.COM",
      dateOfIncorporation: "15/06/2017",
      dateOfCommencement: "15/06/2017",
      dateOfUdyamRegistration: "26/06/2023"
    }
  },
  {
    id: "doc-itr",
    name: "4. Indian Income Tax Return Acknowledgement (ITR-V)",
    fileName: "ITR_V_Acknowledgment_849201948192039.pdf",
    fileSize: "2.8 MB",
    category: "Financial / Compliance",
    officialRef: "Ack No: 849201948192039",
    summary: "Form ITR-3/ITR-6 Electronic Filing Acknowledgment with verified tax computation and DSC attestation",
    lines: [
      "INCOME TAX DEPARTMENT - CENTRALIZED PROCESSING CENTER",
      "INDIAN INCOME TAX RETURN ACKNOWLEDGEMENT (Rule 12 of IT Rules 1962)",
      "Assessment Year: 2020-21 | Form: ITR-3 / Filed u/s 139(1)",
      "e-Filing Acknowledgment Number: 849201948192039",
      "Taxpayer PAN: AABCA1234F | Name: ABHINAM ENTERPRISES",
      "Current Year Business Loss: Rs. 6,75,484",
      "Total Income / Adjusted Total Income under AMT: Rs. 1,60,850",
      "Taxes Paid: Rs. 9,500 | Net Refundable: Rs. -9,500",
      "Submission Mode: Electronically filed and verified using Digital Signature Certificate (DSC)"
    ],
    metadata: {
      assessmentYear: "2020-21",
      panNumber: "AABCA1234F",
      name: "ABHINAM ENTERPRISES",
      address: "NO.60, G3 SAISUCHIN APPARTMENT, VASANTHPURA, BANGALORE - 560061",
      status: "Individual",
      formType: "ITR-3",
      acknowledgementNo: "849201948192039",
      businessLoss: "675484",
      totalIncome: "160850",
      taxPaid: "9500"
    }
  },
  {
    id: "doc-epfo",
    name: "5. Provident Fund Code Number Intimation (EPFO)",
    fileName: "EPFO_Code_Intimation_APHYD0089201000.pdf",
    fileSize: "920 KB",
    category: "Labor & Social Security",
    officialRef: "Code: APHYD0089201000",
    summary: "Statutory Allotment of Code Number under Employees' Provident Fund and Miscellaneous Provisions Act 1952",
    lines: [
      "EMPLOYEES' PROVIDENT FUND ORGANISATION (EPFO) - GOVT OF INDIA",
      "PROVIDENT FUND CODE NUMBER INTIMATION LETTER",
      "Reference No: DL/CPM/0029103/000/18293 | Date: 17/08/2023",
      "Establishment Name: M/S INDUSTRIAL FURNACES",
      "EPFO Allotted Code Number: APHYD0089201000",
      "Establishment PAN: AABCA1234F",
      "Date on which strength crossed 19: 01/08/2023 | Section: 0001(3)(b)",
      "Primary Activity: ENGINEERS - ENGG. CONTRACTORS",
      "Ownership Type: Proprietorship Firm | Address: Hyderabad, Telangana - 500072"
    ],
    metadata: {
      refNo: "DL/CPM/0029103/000/18293",
      intimationDate: "17/08/2023",
      establishmentName: "M/S INDUSTRIAL FURNACES",
      establishmentCode: "APHYD0089201000",
      panNumber: "AABCA1234F",
      activeContributingMembers: "248 Employees",
      ecrFilingStatus: "Up to date (ECR filed for July 2026)",
      electronicChallanNo: "TRRN: 312260800921"
    }
  },
  {
    id: "doc-esic",
    name: "6. ESIC Registration Certificate (Form C-11)",
    fileName: "ESIC_Form_C11_Registration_Letter.pdf",
    fileSize: "890 KB",
    category: "Labor & Social Security",
    officialRef: "Code: 52000849200000606",
    summary: "Form C-11 Registration Letter under Section 1(5) of ESI Act 1948 by Regional Office Hyderabad",
    lines: [
      "EMPLOYEES' STATE INSURANCE CORPORATION (ESIC)",
      "REGIONAL OFFICE, 5-9-23 HILLFORT ROAD, ADARSHNAGAR, HYDERABAD - 500063",
      "FORM C-11 (Regd. with a.d.) - REGISTRATION UNDER E.S.I. ACT 1948",
      "Dated: 12/08/2023 | Subject: Registration under Section 1(5) of ESI Act",
      "To: M/s ABC ENGINEERING PRIVATE LIMITED (Serilingampally, Hyderabad)",
      "Allotted Employer Code No: 52000849200000606",
      "Coverage Date: Effective from 12-08-2023",
      "Branch Office Designated: Prashanti Nagar Kukatpally, Hyderabad - 500072",
      "Statutory Status: Active Employer & Timely Monthly Contributions Verified"
    ],
    metadata: {
      employerCode: "52000849200000606",
      coveredEmployees: "182 Insured Persons",
      contributionCompliance: "Paid up to July 2026",
      regionalOffice: "Regional Office, Adarshnagar, Hyderabad - 500063"
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
    fileName: "Audited_Balance_Sheet_Industrial_Furnaces.pdf",
    fileSize: "4.6 MB",
    category: "Financial Compliance",
    officialRef: "UDIN: 23558996BGSVMJ272",
    summary: "Provisional / Audited Balance Sheet certified by AMKN & CO Chartered Accountants with UDIN and CA seal",
    lines: [
      "M/S INDUSTRIAL FURNACES - SECTOR-25, BALLABGARH, FARIDABAD",
      "PROVISIONAL / AUDITED BALANCE SHEET AS AT 31.01.2023",
      "Total Capital Account (Net of drawings): Rs. 91,53,358.05",
      "Unsecured Loans: Rs. 2,47,39,542.21 | Current Liabilities: Rs. 1,47,80,945.66",
      "Total Liabilities: Rs. 4,86,73,846.00",
      "Fixed Assets: Rs. 56,32,733.79 (Plant & Machinery: Rs. 39,62,614.96)",
      "Current Assets: Rs. 4,30,41,112.22 (Sundry Debtors: Rs. 1.80 Cr, Stock: Rs. 1.26 Cr)",
      "Total Assets: Rs. 4,86,73,846.00 (Perfect Balance)",
      "Chartered Accountants: AMKN & CO (FRN: 032712C, Partner: CA Nitin Kaushik, M.No: 558996)",
      "Statutory ICAI UDIN: 23558996BGSVMJ272 (Verified Active)"
    ],
    metadata: {
      enterpriseName: "M/S INDUSTRIAL FURNACES",
      address: "PLOT NO. 116 GALI NO. 6 KRISHNA COLONY , SECTOR-25, BALLABGARH, FARIDABAD",
      caFirm: "AMKN & CO, Chartered Accountants (FRN: 032712C)",
      caPartner: "CA NITIN KAUSHIK (Partner)",
      caMembershipNo: "558996",
      caUdin: "23558996BGSVMJ272"
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
