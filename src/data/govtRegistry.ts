/**
 * Master Government & Regulatory Ground-Truth Databank
 * 
 * Simulates official Central & State Government Registries:
 * - CBIC GSTIN Portal (Goods and Services Tax Network)
 * - CBDT Income Tax Department (PAN & Corporate ITR Databank)
 * - Ministry of MSME (Udyam Registration Portal)
 * - EPFO Unified Portal (Ministry of Labour & Employment)
 * - ESIC Insurance Databank (Employees' State Insurance Corporation)
 * - ICAI UDIN Registry (Chartered Accountants Verification Portal)
 * - CPPP & GeM Central Debarment / Incident System (Blacklist Registry)
 * - Tender Statutory Eligibility Matrix (CPCL-2026-TE-045)
 */

export interface GovtGstRecord {
  gstin: string;
  legalName: string;
  tradeName: string;
  status: "ACTIVE" | "SUSPENDED" | "CANCELLED";
  taxpayerType: "Regular" | "Composition" | "SEZ";
  state: string;
  jurisdiction: string;
  filingStatus: {
    gstr1: "FILED" | "PENDING" | "DEFAULTER";
    gstr3b: "FILED" | "PENDING" | "DEFAULTER";
    lastFiledPeriod: string;
    consecutiveDefaultsMonths: number;
  };
  suspensionDetails?: {
    suspendedDate: string;
    rule: string;
    reason: string;
  };
}

export interface GovtPanRecord {
  pan: string;
  registeredName: string;
  entityType: "Company" | "Partnership Firm" | "LLP" | "Individual / Proprietorship";
  panStatus: "ACTIVE / IN-USE" | "INOPERATIVE" | "DEACTIVATED";
  cinNumber?: string;
  itrAy2025_26: {
    status: "VERIFIED" | "DEFICIENT" | "NOT_FILED";
    formType: "ITR-6" | "ITR-5" | "ITR-3";
    ackNumber: string;
    grossTaxableTurnoverCr: number;
    filingDate: string;
  };
}

export interface GovtUdyamRecord {
  udyamNumber: string;
  enterpriseName: string;
  majorActivity: "MANUFACTURING" | "SERVICES";
  enterpriseType: "Micro" | "Small" | "Medium";
  registrationStatus: "ACTIVE" | "EXPIRED" | "CANCELLED";
  state: string;
  district: string;
  validUpto: string;
}

export interface GovtEpfoRecord {
  establishmentCode: string;
  establishmentName: string;
  regionalOffice: string;
  status: "ACTIVE / ECR COMPLIANT" | "DEFAULT_NOTICE" | "DORMANT";
  activeEmployeesCount: number;
  lastPaymentDate: string;
}

export interface GovtEsicRecord {
  employerCode: string;
  employerName: string;
  regionalOffice: string;
  status: "ACTIVE / REGULAR" | "ARREARS_PENDING" | "INACTIVE";
  defaultNoticePending: boolean;
  remarks?: string;
}

export interface GovtUdinRecord {
  udin: string;
  caMembershipNumber: string;
  caName: string;
  caFirm: string;
  documentType: string;
  status: "VALID & REGISTERED" | "INVALID / UNREGISTERED" | "REVOKED";
  generationDate: string;
}

export interface GovtBlacklistRecord {
  entityName: string;
  pan: string;
  status: "CLEAR / NOT DEBARRED" | "BLACKLISTED" | "UNDER_INVESTIGATION";
  source: string;
  remarks: string;
}

export interface TenderStatutoryRule {
  tenderId: string;
  minimumAverageAnnualTurnoverCr: number;
  requiredMiiClass: "CLASS-I (>= 50%)" | "CLASS-II (>= 20%)";
  mandatoryTechnicalSpec: string;
  mandatoryDocumentsCount: number;
}

// ─────────────────────────────────────────────────────────────
// OFFICIAL MASTER GOVERNMENT REGISTRIES (GROUND TRUTH)
// ─────────────────────────────────────────────────────────────

