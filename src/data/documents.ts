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
  // ═════════════════════════════════════════════════════════════════════
  // BID-001: ABC ENGINEERING LTD (Chennai, Tamil Nadu)
  // Profile: Established large valves manufacturer
  // AI Finding: Make-in-India declaration (75%) vs imported actuator in BOQ (Line 14.2)
  // ═════════════════════════════════════════════════════════════════════
  "BID-001": [
    {
      id: "doc-gst",
      title: "GST Registration Certificate",
      fileName: "GST_Certificate_33AABCA1234F1Z8.pdf",
      fileSize: "1.4 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory / Tax",
      content: {
        registrationNumber: "33AABCA1234F1Z8",
        legalName: "ABC ENGINEERING PRIVATE LIMITED",
        tradeName: "ABC ENGINEERING LIMITED",
        constitutionOfBusiness: "Private Limited Company",
        principalAddress: "Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058",
        dateOfLiability: "01/07/2017",
        validity: "Active / Regular",
        typeOfTaxpayer: "Regular",
        approvingState: "Tamil Nadu",
        officerName: "K. Ranganathan",
        officerDesignation: "Assistant Commissioner of GST",
        jurisdiction: "AMBATTUR-I",
        issueDate: "28/08/2017",
        dscTimestamp: "2017.08.28 14:15:32 IST"
      }
    },
    {
      id: "doc-pan",
      title: "PAN Card",
      fileName: "PAN_Card_AABCA1234F.pdf",
      fileSize: "840 KB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory / Identity",
      content: {
        panNumber: "AABCA1234F",
        name: "ABC ENGINEERING LIMITED",
        fathersName: "N/A (CORPORATE ENTITY)",
        incorporationDate: "14/05/2004",
        signatoryName: "Rajesh Kumar",
        issuingAuthority: "Income Tax Department, Government of India",
        cin: "L28120TN2004PLC053210"
      }
    },
    {
      id: "doc-udyam",
      title: "Udyam / MSME Certificate",
      fileName: "Udyam_Registration_Certificate.pdf",
      fileSize: "1.1 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Enterprise Classification",
      content: {
        udyamNumber: "UDYAM-TN-02-0045892",
        enterpriseName: "ABC ENGINEERING LIMITED",
        classificationType: "Medium",
        classificationYear: "2024-25",
        classificationDate: "12/06/2021",
        majorActivityBanner: "MANUFACTURING",
        socialCategory: "GENERAL",
        flatDoorBlock: "Plot No. 14-B",
        premisesBuilding: "Industrial Complex Phase-II",
        villageTown: "Ambattur",
        block: "Industrial Estate",
        roadStreetLane: "North Phase Main Road",
        city: "CHENNAI",
        state: "TAMIL NADU",
        district: "CHENNAI , Pin 600058",
        mobile: "9840123456",
        email: "tenders@abcengineering.com",
        dateOfIncorporation: "14/05/2004",
        dateOfCommencement: "01/08/2004",
        dateOfUdyamRegistration: "12/06/2021"
      }
    },
    {
      id: "doc-itr",
      title: "ITR Documents",
      fileName: "ITR_V_Acknowledgement_FY24_25.pdf",
      fileSize: "2.8 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Financial / Compliance",
      content: {
        assessmentYear: "2025-26",
        panNumber: "AABCA1234F",
        name: "ABC ENGINEERING LIMITED",
        address: "Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058",
        status: "Domestic Company",
        formType: "ITR-6",
        acknowledgementNo: "849201948192039",
        businessLoss: "0",
        totalIncome: "486738460",
        taxPaid: "122485000",
        filingTimestamp: "28-07-2025 15:25:22",
        ipAddress: "103.24.188.42",
        signatoryName: "Rajesh Kumar"
      }
    },
    {
      id: "doc-epfo",
      title: "EPFO Registration Letter",
      fileName: "EPFO_Code_Intimation.pdf",
      fileSize: "1.1 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Labor Compliance",
      content: {
        refNo: "TN/MAS/0048291/000/18293",
        intimationDate: "14/08/2021",
        establishmentName: "ABC ENGINEERING LIMITED",
        address: "Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058",
        establishmentCode: "TN/MAS/0048291",
        panNumber: "AABCA1234F",
        coverageDate: "01/06/2008",
        primaryActivity: "MANUFACTURE OF INDUSTRIAL VALVES AND FLOW EQUIPMENT",
        ownershipType: "Private Limited Company",
        regionalOffice: "Regional Office, Chennai North"
      }
    },
    {
      id: "doc-esic",
      title: "ESIC Registration Letter",
      fileName: "ESIC_Form_C11_Registration.pdf",
      fileSize: "1.3 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Labor Compliance",
      content: {
        employerCode: "52000849200000606",
        legalName: "ABC ENGINEERING PRIVATE LIMITED",
        address: "Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058",
        esicDate: "18/09/2021",
        coverageDate: "01-09-2021",
        esicOffice: "Regional Office, Employees' State Insurance Corporation",
        esicOfficeAddress: "143, Sterling Road, Nungambakkam, Chennai - 600034",
        esicBranch: "Branch Office, Ambattur, Chennai-600058",
        esicOfficer: "K. Srinivasa Rao"
      }
    },
    {
      id: "doc-mii",
      title: "Make in India Declaration",
      fileName: "Make_in_India_Declaration.pdf",
      fileSize: "1.9 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory / Policy",
      content: {
        legalName: "ABC ENGINEERING PRIVATE LIMITED",
        businessLine: "Heavy Flow Valves & High Pressure Fluid Systems • ISO 9001:2015 Certified",
        cin: "L28120TN2004PLC053210",
        gstin: "33AABCA1234F1Z8",
        address: "Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058",
        email: "tenders@abcengineering.com",
        website: "www.abcengineering.com",
        refNo: "ABC/CPCL/MII-DECL/2026/045",
        declarationDate: "28th August 2026",
        tenderRef: "CPCL/2026/TE/045",
        localContentPercentage: "75.00",
        supplierClass: "CLASS-I LOCAL SUPPLIER",
        manufacturingPlantAddress: "Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058",
        signatoryName: "Rajesh Kumar",
        signatoryDesignation: "Managing Director & Authorized Signatory",
        signatoryId: "DIN: 02849102"
      }
    },
    {
      id: "doc-balance-sheet",
      title: "Audited Balance Sheet",
      fileName: "Audited_Balance_Sheet_FY25.pdf",
      fileSize: "4.6 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Financial Compliance",
      content: {
        enterpriseName: "ABC ENGINEERING LIMITED",
        address: "PLOT NO. 14-B, AMBATTUR INDUSTRIAL ESTATE, CHENNAI, TAMIL NADU - 600058",
        balanceSheetDate: "AUDITED BALANCE SHEET AS AT 31.03.2025",
        auditDate: "28/08/2025",
        auditPlace: "CHENNAI",
        signatoryName: "Rajesh Kumar (Managing Director)",
        caFirm: "AMKN & CO, Chartered Accountants",
        caPartner: "CA NITIN KAUSHIK (Partner)",
        caMembershipNo: "M.NO- 558996",
        caUdin: "25558996BGSVMJ2721",
        caFrn: "FRN: 032712C",
        caCity: "CHENNAI / NEW DELHI",
        capitalAmount: "4816233.00",
        netProfit: "3300387.00",
        totalBalance: "48673846.00"
      }
    },
    {
      id: "doc-boq",
      title: "Technical BOQ Compliance Datasheet",
      fileName: "Technical_BOQ_Compliance_Datasheet.pdf",
      fileSize: "2.1 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Technical Eligibility",
      content: {
        bidderName: "ABC Engineering Ltd",
        tenderRef: "CPCL/2026/TE/045",
        testLab: "L&T Central Testing Laboratory (NABL Accredited)",
        qaEngineer: "K. Ramaswamy, M.Tech",
        actuatorOrigin: "Voith-Rexroth Hydraulic Actuator, Manufactured in Frankenthal, Germany",
        hasImportedAnomaly: true
      }
    },
    {
      id: "doc-oem",
      title: "OEM Manufacturer Authorization Form (MAF)",
      fileName: "OEM_Authorization_Letter_MAF.pdf",
      fileSize: "1.2 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Commercial / Authorization",
      content: {
        oemName: "ABC VALVECRAFT MANUFACTURING LTD",
        oemAddress: "Plot 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu",
        authorizedBidder: "ABC ENGINEERING LIMITED",
        tenderRef: "CPCL/2026/TE/045",
        warrantyPeriod: "36 (Thirty-Six) Months On-Site PSU Warranty",
        oemSignatory: "Dr. Sundararajan V.",
        oemSignatoryDesignation: "Vice President (PSU Tenders & Contracts)"
      }
    },
    {
      id: "doc-undertaking",
      title: "Non-Blacklisting Undertaking (Stamp Paper)",
      fileName: "Non_Blacklisting_Undertaking_eStamp.pdf",
      fileSize: "1.6 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory Undertaking",
      content: {
        stampSerialNumber: "IN-TN98234710298374U",
        deponentName: "Mr. Rajesh Kumar, ABC ENGINEERING LIMITED",
        legalName: "ABC ENGINEERING LIMITED",
        address: "Plot 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu",
        notarizedDate: "28/08/2026",
        signatoryName: "Rajesh Kumar",
        signatoryDesignation: "Managing Director",
        signatoryId: "DIN: 02849102",
        notaryName: "R. SHANMUGAM",
        notaryLocation: "CHENNAI - INDIA",
        notaryRegNo: "REG. NO. 4412/2014",
        notaryAdvocate: "R. Shanmugam, B.Sc., B.L.",
        notaryValidity: "14-06-2029",
        solemnAffirmation: "We hereby solemnly affirm and state on oath that M/s ABC Engineering Limited, its directors, partners, and key managerial personnel have never been blacklisted, debarred, suspended, or put on holiday list by GeM, Ministry of Petroleum & Natural Gas, CPCL, any Central/State Government Ministry, PSU, or multilateral funding agency. We also confirm full compliance with the Integrity Pact without any conflict of interest."
      }
    }
  ],

  // ═════════════════════════════════════════════════════════════════════
  // BID-002: BHARAT INDUSTRIES (Mumbai, Maharashtra)
  // Profile: Top tier pipeline supplier, 100% genuine & fully compliant
  // AI Finding: Gold standard compliance, score 96/100, Unconditional Qualified
  // ═════════════════════════════════════════════════════════════════════
  "BID-002": [
    {
      id: "doc-gst",
      title: "GST Registration Certificate",
      fileName: "GST_REG06_27AABCB9876E1ZT.pdf",
      fileSize: "1.2 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory / Tax",
      content: {
        registrationNumber: "27AABCB9876E1ZT",
        legalName: "BHARAT INDUSTRIES",
        tradeName: "BHARAT INDUSTRIES & HEAVY VALVES",
        constitutionOfBusiness: "Partnership Firm",
        principalAddress: "Survey No. 42, MIDC Industrial Area, Turbhe, Navi Mumbai, Maharashtra - 400705",
        dateOfLiability: "01/07/2017",
        validity: "Active / Regular",
        typeOfTaxpayer: "Regular",
        approvingState: "Maharashtra",
        officerName: "Sunil M. Kulkarni",
        officerDesignation: "State Tax Officer",
        jurisdiction: "MUMBAI CENTRAL-IV",
        issueDate: "20/07/2017",
        dscTimestamp: "2017.07.20 11:10:45 IST"
      }
    },
    {
      id: "doc-pan",
      title: "PAN Card",
      fileName: "PAN_Card_AABCB9876E.pdf",
      fileSize: "790 KB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory / Identity",
      content: {
        panNumber: "AABCB9876E",
        name: "BHARAT INDUSTRIES",
        fathersName: "N/A (PARTNERSHIP ENTITY)",
        incorporationDate: "18/03/2009",
        signatoryName: "Vikramjit Sharma",
        issuingAuthority: "Income Tax Department, Government of India",
        cin: "N/A (Registered Partnership: MH-MUM-2009-8819)"
      }
    },
    {
      id: "doc-udyam",
      title: "Udyam / MSME Certificate",
      fileName: "Udyam_Registration_UDYAM-MH-01.pdf",
      fileSize: "1.0 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Enterprise Classification",
      content: {
        udyamNumber: "UDYAM-MH-01-0081290",
        enterpriseName: "BHARAT INDUSTRIES",
        classificationType: "Small",
        classificationYear: "2024-25",
        classificationDate: "15/09/2020",
        majorActivityBanner: "MANUFACTURING",
        socialCategory: "GENERAL",
        flatDoorBlock: "Shed No. B-12",
        premisesBuilding: "MIDC Industrial Estate",
        villageTown: "Turbhe",
        block: "Navi Mumbai",
        roadStreetLane: "Thane-Belapur Road",
        city: "NAVI MUMBAI",
        state: "MAHARASHTRA",
        district: "THANE , Pin 400705",
        mobile: "9820087654",
        email: "commercial@bharatindustries.in",
        dateOfIncorporation: "18/03/2009",
        dateOfCommencement: "01/05/2009",
        dateOfUdyamRegistration: "15/09/2020"
      }
    },
    {
      id: "doc-itr",
      title: "ITR Documents",
      fileName: "ITR_V_Acknowledgement_FY24_25.pdf",
      fileSize: "2.5 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Financial / Compliance",
      content: {
        assessmentYear: "2025-26",
        panNumber: "AABCB9876E",
        name: "BHARAT INDUSTRIES",
        address: "Survey No. 42, MIDC Industrial Area, Turbhe, Navi Mumbai, Maharashtra - 400705",
        status: "Firm",
        formType: "ITR-5",
        acknowledgementNo: "791820491823901",
        businessLoss: "0",
        totalIncome: "624018900",
        taxPaid: "189420000",
        filingTimestamp: "22-07-2025 11:18:40",
        ipAddress: "115.114.88.29",
        signatoryName: "Vikramjit Sharma"
      }
    },
    {
      id: "doc-epfo",
      title: "EPFO Registration Letter",
      fileName: "EPFO_Code_Intimation_Letter.pdf",
      fileSize: "1.0 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Labor Compliance",
      content: {
        refNo: "MH/BAN/0091820/000/44819",
        intimationDate: "10/06/2019",
        establishmentName: "BHARAT INDUSTRIES",
        address: "Survey No. 42, MIDC Industrial Area, Turbhe, Navi Mumbai, Maharashtra - 400705",
        establishmentCode: "MH/BAN/0091820",
        panNumber: "AABCB9876E",
        coverageDate: "01/04/2012",
        primaryActivity: "ENGINEERING FABRICATION AND VALVE MANUFACTURING",
        ownershipType: "Partnership Firm",
        regionalOffice: "Regional Office, Bandra, Mumbai"
      }
    },
    {
      id: "doc-esic",
      title: "ESIC Registration Letter",
      fileName: "ESIC_Form_C11_Registration.pdf",
      fileSize: "1.2 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Labor Compliance",
      content: {
        employerCode: "31000789120000808",
        legalName: "BHARAT INDUSTRIES",
        address: "Survey No. 42, MIDC Industrial Area, Turbhe, Navi Mumbai, Maharashtra - 400705",
        esicDate: "24/05/2019",
        coverageDate: "01-05-2019",
        esicOffice: "Regional Office, Employees' State Insurance Corporation",
        esicOfficeAddress: "Panchdeep Bhavan, N.M. Joshi Marg, Lower Parel, Mumbai - 400013",
        esicBranch: "Branch Office, Vashi, Navi Mumbai - 400703",
        esicOfficer: "Prakash V. Sawant"
      }
    },
    {
      id: "doc-mii",
      title: "Make in India Declaration",
      fileName: "Make_in_India_Declaration_PPO2017.pdf",
      fileSize: "1.8 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory / Policy",
      content: {
        legalName: "BHARAT INDUSTRIES",
        businessLine: "Manufacturer of High Pressure Valves & Cryogenic Pipeline Systems",
        cin: "Partnership Reg: MH-MUM-2009-8819",
        gstin: "27AABCB9876E1ZT",
        address: "Survey No. 42, MIDC Industrial Area, Turbhe, Navi Mumbai, Maharashtra - 400705",
        email: "commercial@bharatindustries.in",
        website: "www.bharatindustries.in",
        refNo: "BI/TEND/MII-DECL/2026/02",
        declarationDate: "27th August 2026",
        tenderRef: "CPCL/2026/TE/045",
        localContentPercentage: "82.00",
        supplierClass: "CLASS-I LOCAL SUPPLIER",
        manufacturingPlantAddress: "Survey No. 42, MIDC Industrial Area, Turbhe, Navi Mumbai, Maharashtra - 400705",
        signatoryName: "Vikramjit Sharma",
        signatoryDesignation: "Managing Partner",
        signatoryId: "UID: 9812-4412-8819"
      }
    },
    {
      id: "doc-balance-sheet",
      title: "Audited Balance Sheet",
      fileName: "Audited_Balance_Sheet_FY24_25.pdf",
      fileSize: "4.1 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Financial Compliance",
      content: {
        enterpriseName: "BHARAT INDUSTRIES",
        address: "SURVEY NO. 42, MIDC INDUSTRIAL AREA, TURBHE, NAVI MUMBAI, MAHARASHTRA - 400705",
        balanceSheetDate: "AUDITED BALANCE SHEET AS AT 31.03.2025",
        auditDate: "20/08/2025",
        auditPlace: "MUMBAI",
        signatoryName: "Vikramjit Sharma (Managing Partner)",
        caFirm: "S.K. AGARWAL & ASSOCIATES, Chartered Accountants",
        caPartner: "CA S.K. AGARWAL (Senior Partner)",
        caMembershipNo: "M.NO- 044812",
        caUdin: "25044812BMRSTX9182",
        caFrn: "FRN: 014298W",
        caCity: "MUMBAI",
        capitalAmount: "6450000.00",
        netProfit: "4820000.00",
        totalBalance: "62401890.00"
      }
    },
    {
      id: "doc-boq",
      title: "Technical BOQ Compliance Datasheet",
      fileName: "Technical_Datasheet_BOQ_Compliance.pdf",
      fileSize: "2.3 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Technical Eligibility",
      content: {
        bidderName: "Bharat Industries",
        tenderRef: "CPCL/2026/TE/045",
        testLab: "FCRI (Fluid Control Research Institute, Palakkad)",
        qaEngineer: "Anand Deshpande, B.E. (Mech)",
        actuatorOrigin: "Indigenous Domestic Electro-Hydraulic Actuator (BHEL-Ancillary Certified)",
        hasImportedAnomaly: false
      }
    },
    {
      id: "doc-oem",
      title: "OEM Manufacturer Authorization Form (MAF)",
      fileName: "OEM_Authorization_MAF_Letter.pdf",
      fileSize: "1.1 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Commercial / Authorization",
      content: {
        oemName: "BHARAT VALVEWORKS OEM CORP",
        oemAddress: "MIDC Turbhe, Navi Mumbai, Maharashtra",
        authorizedBidder: "BHARAT INDUSTRIES",
        tenderRef: "CPCL/2026/TE/045",
        warrantyPeriod: "36 (Thirty-Six) Months Comprehensive PSU Warranty",
        oemSignatory: "H.N. Trivedi",
        oemSignatoryDesignation: "Director - OEM PSU Sales"
      }
    },
    {
      id: "doc-undertaking",
      title: "Non-Blacklisting Undertaking (Stamp Paper)",
      fileName: "Affidavit_NonBlacklisting_Stamp100.pdf",
      fileSize: "1.5 MB",
      uploadDate: "01 Sep 2026",
      verified: true,
      category: "Statutory Undertaking",
      content: {
        stampSerialNumber: "IN-MH44918203918274P",
        deponentName: "Mr. Vikramjit Sharma, BHARAT INDUSTRIES",
        legalName: "BHARAT INDUSTRIES",
        address: "Survey No. 42, MIDC Industrial Area, Turbhe, Navi Mumbai, Maharashtra",
        notarizedDate: "27/08/2026",
        signatoryName: "Vikramjit Sharma",
        signatoryDesignation: "Managing Partner",
        signatoryId: "UID: 9812-4412-8819",
        notaryName: "S.B. JOSHI",
        notaryLocation: "MUMBAI - MAHARASHTRA",
        notaryRegNo: "REG. NO. 5120/2016",
        notaryAdvocate: "S.B. Joshi, Advocate High Court",
        notaryValidity: "22-10-2028",
        solemnAffirmation: "We, Bharat Industries, solemnly affirm that our firm and its partners have never been blacklisted, debarred or penalized by GeM, CPCL, ONGC, or any Central/State Ministry or PSU. All tender disclosures are true and verified."
      }
    }
  ],

  // ═════════════════════════════════════════════════════════════════════
  // BID-003: ZENITH PVT LTD (New Delhi / Bangalore)
  // Profile: Aggressive trader / contractor
  // INTENTIONAL FLAWS SEEDED:
  // 1. GSTIN 07AABCZ5544K1ZS is SUSPENDED on Govt Portal (Rule 21A, non-filing)
  // 2. PAN entity mismatch: PAN is registered to "ZENITH TRADING & LOGISTICS LLP"
  // 3. Fake CA UDIN "26048192AAAAAA0000" fails ICAI Databank validation
  // 4. Missing 10th Mandatory Document: OEM Authorization Form (9/10 submitted)
  // AI Finding: Score 34/100, HIGH RISK, REJECTED
  // ═════════════════════════════════════════════════════════════════════
  "BID-003": [
    {
      id: "doc-gst",
      title: "GST Registration Certificate",
      fileName: "GST_Certificate_07AABCZ5544K1ZS.pdf",
      fileSize: "1.1 MB",
      uploadDate: "31 Aug 2026",
      verified: false,
      flagged: true,
      category: "Statutory / Tax",
      content: {
        registrationNumber: "07AABCZ5544K1ZS",
        legalName: "ZENITH TRADING & LOGISTICS LLP", // Note: Bidder submitted as Zenith Pvt Ltd!
        tradeName: "ZENITH FLOW SYSTEMS",
        constitutionOfBusiness: "Limited Liability Partnership",
        principalAddress: "Flat 402, Barakhamba Road, Connaught Place, New Delhi - 110001",
        dateOfLiability: "01/07/2017",
        validity: "Active / Regular", // FLAW: Reality in Govt Registry is SUSPENDED!
        typeOfTaxpayer: "Regular",
        approvingState: "Delhi",
        officerName: "Rameshwar Dayal",
        officerDesignation: "Superintendent of GST",
        jurisdiction: "WARD 45 NEW DELHI",
        issueDate: "14/09/2017",
        dscTimestamp: "2017.09.14 16:30:10 IST"
      }
    },
    {
      id: "doc-pan",
      title: "PAN Card",
      fileName: "PAN_Card_AABCZ5544K.pdf",
      fileSize: "750 KB",
      uploadDate: "31 Aug 2026",
      verified: false,
      flagged: true,
      category: "Statutory / Identity",
      content: {
        panNumber: "AABCZ5544K",
        name: "ZENITH LOGISTICS & TRADING LLP", // FLAW: Mismatch with applicant "Zenith Pvt Ltd"
        fathersName: "N/A (LLP ENTITY)",
        incorporationDate: "11/11/2016",
        signatoryName: "Arun Mehra",
        issuingAuthority: "Income Tax Department, Government of India",
        cin: "LLPIN: AAH-8821"
      }
    },
    {
      id: "doc-udyam",
      title: "Udyam / MSME Certificate",
      fileName: "Udyam_Registration_Certificate.pdf",
      fileSize: "980 KB",
      uploadDate: "31 Aug 2026",
      verified: true,
      category: "Enterprise Classification",
      content: {
        udyamNumber: "UDYAM-DL-05-0012450",
        enterpriseName: "ZENITH FLOW SYSTEMS",
        classificationType: "Micro",
        classificationYear: "2024-25",
        classificationDate: "05/01/2021",
        majorActivityBanner: "SERVICES", // FLAW: Services enterprise applying for Manufacturing tender!
        socialCategory: "GENERAL",
        flatDoorBlock: "Flat 402",
        premisesBuilding: "Devika Tower",
        villageTown: "Barakhamba Road",
        block: "Connaught Place",
        roadStreetLane: "K.G. Marg",
        city: "NEW DELHI",
        state: "DELHI",
        district: "NEW DELHI , Pin 110001",
        mobile: "9811154321",
        email: "tenders@zenithflow.co.in",
        dateOfIncorporation: "11/11/2016",
        dateOfCommencement: "01/12/2016",
        dateOfUdyamRegistration: "05/01/2021"
      }
    },
    {
      id: "doc-itr",
      title: "ITR Documents",
      fileName: "ITR_V_Acknowledgement_FY24_25.pdf",
      fileSize: "2.1 MB",
      uploadDate: "31 Aug 2026",
      verified: true,
      category: "Financial / Compliance",
      content: {
        assessmentYear: "2025-26",
        panNumber: "AABCZ5544K",
        name: "ZENITH LOGISTICS & TRADING LLP",
        address: "Flat 402, Barakhamba Road, Connaught Place, New Delhi - 110001",
        status: "LLP",
        formType: "ITR-5",
        acknowledgementNo: "629104829104829",
        businessLoss: "0",
        totalIncome: "121004000",
        taxPaid: "36200000",
        filingTimestamp: "15-08-2025 18:40:12",
        ipAddress: "49.36.12.91",
        signatoryName: "Arun Mehra"
      }
    },
    {
      id: "doc-epfo",
      title: "EPFO Registration Letter",
      fileName: "EPFO_Code_Intimation.pdf",
      fileSize: "950 KB",
      uploadDate: "31 Aug 2026",
      verified: false,
      flagged: true,
      category: "Labor Compliance",
      content: {
        refNo: "DL/CPM/0029103/000/18293",
        intimationDate: "17/08/2020",
        establishmentName: "ZENITH PVT LTD",
        address: "Flat 402, Barakhamba Road, Connaught Place, New Delhi - 110001",
        establishmentCode: "DL/CPM/0029103",
        panNumber: "AABCZ5544K",
        coverageDate: "01/07/2020",
        primaryActivity: "CONSULTING AND TECHNICAL CONTRACTS",
        ownershipType: "Private Limited Company",
        regionalOffice: "Regional Office, Connaught Place, Delhi"
      }
    },
    {
      id: "doc-esic",
      title: "ESIC Registration Letter",
      fileName: "ESIC_Form_C11_Letter.pdf",
      fileSize: "1.1 MB",
      uploadDate: "31 Aug 2026",
      verified: true,
      category: "Labor Compliance",
      content: {
        employerCode: "11000948210000404",
        legalName: "ZENITH PVT LTD",
        address: "Flat 402, Barakhamba Road, Connaught Place, New Delhi - 110001",
        esicDate: "14/09/2020",
        coverageDate: "01-09-2020",
        esicOffice: "Regional Office, Employees' State Insurance Corporation",
        esicOfficeAddress: "DDA Complex, Okhla Phase-I, New Delhi - 110020",
        esicBranch: "Branch Office, Connaught Place, New Delhi - 110001",
        esicOfficer: "Satish Chand"
      }
    },
    {
      id: "doc-mii",
      title: "Make in India Declaration",
      fileName: "Make_in_India_SelfDeclaration.pdf",
      fileSize: "1.5 MB",
      uploadDate: "31 Aug 2026",
      verified: true,
      category: "Statutory / Policy",
      content: {
        legalName: "ZENITH PVT LTD",
        businessLine: "Flow Controls & Commercial Piping Division",
        cin: "U51909DL2016PTC308910",
        gstin: "07AABCZ5544K1ZS",
        address: "Flat 402, Barakhamba Road, Connaught Place, New Delhi - 110001",
        email: "tenders@zenithflow.co.in",
        website: "www.zenithflow.co.in",
        refNo: "ZPL/CPCL/MII/2026/08",
        declarationDate: "25th August 2026",
        tenderRef: "CPCL/2026/TE/045",
        localContentPercentage: "52.00",
        supplierClass: "CLASS-I LOCAL SUPPLIER",
        manufacturingPlantAddress: "Plot 89, Sector 59, Faridabad Industrial Area, Haryana - 121004",
        signatoryName: "Arun Mehra",
        signatoryDesignation: "Director",
        signatoryId: "DIN: 07481920"
      }
    },
    {
      id: "doc-balance-sheet",
      title: "Audited Balance Sheet",
      fileName: "Balance_Sheet_Audited_FY24_25.pdf",
      fileSize: "3.8 MB",
      uploadDate: "31 Aug 2026",
      verified: false,
      flagged: true,
      category: "Financial Compliance",
      content: {
        enterpriseName: "ZENITH PVT LTD",
        address: "FLAT 402, BARAKHAMBA ROAD, CONNAUGHT PLACE, NEW DELHI - 110001",
        balanceSheetDate: "PROVISIONAL / AUDITED BALANCE SHEET AS AT 31.03.2025",
        auditDate: "25/08/2025",
        auditPlace: "NEW DELHI",
        signatoryName: "Arun Mehra (Director)",
        caFirm: "GUPTA & ASSOCIATES, Chartered Accountants",
        caPartner: "CA R.K. GUPTA (Prop)",
        caMembershipNo: "M.NO- 048192",
        caUdin: "26048192AAAAAA0000", // CRITICAL FLAW: Fake / invalid UDIN checksum!
        caFrn: "FRN: 009281N",
        caCity: "NEW DELHI",
        capitalAmount: "2100000.00",
        netProfit: "1150000.00",
        totalBalance: "12100400.00"
      }
    },
    {
      id: "doc-boq",
      title: "Technical BOQ Compliance Datasheet",
      fileName: "Technical_Compliance_BOQ.pdf",
      fileSize: "1.9 MB",
      uploadDate: "31 Aug 2026",
      verified: true,
      category: "Technical Eligibility",
      content: {
        bidderName: "Zenith Pvt Ltd",
        tenderRef: "CPCL/2026/TE/045",
        testLab: "Delhi Test House (NABL Accredited)",
        qaEngineer: "Vikas Tyagi",
        actuatorOrigin: "Domestic Actuator Assembly",
        hasImportedAnomaly: false
      }
    },
    // Note: OEM Manufacturer Authorization Form is OMITTED (9/10 documents uploaded)
    {
      id: "doc-undertaking",
      title: "Non-Blacklisting Undertaking (Stamp Paper)",
      fileName: "NonBlacklisting_Affidavit_DelhiStamp.pdf",
      fileSize: "1.4 MB",
      uploadDate: "31 Aug 2026",
      verified: true,
      category: "Statutory Undertaking",
      content: {
        stampSerialNumber: "IN-DL10928471928475K",
        deponentName: "Mr. Arun Mehra, ZENITH PVT LTD",
        legalName: "ZENITH PVT LTD",
        address: "Flat 402, Barakhamba Road, Connaught Place, New Delhi - 110001",
        notarizedDate: "26/08/2026",
        signatoryName: "Arun Mehra",
        signatoryDesignation: "Director",
        signatoryId: "DIN: 07481920",
        notaryName: "K.K. VERMA",
        notaryLocation: "DELHI - INDIA",
        notaryRegNo: "REG. NO. 1198/2012",
        notaryAdvocate: "K.K. Verma, Notary Public",
        notaryValidity: "18-09-2027",
        solemnAffirmation: "I, Arun Mehra, Director of Zenith Pvt Ltd, do solemnly state that our firm has never been blacklisted or debarred by any government department or CPCL."
      }
    }
  ],

  // ═════════════════════════════════════════════════════════════════════
  // BID-004: SHREERAM ENTERPRISES (Ahmedabad, Gujarat)
  // Profile: Mid-sized trading entity
  // INTENTIONAL FLAWS SEEDED:
  // 1. Turnover fails tender criteria: Audited turnover is only ₹8.40 Cr (< ₹15.00 Cr requirement)
  // 2. ESIC Default: Recovery Notice issued by ESIC Regional Office Ahmedabad
  // 3. Make in India Class-II only (42.00% local content, tender requires Class-I >= 50%)
  // AI Finding: Score 58/100, MEDIUM RISK, CLARIFICATION / CONDITIONAL REJECTION
  // ═════════════════════════════════════════════════════════════════════
  "BID-004": [
    {
      id: "doc-gst",
      title: "GST Registration Certificate",
      fileName: "GST_REG06_24AABCS4433D1ZP.pdf",
      fileSize: "1.2 MB",
      uploadDate: "30 Aug 2026",
      verified: true,
      category: "Statutory / Tax",
      content: {
        registrationNumber: "24AABCS4433D1ZP",
        legalName: "SHREERAM ENTERPRISES",
        tradeName: "SHREERAM VALVE & CONTROLS",
        constitutionOfBusiness: "Proprietorship",
        principalAddress: "Shop No. 18, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat - 382445",
        dateOfLiability: "01/07/2017",
        validity: "Active / Regular",
        typeOfTaxpayer: "Regular",
        approvingState: "Gujarat",
        officerName: "Bharatbhai Patel",
        officerDesignation: "State Tax Officer",
        jurisdiction: "AHMEDABAD WEST",
        issueDate: "10/08/2017",
        dscTimestamp: "2017.08.10 12:45:19 IST"
      }
    },
    {
      id: "doc-pan",
      title: "PAN Card",
      fileName: "PAN_Card_AABCS4433D.pdf",
      fileSize: "810 KB",
      uploadDate: "30 Aug 2026",
      verified: true,
      category: "Statutory / Identity",
      content: {
        panNumber: "AABCS4433D",
        name: "SHREERAM ENTERPRISES",
        fathersName: "Rameshchandra Deshmukh",
        incorporationDate: "05/09/2014",
        signatoryName: "Pooja Deshmukh",
        issuingAuthority: "Income Tax Department, Government of India",
        cin: "Proprietorship Registration (GIDC-VATVA-2014-991)"
      }
    },
    {
      id: "doc-udyam",
      title: "Udyam / MSME Certificate",
      fileName: "Udyam_Registration_GJ03.pdf",
      fileSize: "1.1 MB",
      uploadDate: "30 Aug 2026",
      verified: true,
      category: "Enterprise Classification",
      content: {
        udyamNumber: "UDYAM-GJ-03-0099881",
        enterpriseName: "SHREERAM ENTERPRISES",
        classificationType: "Micro",
        classificationYear: "2024-25",
        classificationDate: "19/11/2020",
        majorActivityBanner: "MANUFACTURING",
        socialCategory: "OBC",
        flatDoorBlock: "Shed No. 18",
        premisesBuilding: "Phase-I GIDC",
        villageTown: "Vatva",
        block: "Vatva GIDC",
        roadStreetLane: "Phase-I Main Road",
        city: "AHMEDABAD",
        state: "GUJARAT",
        district: "AHMEDABAD , Pin 382445",
        mobile: "9833311223",
        email: "contracts@shreeram.org",
        dateOfIncorporation: "05/09/2014",
        dateOfCommencement: "01/10/2014",
        dateOfUdyamRegistration: "19/11/2020"
      }
    },
    {
      id: "doc-itr",
      title: "ITR Documents",
      fileName: "ITR_V_Acknowledgement_FY24_25.pdf",
      fileSize: "2.3 MB",
      uploadDate: "30 Aug 2026",
      verified: true,
      category: "Financial / Compliance",
      content: {
        assessmentYear: "2025-26",
        panNumber: "AABCS4433D",
        name: "SHREERAM ENTERPRISES",
        address: "Shop No. 18, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat - 382445",
        status: "Individual / Proprietor",
        formType: "ITR-3",
        acknowledgementNo: "518290384918293",
        businessLoss: "0",
        totalIncome: "84000000", // FLAW: Turnover only 8.40 Cr, fails 15.00 Cr criterion
        taxPaid: "24500000",
        filingTimestamp: "30-07-2025 16:12:08",
        ipAddress: "122.170.82.14",
        signatoryName: "Pooja Deshmukh"
      }
    },
    {
      id: "doc-epfo",
      title: "EPFO Registration Letter",
      fileName: "EPFO_Code_Allotment.pdf",
      fileSize: "1.0 MB",
      uploadDate: "30 Aug 2026",
      verified: true,
      category: "Labor Compliance",
      content: {
        refNo: "GJ/AHD/0055192/000/18293",
        intimationDate: "12/03/2018",
        establishmentName: "SHREERAM ENTERPRISES",
        address: "Shop No. 18, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat - 382445",
        establishmentCode: "GJ/AHD/0055192",
        panNumber: "AABCS4433D",
        coverageDate: "01/01/2016",
        primaryActivity: "SUPPLY OF INDUSTRIAL PIPING COMPONENTS",
        ownershipType: "Proprietorship",
        regionalOffice: "Regional Office, Ahmedabad"
      }
    },
    {
      id: "doc-esic",
      title: "ESIC Registration Letter",
      fileName: "ESIC_Form_C11_Letter.pdf",
      fileSize: "1.2 MB",
      uploadDate: "30 Aug 2026",
      verified: false,
      flagged: true,
      category: "Labor Compliance",
      content: {
        employerCode: "41000892100000101",
        legalName: "SHREERAM ENTERPRISES",
        address: "Shop No. 18, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat - 382445",
        esicDate: "08/04/2018",
        coverageDate: "01-04-2018",
        esicOffice: "Regional Office, Employees' State Insurance Corporation",
        esicOfficeAddress: "Panchdeep Bhavan, Ashram Road, Ahmedabad - 380014",
        esicBranch: "Branch Office, Vatva GIDC, Ahmedabad - 382445",
        esicOfficer: "Jitendra Solanki",
        hasArrearsWarning: true // FLAW: Arrears pending with ESIC
      }
    },
    {
      id: "doc-mii",
      title: "Make in India Declaration",
      fileName: "Make_in_India_Declaration.pdf",
      fileSize: "1.6 MB",
      uploadDate: "30 Aug 2026",
      verified: false,
      flagged: true,
      category: "Statutory / Policy",
      content: {
        legalName: "SHREERAM ENTERPRISES",
        businessLine: "Industrial Piping & Fluid Valves Supplier",
        cin: "GIDC-VATVA-2014-991",
        gstin: "24AABCS4433D1ZP",
        address: "Shop No. 18, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat - 382445",
        email: "contracts@shreeram.org",
        website: "www.shreeram.org",
        refNo: "SRE/CPCL/MII/2026/01",
        declarationDate: "26th August 2026",
        tenderRef: "CPCL/2026/TE/045",
        localContentPercentage: "42.00", // FLAW: Class-II (42%) vs Tender requirement Class-I (>= 50%)
        supplierClass: "CLASS-II LOCAL SUPPLIER",
        manufacturingPlantAddress: "Shop No. 18, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat - 382445",
        signatoryName: "Pooja Deshmukh",
        signatoryDesignation: "Proprietor",
        signatoryId: "PAN: AABCS4433D"
      }
    },
    {
      id: "doc-balance-sheet",
      title: "Audited Balance Sheet",
      fileName: "Audited_Balance_Sheet_FY24_25.pdf",
      fileSize: "3.9 MB",
      uploadDate: "30 Aug 2026",
      verified: false,
      flagged: true,
      category: "Financial Compliance",
      content: {
        enterpriseName: "SHREERAM ENTERPRISES",
        address: "SHOP NO. 18, GIDC INDUSTRIAL ESTATE, VATVA, AHMEDABAD, GUJARAT - 382445",
        balanceSheetDate: "AUDITED BALANCE SHEET AS AT 31.03.2025",
        auditDate: "26/08/2025",
        auditPlace: "AHMEDABAD",
        signatoryName: "Pooja Deshmukh (Proprietor)",
        caFirm: "PATEL & SHAH, Chartered Accountants",
        caPartner: "CA HITESH PATEL (Partner)",
        caMembershipNo: "M.NO- 089123",
        caUdin: "25089123BVBNMA8821",
        caFrn: "FRN: 019283W",
        caCity: "AHMEDABAD",
        capitalAmount: "1850000.00",
        netProfit: "890000.00",
        totalBalance: "8400000.00" // Turnover ₹8.40 Cr (Fails ₹15.00 Cr criterion)
      }
    },
    {
      id: "doc-boq",
      title: "Technical BOQ Compliance Datasheet",
      fileName: "Technical_BOQ_Compliance.pdf",
      fileSize: "2.0 MB",
      uploadDate: "30 Aug 2026",
      verified: true,
      category: "Technical Eligibility",
      content: {
        bidderName: "ShreeRam Enterprises",
        tenderRef: "CPCL/2026/TE/045",
        testLab: "ERDA (Electrical Research and Development Association, Vadodara)",
        qaEngineer: "Dinesh K. Parmar",
        actuatorOrigin: "Domestic Actuator Mechanism",
        hasImportedAnomaly: false
      }
    },
    {
      id: "doc-oem",
      title: "OEM Manufacturer Authorization Form (MAF)",
      fileName: "OEM_Authorization_Letter.pdf",
      fileSize: "1.1 MB",
      uploadDate: "30 Aug 2026",
      verified: true,
      category: "Commercial / Authorization",
      content: {
        oemName: "GUJARAT VALVE FABRICATORS LTD",
        oemAddress: "Plot 102, GIDC Vatva, Ahmedabad, Gujarat",
        authorizedBidder: "SHREERAM ENTERPRISES",
        tenderRef: "CPCL/2026/TE/045",
        warrantyPeriod: "36 (Thirty-Six) Months Warranty",
        oemSignatory: "Kantilal Shah",
        oemSignatoryDesignation: "General Manager (Sales)"
      }
    },
    {
      id: "doc-undertaking",
      title: "Non-Blacklisting Undertaking (Stamp Paper)",
      fileName: "Affidavit_eStamp_Gujarat.pdf",
      fileSize: "1.5 MB",
      uploadDate: "30 Aug 2026",
      verified: true,
      category: "Statutory Undertaking",
      content: {
        stampSerialNumber: "IN-GJ33918204918273M",
        deponentName: "Ms. Pooja Deshmukh, SHREERAM ENTERPRISES",
        legalName: "SHREERAM ENTERPRISES",
        address: "Shop No. 18, GIDC Industrial Estate, Vatva, Ahmedabad, Gujarat",
        notarizedDate: "26/08/2026",
        signatoryName: "Pooja Deshmukh",
        signatoryDesignation: "Proprietor",
        signatoryId: "PAN: AABCS4433D",
        notaryName: "B.C. JADEJA",
        notaryLocation: "AHMEDABAD - GUJARAT",
        notaryRegNo: "REG. NO. 3319/2015",
        notaryAdvocate: "B.C. Jadeja, Notary Govt of Gujarat",
        notaryValidity: "11-04-2028",
        solemnAffirmation: "I, Pooja Deshmukh, Proprietor of ShreeRam Enterprises, solemnly affirm that our firm has never been blacklisted or debarred by any government department, PSU or GeM."
      }
    }
  ],

  // ═════════════════════════════════════════════════════════════════════
  // BID-005: KAVACH ENGINEERING & POWER SYSTEMS PVT LTD (Bangalore, Karnataka)
  // Tender: ONGC-2026-TE-088 (Cryogenic Gas Turbine Actuators & Control Skids)
  // AI Findings & Anomalies:
  // 1. Turnover Shortfall: 3-yr MAAT ₹10.50 Cr fails NIT threshold of ₹12.00 Cr
  // 2. MII Contradiction: Declared 80% local, but BOQ Item 8.4 specifies imported Swiss servo (44% unit value)
  // 3. Labor Compliance: Active ESIC Section 45A Statutory Recovery Demand Notice (₹2,85,000 arrears)
  // ═════════════════════════════════════════════════════════════════════
  "BID-005": [
    {
      id: "doc-gst",
      title: "GST Registration Certificate",
      fileName: "GST_Certificate_29AABCK7788P1ZR.pdf",
      fileSize: "1.3 MB",
      uploadDate: "07 Sep 2026",
      verified: true,
      category: "Statutory / Tax",
      content: {
        registrationNumber: "29AABCK7788P1ZR",
        legalName: "KAVACH ENGINEERING & POWER SYSTEMS PRIVATE LIMITED",
        tradeName: "KAVACH POWER SYSTEMS",
        constitutionOfBusiness: "Private Limited Company",
        principalAddress: "Plot No. 44, Peenya Industrial Area 2nd Phase, Bangalore, Karnataka - 560058",
        dateOfLiability: "01/04/2018",
        validity: "Active / Regular",
        typeOfTaxpayer: "Regular",
        approvingState: "Karnataka",
        officerName: "H. N. Chandrashekar",
        officerDesignation: "Deputy Commissioner of Commercial Taxes",
        jurisdiction: "BANGALORE NORTH DIVISION-3",
        issueDate: "12/05/2018",
        dscTimestamp: "2018.05.12 11:24:18 IST"
      }
    },
    {
      id: "doc-pan",
      title: "PAN Card",
      fileName: "PAN_Card_AABCK7788P.pdf",
      fileSize: "820 KB",
      uploadDate: "07 Sep 2026",
      verified: true,
      category: "Statutory / Identity",
      content: {
        panNumber: "AABCK7788P",
        name: "KAVACH ENGINEERING & POWER SYSTEMS PRIVATE LIMITED",
        fathersName: "N/A (CORPORATE ENTITY)",
        incorporationDate: "18/01/2018",
        signatoryName: "Vikramaditya Singhania",
        issuingAuthority: "Income Tax Department, Government of India",
        dateOfIssue: "22/01/2018",
        verificationQrStatus: "Cryptographically Verified via NSDL Portal"
      }
    },
    {
      id: "doc-udyam",
      title: "Udyam Registration Certificate",
      fileName: "Udyam_Registration_UDYAM-KR-03-0067123.pdf",
      fileSize: "1.1 MB",
      uploadDate: "07 Sep 2026",
      verified: true,
      category: "MSME / Classification",
      content: {
        udyamNumber: "UDYAM-KR-03-0067123",
        name: "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
        enterpriseType: "Medium Enterprise",
        majorActivity: "MANUFACTURING",
        organizationType: "Private Limited",
        dateOfCommencement: "22/02/2018",
        nic2Digit: "28 - Manufacture of machinery and equipment n.e.c.",
        nic4Digit: "2812 - Manufacture of fluid power equipment",
        nic5Digit: "28120 - Fluid power actuators and control cylinders",
        unitName: "KAVACH POWER SYSTEMS UNIT-1",
        unitAddress: "Plot 44, Peenya 2nd Phase, Bangalore, Karnataka - 560058",
        officialDate: "05/08/2020",
        issuingMinistry: "Ministry of Micro, Small and Medium Enterprises"
      }
    },
    {
      id: "doc-itr",
      title: "Income Tax Return Verification (ITR-6)",
      fileName: "ITR6_Acknowledgement_AY2025_26.pdf",
      fileSize: "960 KB",
      uploadDate: "07 Sep 2026",
      verified: true,
      category: "Statutory / Tax Return",
      content: {
        assessmentYear: "2025-26 (Financial Year 2024-25)",
        panNumber: "AABCK7788P",
        legalName: "KAVACH ENGINEERING & POWER SYSTEMS PRIVATE LIMITED",
        formType: "ITR-6 (Companies other than claiming exemption u/s 11)",
        efilingAckNumber: "918204918239011",
        filingDate: "29/07/2025",
        grossTotalIncome: "₹ 10,45,20,000 (₹ 10.45 Crores)",
        taxableIncome: "₹ 1,82,40,000",
        taxPayable: "₹ 45,96,480",
        taxPaid: "₹ 46,12,000",
        verifiedStatus: "E-Verified by Signatory via Aadhaar OTP (29/07/2025 16:42 IST)"
      }
    },
    {
      id: "doc-epfo",
      title: "EPFO & ESIC Combined Clearance",
      fileName: "EPFO_ESIC_Combined_Compliance.pdf",
      fileSize: "1.2 MB",
      uploadDate: "07 Sep 2026",
      verified: true,
      flagged: true,
      category: "Statutory / Labor Welfare",
      content: {
        epfoCode: "KN/BNG/0088210",
        epfoEstablishment: "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
        epfoOffice: "Bangalore North (Yeshwanthpur)",
        activeSubscribers: "78 Employees",
        epfoStatus: "ECR Compliant (Paid for July 2026)",
        esicEmployerCode: "57000981200000303",
        esicOffice: "Regional Office, Rajajinagar, Bangalore",
        esicCoveredEmployees: "74 Employees",
        esicStatus: "DEFAULT_NOTICE_PENDING (Show-Cause Issued under Sec 45A)",
        esicArrears: "₹ 2,85,000 statutory contribution arrears for Q3 & Q4 FY 2025-26"
      }
    },
    {
      id: "doc-mii",
      title: "Make in India Declaration (PPO 2017)",
      fileName: "Make_in_India_Declaration_Kavach.pdf",
      fileSize: "880 KB",
      uploadDate: "07 Sep 2026",
      verified: true,
      flagged: true,
      category: "Statutory Declaration",
      content: {
        declaredLocalContent: "80.00% (Class-I Local Supplier)",
        bidderName: "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
        tenderRef: "ONGC/2026/TE/088",
        tenderTitle: "Cryogenic Gas Turbine Actuators & Control Skids",
        manufacturingLocation: "Plot 44, Peenya Industrial Area 2nd Phase, Bangalore, Karnataka - 560058",
        calculationMethod: "Indigenous BOM value divided by Total Product ex-factory price",
        signatoryName: "Vikramaditya Singhania",
        signatoryDesignation: "Authorized Director / Head of Tendering",
        signatureDate: "05/09/2026"
      }
    },
    {
      id: "doc-balance-sheet",
      title: "Audited Balance Sheet & CA Turnover Certificate",
      fileName: "Audited_Financial_Statement_FY25.pdf",
      fileSize: "2.8 MB",
      uploadDate: "07 Sep 2026",
      verified: true,
      flagged: true,
      category: "Financial / Audit",
      content: {
        financialYear: "FY 2024-25 (Audited)",
        companyName: "KAVACH ENGINEERING & POWER SYSTEMS PRIVATE LIMITED",
        turnoverFY23: "₹ 9.80 Crores",
        turnoverFY24: "₹ 11.20 Crores",
        turnoverFY25: "₹ 10.50 Crores",
        averageAnnualTurnover: "₹ 10.50 Crores (FAIL: Tender NIT requires >= ₹12.00 Crores)",
        netWorth: "₹ 6.45 Crores (Positive)",
        caFirm: "VENKATRAMAN & CO, CHARTERED ACCOUNTANTS",
        caMembershipNo: "078912",
        caFirmRegNo: "008912S",
        caUdin: "25078912KAVACH9910",
        auditDate: "25/08/2025"
      }
    },
    {
      id: "doc-boq",
      title: "Technical BOQ Compliance & Line-Item Specification",
      fileName: "Technical_BOQ_Cryogenic_Skids.pdf",
      fileSize: "3.4 MB",
      uploadDate: "07 Sep 2026",
      verified: true,
      flagged: true,
      category: "Technical Compliance",
      content: {
        tenderRef: "ONGC/2026/TE/088",
        scopeOfSupply: "Cryogenic High-Pressure Gas Actuators with SIL-3 Electronic Controller",
        temperatureRating: "-196 deg C to +80 deg C (Cryogenic Compliant)",
        valveInterface: "ASME Class 900 / 1500 Flanged Trunnion",
        item8_1: "Actuator Skid Structural Frame: Mild Steel IS 2062 Grade B (Domestic - 100% Indian)",
        item8_2: "Cryogenic Hydraulic Cylinder: 316L Stainless Steel Forging (Domestic - 100% Indian)",
        item8_3: "High-Pressure Hydraulic Reservoir: Carbon Steel Seamless (Domestic - 100% Indian)",
        item8_4_imported: "Electro-Hydraulic Servo Modulating Actuator & Digital Positioner: Model HAS-400 manufactured by Wandfluh AG (Switzerland / Germany), Cost: ₹ 4,15,000 per unit (44% of total skid assembly price)",
        testClearance: "Hydrostatic Shell Proof Test at 450 Bar witnessed by EIL"
      }
    },
    {
      id: "doc-oem",
      title: "OEM Authorization & Quality License",
      fileName: "OEM_Authorization_Letter_Kavach.pdf",
      fileSize: "1.1 MB",
      uploadDate: "07 Sep 2026",
      verified: true,
      category: "Manufacturer Authorization",
      content: {
        oemManufacturer: "KAVACH POWER SYSTEMS OEM DIVISION",
        oemAddress: "Plot 44, Peenya 2nd Phase, Bangalore, Karnataka",
        authorizedBidder: "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
        tenderRef: "ONGC/2026/TE/088",
        warrantyPeriod: "36 Months Comprehensive Warranty from commissioning",
        oemSignatory: "Dr. N. Murthy",
        oemSignatoryDesignation: "Chief Technical Officer & Head of R&D"
      }
    },
    {
      id: "doc-undertaking",
      title: "Non-Blacklisting & Integrity Undertaking (Stamp Paper)",
      fileName: "Non_Blacklisting_Integrity_Affidavit.pdf",
      fileSize: "1.6 MB",
      uploadDate: "07 Sep 2026",
      verified: true,
      category: "Statutory Undertaking",
      content: {
        stampSerialNumber: "IN-KA88210491823901R",
        deponentName: "Mr. Vikramaditya Singhania, KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
        legalName: "KAVACH ENGINEERING & POWER SYSTEMS PRIVATE LIMITED",
        address: "Plot No. 44, Peenya Industrial Area 2nd Phase, Bangalore, Karnataka - 560058",
        notarizedDate: "04/09/2026",
        signatoryName: "Vikramaditya Singhania",
        signatoryDesignation: "Authorized Director",
        signatoryId: "PAN: AABCK7788P",
        notaryName: "S. K. HEGDE",
        notaryLocation: "BANGALORE URBAN - KARNATAKA",
        notaryRegNo: "REG. NO. 4412/2014",
        notaryAdvocate: "S. K. Hegde, Advocate & Notary Govt of India",
        notaryValidity: "18-09-2028",
        solemnAffirmation: "I, Vikramaditya Singhania, Director of Kavach Engineering & Power Systems Pvt Ltd, solemnly affirm that our company has never been blacklisted, debarred or placed on holiday list by ONGC, GeM, or any Central/State PSU."
      }
    }
  ]
};
