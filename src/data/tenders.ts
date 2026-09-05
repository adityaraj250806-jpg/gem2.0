export interface RequiredDoc {
  id: string;
  name: string;
  required: boolean;
  defaultFile?: string | null;
}

export interface Tender {
  id: string;
  referenceNumber: string;
  title: string;
  department: string;
  issuingAuthority: string;
  category: string;
  tenderType: string;
  closingDate: string;
  submissionDeadline: string;
  emdAmount: string;
  estimatedValue: string;
  biddersCount: number;
  documentsCount: number;
  status: string;
  officerStatus: string;
  eligibilityCriteria: string[];
  requiredDocuments: RequiredDoc[];
}

export const mockTenders: Tender[] = [
  {
    id: "CPCL-2026-TE-045",
    referenceNumber: "CPCL/2026/TE/045",
    title: "Supply of High Pressure Valves",
    department: "CPCL (Chennai Petroleum Corporation Limited)",
    issuingAuthority: "CPCL",
    category: "Mechanical & Flow Control Equipment",
    tenderType: "Open Tender (Global Competitive Bidding)",
    closingDate: "15 Sep 2026",
    submissionDeadline: "2026-09-15T15:00:00+05:30",
    emdAmount: "₹10,00,000",
    estimatedValue: "₹8,45,00,000",
    biddersCount: 18,
    documentsCount: 3245,
    status: "Documents Submitted",
    officerStatus: "Awaiting Evaluation",
    eligibilityCriteria: [
      "Minimum Average Annual Turnover of ₹15 Crores over the last 3 financial years",
      "Previous Experience in supplying API 6D / 600 High Pressure Valves to PSU Refineries",
      "Valid GST Registration Certificate with active GSTIN status",
      "Valid MSME / Udyam Certificate (with Class-I Local Supplier eligibility)",
      "Approved OEM Technical Datasheets & BOQ Compliance"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "GST Registration Certificate", required: true, defaultFile: "GST_Certificate.pdf" },
      { id: "doc-2", name: "PAN Card", required: true, defaultFile: "PAN.pdf" },
      { id: "doc-3", name: "Udyam / MSME Certificate", required: true, defaultFile: "Udyam.pdf" },
      { id: "doc-4", name: "ITR / Income Tax Documents", required: true, defaultFile: null },
      { id: "doc-5", name: "EPFO / ESIC Certificate", required: true, defaultFile: "EPFO.pdf" },
      { id: "doc-6", name: "Make in India Declaration", required: true, defaultFile: null },
      { id: "doc-7", name: "Balance Sheet & CA Audit Report", required: true, defaultFile: "Balance_Sheet_FY25.pdf" },
      { id: "doc-8", name: "Technical BOQ Compliance", required: true, defaultFile: "Technical_BOQ_Rev2.pdf" },
      { id: "doc-9", name: "OEM Authorization Certificate", required: true, defaultFile: "OEM_Auth_Letter.pdf" },
      { id: "doc-10", name: "Non-Blacklisting Undertaking", required: true, defaultFile: "Undertaking_Affidavit.pdf" }
    ]
  },
  {
    id: "CPCL-2026-TE-046",
    referenceNumber: "CPCL/2026/TE/046",
    title: "Catalyst Regeneration System",
    department: "CPCL (Chennai Petroleum Corporation Limited)",
    issuingAuthority: "CPCL",
    category: "Chemical & Process Engineering",
    tenderType: "Open Tender",
    closingDate: "18 Sep 2026",
    submissionDeadline: "2026-09-18T17:00:00+05:30",
    emdAmount: "₹25,00,000",
    estimatedValue: "₹21,80,00,000",
    biddersCount: 14,
    documentsCount: 2480,
    status: "Evaluation Pending",
    officerStatus: "Awaiting Evaluation",
    eligibilityCriteria: [
      "Turnover exceeding ₹40 Crores",
      "Specialized Petrochemical Regeneration Patent / License",
      "Clean Compliance & Environmental Clearance Records"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "GST Registration Certificate", required: true },
      { id: "doc-2", name: "PAN Card", required: true },
      { id: "doc-3", name: "Process Patent Authorization", required: true }
    ]
  },
  {
    id: "ONGC-2026-TE-102",
    referenceNumber: "ONGC/2026/TE/102",
    title: "Offshore Corrosion Resistant Alloy Tubing",
    department: "ONGC (Oil and Natural Gas Corporation)",
    issuingAuthority: "ONGC Western Offshore Basin",
    category: "Drilling & Subsea Tubulars",
    tenderType: "Limited Tender",
    closingDate: "28 Sep 2026",
    submissionDeadline: "2026-09-28T14:30:00+05:30",
    emdAmount: "₹18,50,000",
    estimatedValue: "₹14,20,00,000",
    biddersCount: 11,
    documentsCount: 1950,
    status: "Under Technical Review",
    officerStatus: "In Progress",
    eligibilityCriteria: [
      "API 5CT / 5CRA certified manufacturing facility",
      "Minimum 5 years continuous offshore delivery track record"
    ],
    requiredDocuments: []
  },
  {
    id: "IOCL-2026-TE-088",
    referenceNumber: "IOCL/2026/TE/088",
    title: "Smart Terminal Automation & Radar Gauges",
    department: "IOCL (Indian Oil Corporation Limited)",
    issuingAuthority: "IOCL Pipelines Division",
    category: "Instrumentation & SCADA",
    tenderType: "Open Tender",
    closingDate: "05 Oct 2026",
    submissionDeadline: "2026-10-05T16:00:00+05:30",
    emdAmount: "₹12,00,000",
    estimatedValue: "₹9,75,00,000",
    biddersCount: 9,
    documentsCount: 1540,
    status: "Open for Bidding",
    officerStatus: "Active",
    eligibilityCriteria: [
      "OIML R85 certified radar level transmitters",
      "Proven integration with Honeywell / Yokogawa DCS"
    ],
    requiredDocuments: []
  }
];