export const GOVT_GST_REGISTRY: Record<string, GovtGstRecord> = {
  // ABC Engineering Ltd (Chennai, TN) - 100% Active & Regular
  "33AABCA1234F1Z8": {
    gstin: "33AABCA1234F1Z8",
    legalName: "ABC ENGINEERING PRIVATE LIMITED",
    tradeName: "ABC ENGINEERING LIMITED",
    status: "ACTIVE",
    taxpayerType: "Regular",
    state: "Tamil Nadu",
    jurisdiction: "AMBATTUR-I",
    filingStatus: {
      gstr1: "FILED",
      gstr3b: "FILED",
      lastFiledPeriod: "July 2026",
      consecutiveDefaultsMonths: 0
    }
  },

  // Bharat Industries (Mumbai, MH) - 100% Active & Regular
  "27AABCB9876E1ZT": {
    gstin: "27AABCB9876E1ZT",
    legalName: "BHARAT INDUSTRIES",
    tradeName: "BHARAT INDUSTRIES & HEAVY VALVES",
    status: "ACTIVE",
    taxpayerType: "Regular",
    state: "Maharashtra",
    jurisdiction: "MUMBAI CENTRAL-IV",
    filingStatus: {
      gstr1: "FILED",
      gstr3b: "FILED",
      lastFiledPeriod: "July 2026",
      consecutiveDefaultsMonths: 0
    }
  },

  // Zenith Pvt Ltd (Delhi / Bangalore) - SUSPENDED IN GOVT PORTAL (CRITICAL FLAW!)
  "07AABCZ5544K1ZS": {
    gstin: "07AABCZ5544K1ZS",
    legalName: "ZENITH TRADING & LOGISTICS LLP",
    tradeName: "ZENITH TRADING",
    status: "SUSPENDED",
    taxpayerType: "Regular",
    state: "Delhi",
    jurisdiction: "WARD 45 NEW DELHI",
    filingStatus: {
      gstr1: "DEFAULTER",
      gstr3b: "DEFAULTER",
      lastFiledPeriod: "December 2025",
      consecutiveDefaultsMonths: 7
    },
    suspensionDetails: {
      suspendedDate: "14/07/2026",
      rule: "Rule 21A(2A) of CGST Rules 2017",
      reason: "Continuous non-filing of GSTR-3B monthly tax returns for over 6 consecutive tax periods."
    }
  },

  // ShreeRam Enterprises (Gujarat) - Active
  "24AABCS4433D1ZP": {
    gstin: "24AABCS4433D1ZP",
    legalName: "SHREERAM ENTERPRISES",
    tradeName: "SHREERAM VALVE & CONTROLS",
    status: "ACTIVE",
    taxpayerType: "Regular",
    state: "Gujarat",
    jurisdiction: "AHMEDABAD WEST",
    filingStatus: {
      gstr1: "FILED",
      gstr3b: "FILED",
      lastFiledPeriod: "June 2026",
      consecutiveDefaultsMonths: 1
    }
  },

  // Kavach Engineering & Power Systems Pvt Ltd (Bangalore, Karnataka) - Active
  "29AABCK7788P1ZR": {
    gstin: "29AABCK7788P1ZR",
    legalName: "KAVACH ENGINEERING & POWER SYSTEMS PRIVATE LIMITED",
    tradeName: "KAVACH POWER SYSTEMS",
    status: "ACTIVE",
    taxpayerType: "Regular",
    state: "Karnataka",
    jurisdiction: "BANGALORE NORTH DIVISION-3",
    filingStatus: {
      gstr1: "FILED",
      gstr3b: "FILED",
      lastFiledPeriod: "August 2026",
      consecutiveDefaultsMonths: 0
    }
  }
};

