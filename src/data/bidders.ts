export interface Bidder {
  id: string;
  bidIdCode: string;
  bidderName: string;
  tenderId: string;
  tenderRef: string;
  submittedAt: string;
  documentsSubmitted: string;
  documentsCount: number;
  status: string;
  aiStatus: "NOT_RUN" | "PROCESSING" | "COMPLETED" | string;
  complianceScore: number | null;
  riskLevel: "LOW RISK" | "MEDIUM RISK" | "HIGH RISK" | string | null;
  aiAdvisory: string | null;
  officerDecision: "QUALIFIED" | "REJECTED" | "CLARIFICATION_REQUESTED" | null;
  officerRemarks: string | null;
  officerDecisionDate?: string | null;
  contactPerson: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  udyamNumber: string;
}

export const mockBidders: Bidder[] = [
  {
    id: "BID-001",
    bidIdCode: "001",
    bidderName: "ABC Engineering Ltd",
    tenderId: "CPCL-2026-TE-045",
    tenderRef: "CPCL/2026/TE/045",
    submittedAt: "01 Sep 2026, 09:12 AM",
    documentsSubmitted: "10 / 10",
    documentsCount: 10,
    status: "Submitted",
    aiStatus: "NOT_RUN",
    complianceScore: null,
    riskLevel: null,
    aiAdvisory: null,
    officerDecision: null,
    officerRemarks: null,
    officerDecisionDate: null,
    contactPerson: "Rajesh Kumar (Director of Tendering)",
    email: "tenders@abcengineering.com",
    phone: "+91 98401 23456",
    gstin: "33AABCA1234F1Z8",
    pan: "AABCA1234F",
    udyamNumber: "UDYAM-TN-02-0045892"
  },
  {
    id: "BID-002",
    bidIdCode: "002",
    bidderName: "Bharat Industries",
    tenderId: "CPCL-2026-TE-045",
    tenderRef: "CPCL/2026/TE/045",
    submittedAt: "01 Sep 2026, 11:30 AM",
    documentsSubmitted: "10 / 10",
    documentsCount: 10,
    status: "Submitted",
    aiStatus: "NOT_RUN",
    complianceScore: null,
    riskLevel: null,
    aiAdvisory: null,
    officerDecision: null,
    officerRemarks: null,
    contactPerson: "Vikramjit Sharma",
    email: "commercial@bharatindustries.in",
    phone: "+91 98200 87654",
    gstin: "27AABCB9876E1ZT",
    pan: "AABCB9876E",
    udyamNumber: "UDYAM-MH-01-0081290"
  },
  {
    id: "BID-003",
    bidIdCode: "003",
    bidderName: "Zenith Pvt Ltd",
    tenderId: "CPCL-2026-TE-045",
    tenderRef: "CPCL/2026/TE/045",
    submittedAt: "31 Aug 2026, 04:15 PM",
    documentsSubmitted: "9 / 10",
    documentsCount: 9,
    status: "Submitted",
    aiStatus: "NOT_RUN",
    complianceScore: null,
    riskLevel: null,
    aiAdvisory: null,
    officerDecision: null,
    officerRemarks: null,
    contactPerson: "Arun Mehra",
    email: "tenders@zenithflow.co.in",
    phone: "+91 98111 54321",
    gstin: "07AABCZ5544K1ZS",
    pan: "AABCZ5544K",
    udyamNumber: "UDYAM-DL-05-0012450"
  },
  {
    id: "BID-004",
    bidIdCode: "004",
    bidderName: "ShreeRam Enterprises",
    tenderId: "CPCL-2026-TE-045",
    tenderRef: "CPCL/2026/TE/045",
    submittedAt: "30 Aug 2026, 02:40 PM",
    documentsSubmitted: "10 / 10",
    documentsCount: 10,
    status: "Submitted",
    aiStatus: "NOT_RUN",
    complianceScore: null,
    riskLevel: null,
    aiAdvisory: null,
    officerDecision: null,
    officerRemarks: null,
    contactPerson: "Pooja Deshmukh",
    email: "contracts@shreeram.org",
    phone: "+91 98333 11223",
    gstin: "24AABCS4433D1ZP",
    pan: "AABCS4433D",
    udyamNumber: "UDYAM-GJ-03-0099881"
  }
];
