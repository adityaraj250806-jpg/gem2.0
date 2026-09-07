export interface RequiredDoc {
  id: string;
  name: string;
  required: boolean;
  defaultFile?: string | null;
}

export interface NoticeDetails {
  nitNumber: string;
  gemBidNumber: string;
  publishedDate: string;
  bidOpeningDate: string;
  location: string;
  deliveryPeriod: string;
  contractType: string;
  scopeSummary: string;
  technicalRequirements: string[];
  financialEligibility: string[];
  statutoryMandates: string[];
  emdExemption: string;
  fullNoticeText?: string;
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
  notice?: NoticeDetails;
}

export const getTenderNotice = (t: Tender): NoticeDetails => {
  if (t.notice) return t.notice;

  const cleanNum = t.referenceNumber.replace(/\//g, "-");
  return {
    nitNumber: `NIT/${cleanNum}/2026/V1`,
    gemBidNumber: `GEM/2026/B/${t.id.replace(/[^0-9]/g, "").padEnd(6, "741209")}`,
    publishedDate: "15 Aug 2026",
    bidOpeningDate: `${t.closingDate}, 11:00 AM IST`,
    location: `${t.department}, Main Refinery / Operational Complex, India`,
    deliveryPeriod: "90 Days from Purchase Order issuance",
    contractType: `${t.tenderType} (Two-Packet Sovereign Bidding System)`,
    scopeSummary: `Procurement, manufacturing, quality testing, and delivery of ${t.title} adhering strictly to GFR 2017 & GeM 4.0 guidelines for ${t.department}.`,
    technicalRequirements: [
      `Compliance with standard industrial specifications for ${t.category}`,
      "Mandatory quality testing, hydrostatic pressure proofing, and chemical metallurgy analysis",
      "Comprehensive OEM Technical Datasheets & detailed BOQ compliance mapping",
      "Mandatory Third-Party Inspection (TPI) clearance by approved agency (EIL / BV / TUV)"
    ],
    financialEligibility: [
      `Minimum 3-Year Average Annual Turnover threshold of ₹15.00 Crores (FY 2022-23 to FY 2024-25)`,
      "Proven supply record of similar packages to Indian Central/State PSU refineries within the last 5 years",
      "Audited balance sheet with positive net worth attested by practicing Chartered Accountant"
    ],
    statutoryMandates: [
      "Make in India (MII) Preference Order 2017: Minimum 50% Local Content mandatory (Class-I Supplier)",
      "Public Procurement Policy for MSEs Order 2012: 25% purchase preference with valid Udyam Certificate",
      "Mandatory Non-Blacklisting / Debarment Affidavit on ₹100 non-judicial stamp paper"
    ],
    emdExemption: `Earnest Money Deposit (EMD) of ${t.emdAmount} is 100% exempt for valid MSME / Udyam registered enterprises and DPIIT recognized Startups upon submission of active registration certificates.`
  };
};

export const mockTenders: Tender[] = [
  {
    id: "CPCL-2026-TE-045",
    referenceNumber: "CPCL/2026/TE/045",
    title: "Supply of High Pressure Valves",
    department: "CPCL (Chennai Petroleum Corporation Limited)",
    issuingAuthority: "CPCL Central TEC Unit",
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
    notice: {
      nitNumber: "NIT/CPCL/RESID/2026/TE-045",
      gemBidNumber: "GEM/2026/B/894102",
      publishedDate: "15 Aug 2026",
      bidOpeningDate: "16 Sep 2026, 11:00 AM IST",
      location: "CPCL Manali Refinery, Unit-III Resid Upgradation Plant, Chennai, Tamil Nadu - 600068",
      deliveryPeriod: "90 Days from Purchase Order date",
      contractType: "Supply & Inspection Contract (Fixed Price, Two-Packet Bidding)",
      scopeSummary: "Design, manufacturing, non-destructive testing, hydrostatic inspection, third-party certification (EIL/TUV), painting, and site supply of 350 Units of High Pressure API 6D Forged Steel Gate and Ball Valves (Class 600# & 900#) for the Resid Upgradation Plant (Unit-III) of CPCL Manali Refinery.",
      technicalRequirements: [
        "Design Standard: API 6D (Pipeline & Piping Valves), ASME B16.34, ASME B16.5, ASME B16.10",
        "Pressure Rating & Metallurgy: Class 600# & 900#, ASTM A105 / ASTM A182 Grade F316/F316L with Stellite hard-faced seats",
        "Environmental & Gas Compatibility: NACE MR0175 / ISO 15156 compliant for severe sour hydrocarbon gas service",
        "Testing Protocol: 100% Radiographic Testing (RT) on critical welds, Hydrostatic Shell Test at 1.5x design pressure, Helium high-pressure gas leak test",
        "Third-Party Inspection (TPI): Mandatory witness inspection and stage clearance by approved TPIA (Engineers India Ltd, Bureau Veritas, or TUV Sud)"
      ],
      financialEligibility: [
        "Average Annual Turnover: Bidder must have minimum average annual financial turnover of ₹15.00 Crores across preceding 3 financial years (FY 2022-23, 2023-24, 2024-25)",
        "Prior Supply Experience: Proven completion of at least 1 order of similar API valves of value not less than ₹6.76 Cr, or 2 orders of ₹4.23 Cr to any Indian Central/State PSU refinery",
        "Net Worth: Positive net worth as on 31st March 2025 attested with UDIN by practicing Chartered Accountant"
      ],
      statutoryMandates: [
        "Make in India (MII) Preference: Procured under Public Procurement (Preference to Make in India) Order 2017. Minimum 50% local content required (Class-I Local Supplier)",
        "Micro & Small Enterprises (MSE) Benefit: 25% purchase preference applicable for Micro and Small Enterprises holding valid Udyam Registration Certificate",
        "Integrity Pact & Anti-Collusion: Mandatory execution of Independent External Monitor (IEM) Integrity Pact on ₹100 non-judicial stamp paper",
        "Debarment Undertaking: Self-declaration of non-blacklisting / debarment by GeM, Ministry of Petroleum, or any PSU organization"
      ],
      emdExemption: "Earnest Money Deposit (EMD) of ₹10,00,000/- is 100% exempt for valid MSME / Udyam registered firms and DPIIT-recognized startups upon submission of active registration certificate."
    },
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
    requiredDocuments: [
      { id: "doc-1", name: "GST Registration Certificate", required: true },
      { id: "doc-2", name: "OIML Certification Document", required: true }
    ]
  },
  {
    id: "HPCL-2026-TE-052",
    referenceNumber: "HPCL/2026/TE/052",
    title: "Crude Distillation Unit Expansion Piping",
    department: "HPCL (Hindustan Petroleum Corporation Limited)",
    issuingAuthority: "HPCL Visakh Refinery",
    category: "Piping & Structural Fabrication",
    tenderType: "Open Tender",
    closingDate: "22 Sep 2026",
    submissionDeadline: "2026-09-22T17:00:00+05:30",
    emdAmount: "₹15,00,000",
    estimatedValue: "₹12,40,00,000",
    biddersCount: 12,
    documentsCount: 2160,
    status: "Documents Submitted",
    officerStatus: "Awaiting Evaluation",
    eligibilityCriteria: [
      "IBR certified pipe fabrication shop",
      "ASME B31.3 compliance verification",
      "Annual turnover of at least ₹25 Crores"
    ],
    requiredDocuments: [
      { id: "doc-1", name: "IBR Boiler & Piping Certificate", required: true },
      { id: "doc-2", name: "GST Registration Certificate", required: true }
    ]
  },
  {
    id: "GAIL-2026-TE-033",
    referenceNumber: "GAIL/2026/TE/033",
    title: "Cryogenic LNG Transfer Arm Package",
    department: "GAIL (India) Limited",
    issuingAuthority: "GAIL Petrochemicals Complex",
    category: "Cryogenic & Gas Handling",
    tenderType: "Global Tender",
    closingDate: "12 Aug 2026",
    submissionDeadline: "2026-08-12T15:00:00+05:30",
    emdAmount: "₹35,00,000",
    estimatedValue: "₹34,50,00,000",
    biddersCount: 8,
    documentsCount: 1120,
    status: "Awarded / Finalized",
    officerStatus: "Completed",
    eligibilityCriteria: [
      "EN 1474-1 cryogenic marine loading arms manufacturing approval",
      "Past supply to at least 2 LNG import terminals"
    ],
    requiredDocuments: []
  },
  {
    id: "BPCL-2026-TE-019",
    referenceNumber: "BPCL/2026/TE/019",
    title: "Rotary Equipment Vibration Monitoring System",
    department: "BPCL (Bharat Petroleum Corporation Limited)",
    issuingAuthority: "Kochi Refinery",
    category: "Predictive Maintenance & IoT",
    tenderType: "Open Tender",
    closingDate: "20 Jul 2026",
    submissionDeadline: "2026-07-20T16:30:00+05:30",
    emdAmount: "₹8,00,000",
    estimatedValue: "₹6,20,00,000",
    biddersCount: 6,
    documentsCount: 890,
    status: "Contract Finalized",
    officerStatus: "Completed",
    eligibilityCriteria: [
      "API 670 compliant machinery protection systems",
      "SIL-2 certified hardware"
    ],
    requiredDocuments: []
  },
  {
    id: "NTPC-2026-TE-071",
    referenceNumber: "NTPC/2026/TE/071",
    title: "Electrostatic Precipitator Retrofit System",
    department: "NTPC Limited",
    issuingAuthority: "Singrauli Super Thermal Power Station",
    category: "Environmental Emission Control",
    tenderType: "Domestic Competitive Bidding",
    closingDate: "05 Jun 2026",
    submissionDeadline: "2026-06-05T14:00:00+05:30",
    emdAmount: "₹18,00,000",
    estimatedValue: "₹18,90,00,000",
    biddersCount: 7,
    documentsCount: 940,
    status: "Awarded / Finalized",
    officerStatus: "Completed",
    eligibilityCriteria: [
      "SPM emission guarantee < 30 mg/Nm3",
      "Turnover exceeding ₹50 Crores"
    ],
    requiredDocuments: []
  },
  {
    id: "ONGC-2026-TE-088",
    referenceNumber: "ONGC/2026/TE/088",
    title: "Cryogenic Gas Turbine Actuators & Control Skids",
    department: "ONGC (Oil and Natural Gas Corporation)",
    issuingAuthority: "ONGC Western Offshore Asset / Mehsana Complex",
    category: "Process Automation & Flow Machinery",
    tenderType: "Open Sovereign Tender (National Competitive Bidding)",
    closingDate: "25 Oct 2026",
    submissionDeadline: "2026-10-25T15:00:00+05:30",
    emdAmount: "₹22,00,000",
    estimatedValue: "₹18,50,00,000",
    biddersCount: 1,
    documentsCount: 10,
    status: "Open for Bidding",
    officerStatus: "Active",
    notice: {
      nitNumber: "NIT/ONGC/WEST/2026/CRYO-088",
      gemBidNumber: "GEM/2026/B/904812",
      publishedDate: "05 Sep 2026",
      bidOpeningDate: "26 Oct 2026, 11:30 AM IST",
      location: "ONGC Hazira Gas Processing Complex & Offshore Platform Complex, Gujarat / Mumbai Offshore",
      deliveryPeriod: "120 Days from Letter of Award (LOA)",
      contractType: "Turnkey Supply, Integration & Commissioning Contract",
      scopeSummary: "Engineering, indigenous manufacturing, factory acceptance testing, and delivery of 24 sets of High-Pressure Electro-Hydraulic Cryogenic Gas Actuator Skids with SIL-3 fail-safe electronic controllers for offshore natural gas fractionation units.",
      technicalRequirements: [
        "Cryogenic temperature rating: Serviceable from -196°C to +80°C under 300 Bar pressure",
        "Functional Safety Certification: IEC 61508 SIL-3 certified by TUV / Exida",
        "API 6D / ISO 15156 sour gas compliance with NACE MR0175 metallurgical certification",
        "Complete technical datasheets, component bills of material, and GA engineering drawings"
      ],
      financialEligibility: [
        "Minimum 3-Year Average Annual Financial Turnover of ₹12.00 Crores (FY 2022-23, 2023-24, 2024-25)",
        "Net worth must be positive as on 31st March 2025 attested with valid ICAI UDIN",
        "Proven prior execution of at least 1 similar cryogenic actuator package of value not less than ₹7.40 Cr to any Central/State PSU"
      ],
      statutoryMandates: [
        "Public Procurement (Preference to Make in India) Order 2017: Mandatory Class-I Local Supplier (Minimum 50% domestic local content)",
        "Statutory Labor Clearances: Zero default notices or arrears under EPFO Act 1952 and ESIC Act 1948",
        "Mandatory Non-Blacklisting / Debarment Affidavit on ₹100 non-judicial stamp paper"
      ],
      emdExemption: "EMD of ₹22,00,000 is 100% exempt for valid MSME / Udyam registered enterprises with Class-I Local Supplier status."
    },
    eligibilityCriteria: [
      "Minimum Average Annual Turnover of ₹12.00 Crores over last 3 financial years",
      "Class-I Local Supplier under Make in India Order (>= 50% domestic value addition)",
      "IEC 61508 SIL-3 Certified Cryogenic Control Skids",
      "Active GSTIN and corporate PAN registration with verified tax filings",
      "Clean statutory labor compliance with no pending demand notices (EPFO / ESIC)"
    ],
    requiredDocuments: [
      { id: "doc-gst", name: "GST Registration Certificate", required: true, defaultFile: "GST_Certificate_29AABCK7788P1ZR.pdf" },
      { id: "doc-pan", name: "PAN Card", required: true, defaultFile: "PAN_Card_AABCK7788P.pdf" },
      { id: "doc-udyam", name: "Udyam / MSME Certificate", required: true, defaultFile: "Udyam_Registration_UDYAM-KR-03-0067123.pdf" },
      { id: "doc-itr", name: "Income Tax Return (ITR-6)", required: true, defaultFile: "ITR6_Acknowledgement_AY2025_26.pdf" },
      { id: "doc-epfo", name: "EPFO & ESIC Certificate", required: true, defaultFile: "EPFO_ESIC_Combined_Compliance.pdf" },
      { id: "doc-mii", name: "Make in India Declaration", required: true, defaultFile: "Make_in_India_Declaration_Kavach.pdf" },
      { id: "doc-balance-sheet", name: "Audited Balance Sheet & CA Audit", required: true, defaultFile: "Audited_Financial_Statement_FY25.pdf" },
      { id: "doc-boq", name: "Technical BOQ Compliance", required: true, defaultFile: "Technical_BOQ_Cryogenic_Skids.pdf" },
      { id: "doc-oem", name: "OEM Authorization Letter", required: true, defaultFile: "OEM_Authorization_Letter_Kavach.pdf" },
      { id: "doc-undertaking", name: "Non-Blacklisting Undertaking", required: true, defaultFile: "Non_Blacklisting_Integrity_Affidavit.pdf" }
    ]
  }
];