export const GOVT_PAN_REGISTRY: Record<string, GovtPanRecord> = {
  // ABC Engineering Ltd
  "AABCA1234F": {
    pan: "AABCA1234F",
    registeredName: "ABC ENGINEERING LIMITED",
    entityType: "Company",
    panStatus: "ACTIVE / IN-USE",
    cinNumber: "L28120TN2004PLC053210",
    itrAy2025_26: {
      status: "VERIFIED",
      formType: "ITR-6",
      ackNumber: "849201948192039",
      grossTaxableTurnoverCr: 48.67,
      filingDate: "28/07/2025"
    }
  },

  // Bharat Industries
  "AABCB9876E": {
    pan: "AABCB9876E",
    registeredName: "BHARAT INDUSTRIES",
    entityType: "Partnership Firm",
    panStatus: "ACTIVE / IN-USE",
    itrAy2025_26: {
      status: "VERIFIED",
      formType: "ITR-5",
      ackNumber: "791820491823901",
      grossTaxableTurnoverCr: 62.40,
      filingDate: "22/07/2025"
    }
  },

  // Zenith Pvt Ltd - ENTITY MISMATCH FLAW: PAN Registered under LLP, not Pvt Ltd!
  "AABCZ5544K": {
    pan: "AABCZ5544K",
    registeredName: "ZENITH LOGISTICS & TRADING LLP", // FLAW: Bidder claims Zenith Pvt Ltd!
    entityType: "LLP",
    panStatus: "ACTIVE / IN-USE",
    itrAy2025_26: {
      status: "VERIFIED",
      formType: "ITR-5",
      ackNumber: "629104829104829",
      grossTaxableTurnoverCr: 12.10,
      filingDate: "15/08/2025"
    }
  },

  // ShreeRam Enterprises - FLAW: Turnover only 8.40 Cr, Tender requires >= 15.00 Cr!
  "AABCS4433D": {
    pan: "AABCS4433D",
    registeredName: "SHREERAM ENTERPRISES",
    entityType: "Individual / Proprietorship",
    panStatus: "ACTIVE / IN-USE",
    itrAy2025_26: {
      status: "VERIFIED",
      formType: "ITR-3",
      ackNumber: "518290384918293",
      grossTaxableTurnoverCr: 8.40, // Below 15 Cr!
      filingDate: "30/07/2025"
    }
  },

  // Kavach Engineering & Power Systems Pvt Ltd - FLAW: Turnover only 10.45 Cr, Tender requires >= 12.00 Cr!
  "AABCK7788P": {
    pan: "AABCK7788P",
    registeredName: "KAVACH ENGINEERING & POWER SYSTEMS PRIVATE LIMITED",
    entityType: "Company",
    panStatus: "ACTIVE / IN-USE",
    cinNumber: "U29100KA2018PTC112345",
    itrAy2025_26: {
      status: "VERIFIED",
      formType: "ITR-6",
      ackNumber: "918204918239011",
      grossTaxableTurnoverCr: 10.45, // Below 12.00 Cr tender threshold!
      filingDate: "29/07/2025"
    }
  }
};

export const GOVT_UDYAM_REGISTRY: Record<string, GovtUdyamRecord> = {
  "UDYAM-TN-02-0045892": {
    udyamNumber: "UDYAM-TN-02-0045892",
    enterpriseName: "ABC ENGINEERING LIMITED",
    majorActivity: "MANUFACTURING",
    enterpriseType: "Medium",
    registrationStatus: "ACTIVE",
    state: "TAMIL NADU",
    district: "CHENNAI",
    validUpto: "PERPETUAL / ACTIVE"
  },
  "UDYAM-MH-01-0081290": {
    udyamNumber: "UDYAM-MH-01-0081290",
    enterpriseName: "BHARAT INDUSTRIES",
    majorActivity: "MANUFACTURING",
    enterpriseType: "Small",
    registrationStatus: "ACTIVE",
    state: "MAHARASHTRA",
    district: "MUMBAI SUBURBAN",
    validUpto: "PERPETUAL / ACTIVE"
  },
  "UDYAM-DL-05-0012450": {
    udyamNumber: "UDYAM-DL-05-0012450",
    enterpriseName: "ZENITH FLOW SYSTEMS",
    majorActivity: "SERVICES",
    enterpriseType: "Micro",
    registrationStatus: "ACTIVE",
    state: "DELHI",
    district: "SOUTH DELHI",
    validUpto: "PERPETUAL / ACTIVE"
  },
  "UDYAM-GJ-03-0099881": {
    udyamNumber: "UDYAM-GJ-03-0099881",
    enterpriseName: "SHREERAM ENTERPRISES",
    majorActivity: "MANUFACTURING",
    enterpriseType: "Micro",
    registrationStatus: "ACTIVE",
    state: "GUJARAT",
    district: "AHMEDABAD",
    validUpto: "PERPETUAL / ACTIVE"
  },
  "UDYAM-KR-03-0067123": {
    udyamNumber: "UDYAM-KR-03-0067123",
    enterpriseName: "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
    majorActivity: "MANUFACTURING",
    enterpriseType: "Medium",
    registrationStatus: "ACTIVE",
    state: "KARNATAKA",
    district: "BANGALORE URBAN",
    validUpto: "PERPETUAL / ACTIVE"
  }
};

