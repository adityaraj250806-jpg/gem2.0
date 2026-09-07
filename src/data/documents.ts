export interface DocumentItem {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  verified: boolean;
  flagged?: boolean;
  category: string;
  content: Record<string, any>;
  fileDataUrl?: string;
}

export const mockDocuments: Record<string, DocumentItem[]> = {
  "BID-001": [
    {
      id: "doc-gst",
      title: "GST Registration Certificate",
      fileName: "GST_Certificate.pdf",
      fileSize: "1.4 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory / Tax",
      content: {
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
      title: "PAN Card",
      fileName: "PAN.pdf",
      fileSize: "840 KB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory / Identity",
      content: {
        panNumber: "AABCA1234F",
        name: "ABC ENGINEERING LIMITED",
        incorporationDate: "14/05/2004",
        fathersName: "N/A (Corporate Entity)",
        issuingAuthority: "Income Tax Department, Government of India"
      }
    },
    {
      id: "doc-udyam",
      title: "Udyam / MSME Certificate",
      fileName: "Udyam.pdf",
      fileSize: "1.1 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Enterprise Classification",
      content: {
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
      title: "ITR Documents",
      fileName: "ITR_V_FY24_25.pdf",
      fileSize: "2.8 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Financial / Compliance",
      content: {
        assessmentYear: "2025-26",
        filingDate: "31/07/2025",
        acknowledgementNo: "982347102938472",
        grossTotalIncome: "₹14,92,40,000",
        taxPaid: "₹3,72,10,000",
        formType: "ITR-6 (Companies other than claiming exemption under sec 11)"
      }
    },
    {
      id: "doc-balance-sheet",
      title: "Balance Sheet",
      fileName: "Audited_Balance_Sheet_FY25.pdf",
      fileSize: "4.6 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Financial Compliance",
      content: {
        financialYear: "FY 2024-2025",
        netWorth: "₹42.30 Crores",
        operatingRevenue: "₹68.40 Crores",
        ebitda: "₹11.20 Crores",
        caFirm: "M/s Ramanathan & Associates, Chartered Accountants",
        caUdin: "25042318AAAAAB8892"
      }
    },
    {
      id: "doc-epfo",
      title: "EPFO Certificate",
      fileName: "EPFO.pdf",
      fileSize: "920 KB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Labor & Social Security",
      content: {
        establishmentCode: "TN/MAS/0048291/000",
        establishmentName: "ABC ENGINEERING LIMITED",
        activeContributingMembers: "248 Employees",
        ecrFilingStatus: "Up to date (ECR filed for July 2026)",
        electronicChallanNo: "TRRN: 312260800921"
      }
    },
    {
      id: "doc-esic",
      title: "ESIC Certificate",
      fileName: "ESIC_Certificate.pdf",
      fileSize: "890 KB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Labor & Social Security",
      content: {
        employerCode: "51000849200000606",
        coveredEmployees: "182 Insured Persons",
        contributionCompliance: "Paid up to July 2026",
        regionalOffice: "ESIC Regional Office, Chennai"
      }
    },
    {
      id: "doc-mii",
      title: "Make in India Declaration",
      fileName: "Make_in_India_Declaration.pdf",
      fileSize: "1.2 MB",
      uploadDate: "01 Sep 2026",
      verified: false,
      flagged: true,
      category: "Policy & Preferential Procurement",
      content: {
        supplierClassification: "Class-I Local Supplier",
        claimedLocalContent: "75%",
        declarationClause: "Public Procurement (Preference to Make in India) Order 2017 - Rev.",
        locationOfValueAddition: "Plot 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu",
        statutoryDeclaration: "We hereby solemnly confirm and certify that the products offered contain 75% local domestic value addition.",
        targetLineItem: "Item 1: High Pressure Cryogenic Valves"
      }
    },
    {
      id: "doc-boq",
      title: "Technical BOQ",
      fileName: "Technical_BOQ_Final.pdf",
      fileSize: "7.1 MB",
      uploadDate: "01 Sep 2026",
      verified: false,
      flagged: true,
      category: "Engineering & Technical",
      content: {
        specificationStandard: "API 6D, ASME B16.34, Shell MESC SPE 77/300",
        totalLineItems: "156 Items",
        keyComponent1: "Valve Casting Body: Cast Carbon Steel WCB (Indigenous)",
        keyComponent2: "Line Item 14.2: High Pressure Cryogenic Valve Actuator / Imported Pump Assembly — Manufactured by KSB AG / Voith, Frankenthal, Germany",
        countryOfOriginNote: "Country of Origin for primary pump & actuator sub-assembly: Germany (Imported Component)"
      }
    },
    {
      id: "doc-oem",
      title: "OEM Authorization",
      fileName: "OEM_Authorization.pdf",
      fileSize: "1.5 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Manufacturer Authority",
      content: {
        authorizingManufacturer: "ABC Valvecraft Manufacturing Ltd",
        territory: "Pan-India PSUs and Refineries",
        validThrough: "31/12/2027",
        warrantyCommitment: "Comprehensive 36 Months On-site PSU Warranty"
      }
    },
    {
      id: "doc-undertaking",
      title: "10. Non-Blacklisting & Integrity Undertaking",
      fileName: "Non_Blacklisting_Integrity_Undertaking.pdf",
      fileSize: "845 KB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Legal & Debarment Compliance",
      content: {
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
  ]
};