export const GOVT_EPFO_REGISTRY: Record<string, GovtEpfoRecord> = {
  "TN/MAS/0048291": {
    establishmentCode: "TN/MAS/0048291",
    establishmentName: "ABC ENGINEERING LIMITED",
    regionalOffice: "Chennai North",
    status: "ACTIVE / ECR COMPLIANT",
    activeEmployeesCount: 142,
    lastPaymentDate: "15/08/2026"
  },
  "MH/BAN/0091820": {
    establishmentCode: "MH/BAN/0091820",
    establishmentName: "BHARAT INDUSTRIES",
    regionalOffice: "Bandra, Mumbai",
    status: "ACTIVE / ECR COMPLIANT",
    activeEmployeesCount: 96,
    lastPaymentDate: "14/08/2026"
  },
  "DL/CPM/0029103": {
    establishmentCode: "DL/CPM/0029103",
    establishmentName: "ZENITH PVT LTD",
    regionalOffice: "Connaught Place, Delhi",
    status: "DEFAULT_NOTICE",
    activeEmployeesCount: 22,
    lastPaymentDate: "10/05/2026"
  },
  "GJ/AHD/0055192": {
    establishmentCode: "GJ/AHD/0055192",
    establishmentName: "SHREERAM ENTERPRISES",
    regionalOffice: "Ahmedabad",
    status: "ACTIVE / ECR COMPLIANT",
    activeEmployeesCount: 38,
    lastPaymentDate: "12/08/2026"
  },
  "KN/BNG/0088210": {
    establishmentCode: "KN/BNG/0088210",
    establishmentName: "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
    regionalOffice: "Bangalore North (Yeshwanthpur)",
    status: "ACTIVE / ECR COMPLIANT",
    activeEmployeesCount: 78,
    lastPaymentDate: "15/08/2026"
  }
};

export const GOVT_ESIC_REGISTRY: Record<string, GovtEsicRecord> = {
  "52000849200000606": {
    employerCode: "52000849200000606",
    employerName: "ABC ENGINEERING LIMITED",
    regionalOffice: "Regional Office, Hyderabad / Chennai",
    status: "ACTIVE / REGULAR",
    defaultNoticePending: false
  },
  "31000789120000808": {
    employerCode: "31000789120000808",
    employerName: "BHARAT INDUSTRIES",
    regionalOffice: "Regional Office, Mumbai",
    status: "ACTIVE / REGULAR",
    defaultNoticePending: false
  },
  "11000948210000404": {
    employerCode: "11000948210000404",
    employerName: "ZENITH PVT LTD",
    regionalOffice: "Regional Office, Okhla, New Delhi",
    status: "ACTIVE / REGULAR",
    defaultNoticePending: false
  },
  // ShreeRam Enterprises - FLAW: ESIC Default Notice & Arrears Pending!
  "41000892100000101": {
    employerCode: "41000892100000101",
    employerName: "SHREERAM ENTERPRISES",
    regionalOffice: "Regional Office, Ashram Road, Ahmedabad",
    status: "ARREARS_PENDING",
    defaultNoticePending: true,
    remarks: "Statutory contribution arrears pending for 4 months (₹4,28,900); Show-cause notice issued under Section 45A of ESI Act 1948."
  },
  // Kavach Engineering - FLAW: Active ESIC Section 45A Statutory Recovery Demand Notice!
  "57000981200000303": {
    employerCode: "57000981200000303",
    employerName: "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
    regionalOffice: "Regional Office, Rajajinagar, Bangalore",
    status: "ARREARS_PENDING",
    defaultNoticePending: true,
    remarks: "Section 45A Statutory Demand Notice active for ₹2,85,000/- unpaid worker contributions for Q3 & Q4 FY 2025-26."
  }
};

export const GOVT_UDIN_REGISTRY: Record<string, GovtUdinRecord> = {
  // ABC Engineering Ltd - Valid UDIN
  "25558996BGSVMJ2721": {
    udin: "25558996BGSVMJ2721",
    caMembershipNumber: "558996",
    caName: "CA NITIN KAUSHIK",
    caFirm: "AMKN & CO (FRN: 032712C)",
    documentType: "Statutory Audit / Balance Sheet",
    status: "VALID & REGISTERED",
    generationDate: "28/08/2025"
  },

  // Bharat Industries - Valid UDIN
  "25044812BMRSTX9182": {
    udin: "25044812BMRSTX9182",
    caMembershipNumber: "044812",
    caName: "CA S.K. AGARWAL",
    caFirm: "S.K. AGARWAL & ASSOCIATES (FRN: 014298W)",
    documentType: "Audited Financial Statements",
    status: "VALID & REGISTERED",
    generationDate: "20/08/2025"
  },

  // Zenith Pvt Ltd - FAKE / UNREGISTERED UDIN (CRITICAL FLAW!)
  "26048192AAAAAA0000": {
    udin: "26048192AAAAAA0000",
    caMembershipNumber: "048192",
    caName: "UNKNOWN / UNREGISTERED",
    caFirm: "NON-EXISTENT AUDIT ENTITY",
    documentType: "Provisional Balance Sheet",
    status: "INVALID / UNREGISTERED",
    generationDate: "01/01/1970"
  },

  // ShreeRam Enterprises - Valid UDIN
  "25089123BVBNMA8821": {
    udin: "25089123BVBNMA8821",
    caMembershipNumber: "089123",
    caName: "CA HITESH PATEL",
    caFirm: "PATEL & SHAH, CHARTERED ACCOUNTANTS (FRN: 019283W)",
    documentType: "Tax Audit & Balance Sheet",
    status: "VALID & REGISTERED",
    generationDate: "26/08/2025"
  },
  // Kavach Engineering & Power Systems Pvt Ltd - Valid UDIN
  "25078912KAVACH9910": {
    udin: "25078912KAVACH9910",
    caMembershipNumber: "078912",
    caName: "CA R. VENKATRAMAN",
    caFirm: "VENKATRAMAN & CO, CHARTERED ACCOUNTANTS (FRN: 008912S)",
    documentType: "Audited Financial Statements & Tax Audit",
    status: "VALID & REGISTERED",
    generationDate: "25/08/2025"
  }
};

export const GOVT_BLACKLIST_REGISTRY: Record<string, GovtBlacklistRecord> = {
  "ABC ENGINEERING LIMITED": {
    entityName: "ABC ENGINEERING LIMITED",
    pan: "AABCA1234F",
    status: "CLEAR / NOT DEBARRED",
    source: "CPPP Debarment Register & GeM Incident System",
    remarks: "Clean record. No suspension, debarment, or holiday listing recorded in any Central/State PSU database."
  },
  "BHARAT INDUSTRIES": {
    entityName: "BHARAT INDUSTRIES",
    pan: "AABCB9876E",
    status: "CLEAR / NOT DEBARRED",
    source: "CPPP Debarment Register & GeM Incident System",
    remarks: "Clean record. Regular vendor on GeM with rating 4.9/5."
  },
  "ZENITH PVT LTD": {
    entityName: "ZENITH PVT LTD",
    pan: "AABCZ5544K",
    status: "CLEAR / NOT DEBARRED",
    source: "CPPP Debarment Register",
    remarks: "No active blacklisting order, but tax compliance defaults noted."
  },
  "SHREERAM ENTERPRISES": {
    entityName: "SHREERAM ENTERPRISES",
    pan: "AABCS4433D",
    status: "CLEAR / NOT DEBARRED",
    source: "CPPP Debarment Register & GeM Incident System",
    remarks: "No criminal debarment order."
  },
  "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD": {
    entityName: "KAVACH ENGINEERING & POWER SYSTEMS PVT LTD",
    pan: "AABCK7788P",
    status: "CLEAR / NOT DEBARRED",
    source: "CPPP Debarment Register & GeM Incident System",
    remarks: "Clean vendor history on GeM and CPPP. No active debarment or holiday listing."
  }
};

export const TENDER_STATUTORY_RULES: Record<string, TenderStatutoryRule> = {
  "CPCL-2026-TE-045": {
    tenderId: "CPCL-2026-TE-045",
    minimumAverageAnnualTurnoverCr: 15.00, // ₹15.00 Crores
    requiredMiiClass: "CLASS-I (>= 50%)",
    mandatoryTechnicalSpec: "API 6D Trunnion Mounted Valves, Full Bore, ASME Class 600/900",
    mandatoryDocumentsCount: 10
  },
  "ONGC-2026-TE-088": {
    tenderId: "ONGC-2026-TE-088",
    minimumAverageAnnualTurnoverCr: 12.00, // ₹12.00 Crores
    requiredMiiClass: "CLASS-I (>= 50%)",
    mandatoryTechnicalSpec: "IEC 61508 SIL-3 Electro-Hydraulic Cryogenic Gas Actuator Skids",
    mandatoryDocumentsCount: 10
  }
};

// ─────────────────────────────────────────────────────────────
// REGISTRY LOOKUP & FORENSIC VERIFICATION FUNCTIONS
// ─────────────────────────────────────────────────────────────

export const govtRegistry = {
  /**
   * Verify GSTIN against CBIC portal
   */
  verifyGstin(gstin: string) {
    const record = GOVT_GST_REGISTRY[gstin];
    if (!record) {
      return {
        found: false,
        status: "NOT_FOUND",
        isEligible: false,
        flag: "CRITICAL",
        message: `GSTIN ${gstin} does not exist in Central Board of Indirect Taxes & Customs (CBIC) database.`
      };
    }

    if (record.status === "SUSPENDED" || record.status === "CANCELLED") {
      return {
        found: true,
        record,
        status: record.status,
        isEligible: false,
        flag: "CRITICAL",
        message: `GSTIN ${gstin} is ${record.status} under ${record.suspensionDetails?.rule || "CGST Act 2017"}! Reason: ${record.suspensionDetails?.reason}`
      };
    }

    return {
      found: true,
      record,
      status: "ACTIVE",
      isEligible: true,
      flag: "CLEAR",
      message: `GSTIN ${gstin} is Active & Regular. Return filing is up to date (${record.filingStatus.lastFiledPeriod}).`
    };
  },

  /**
   * Verify PAN and check for legal entity name discrepancy
   */
  verifyPan(pan: string, claimedBidderName: string) {
    const record = GOVT_PAN_REGISTRY[pan];
    if (!record) {
      return {
        found: false,
        status: "NOT_FOUND",
        isEligible: false,
        flag: "CRITICAL",
        message: `Permanent Account Number ${pan} not registered in CBDT Income Tax databank.`
      };
    }

    // Check entity name match
    const cleanClaimed = claimedBidderName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanRegistered = record.registeredName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const isNameMatch = cleanClaimed.includes(cleanRegistered.slice(0, 6)) || cleanRegistered.includes(cleanClaimed.slice(0, 6));

    if (!isNameMatch) {
      return {
        found: true,
        record,
        status: "NAME_MISMATCH",
        isEligible: false,
        flag: "CRITICAL",
        message: `Entity mismatch: PAN is registered to "${record.registeredName}" (${record.entityType}), while tender bid was submitted by "${claimedBidderName}".`
      };
    }

    return {
      found: true,
      record,
      status: "VERIFIED",
      isEligible: true,
      flag: "CLEAR",
      message: `PAN ${pan} verified and matched with MCA & CBDT registry (${record.registeredName}). Corporate ITR verified.`
    };
  },

  /**
   * Check CA UDIN on ICAI portal
   */
  verifyUdin(caUdin: string) {
    const record = GOVT_UDIN_REGISTRY[caUdin];
    if (!record || record.status !== "VALID & REGISTERED") {
      return {
        found: !!record,
        record,
        status: "INVALID_UDIN",
        isEligible: false,
        flag: "CRITICAL",
        message: `UDIN "${caUdin}" is invalid or failed ICAI databank validation! Not generated by an active Chartered Accountant.`
      };
    }

    return {
      found: true,
      record,
      status: "VERIFIED",
      isEligible: true,
      flag: "CLEAR",
      message: `UDIN ${caUdin} authenticated on ICAI registry. Attested by ${record.caName} (${record.caFirm}).`
    };
  },

  /**
   * Verify Minimum Average Annual Turnover (MAAT)
   */
  verifyTurnover(turnoverCr: number, thresholdCr = 15.00) {
    if (turnoverCr < thresholdCr) {
      return {
        turnoverCr,
        thresholdCr,
        isEligible: false,
        flag: "HIGH_RISK",
        message: `Audited turnover of ₹${turnoverCr.toFixed(2)} Cr fails tender eligibility criteria (Minimum ₹${thresholdCr.toFixed(2)} Cr required).`
      };
    }

    return {
      turnoverCr,
      thresholdCr,
      isEligible: true,
      flag: "CLEAR",
      message: `Audited turnover of ₹${turnoverCr.toFixed(2)} Cr satisfies tender financial requirement (>= ₹${thresholdCr.toFixed(2)} Cr).`
    };
  },

  /**
   * Verify ESIC Labor Compliance
   */
  verifyEsic(employerCode: string) {
    const record = GOVT_ESIC_REGISTRY[employerCode];
    if (!record) {
      return {
        found: false,
        isEligible: true,
        flag: "CLEAR",
        message: `ESIC registration ${employerCode} recorded.`
      };
    }

    if (record.defaultNoticePending) {
      return {
        found: true,
        record,
        isEligible: false,
        flag: "MODERATE_RISK",
        message: `ESIC Notice: ${record.remarks || "Arrears pending with Regional Office."}`
      };
    }

    return {
      found: true,
      record,
      isEligible: true,
      flag: "CLEAR",
      message: `ESIC establishment ${employerCode} active. Regular monthly employer contributions confirmed.`
    };
  },

  /**
   * Verify Make in India claim vs Technical BOQ
   */
  verifyMakeInIndia(claimedLocalPct: number, boqHasImportedComponent: boolean, importedItemDetails?: string) {
    if (claimedLocalPct < 50) {
      return {
        claimedLocalPct,
        supplierClass: "CLASS-II LOCAL SUPPLIER",
        isEligible: false,
        flag: "REJECT",
        message: `Claimed local content (${claimedLocalPct}%) falls below Class-I threshold (>= 50%) required under Clause 7 of Tender.`
      };
    }

    if (boqHasImportedComponent) {
      return {
        claimedLocalPct,
        supplierClass: "CLASS-I LOCAL SUPPLIER",
        isEligible: false,
        flag: "DISCREPANCY",
        message: `Material contradiction: Bidder declared ${claimedLocalPct}% local content, but Technical BOQ specifies imported primary component (${importedItemDetails || "Imported sub-assembly"}).`
      };
    }

    return {
      claimedLocalPct,
      supplierClass: "CLASS-I LOCAL SUPPLIER",
      isEligible: true,
      flag: "CLEAR",
      message: `Local content verified at ${claimedLocalPct}%. All major valve components, casting, and machining manufactured domestically.`
    };
  }
};
