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

export const mockEvidence: Record<string, EvidenceRecord> = {
  "BID-001": {
    findingId: "MAKE_IN_INDIA_INCONSISTENCY",
    title: "Make-in-India Declaration vs Technical BOQ Inconsistency",
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
      highlightSnippet: "IMPORTED PUMP — Germany",
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
      detectionType: "INCONSISTENCY DETECTED",
      findingLabel: "Material Contradiction",
      confidenceScore: "96%",
      comparison: {
        itemA: {
          doc: "Make in India Declaration",
          page: "Page 3",
          value: "Local Content = 75%"
        },
        itemB: {
          doc: "Technical BOQ",
          page: "Page 64",
          value: "Imported Pump — Germany (42.8% of total equipment cost)"
        }
      },
      forensicAnalysis: `Cross-document mathematical triangulation between the supplier's statutory Make-in-India declaration and the detailed Technical BOQ indicates an irreconcilable discrepancy:

1. The bidder certifies 75% local domestic value addition in the PPO declaration.
2. In the Technical BOQ (Line 14.2, Page 64), the primary high-pressure hydraulic actuator pump is explicitly cataloged as imported from Germany, representing 42.8% of the base manufacturing value.
3. Accounting for foreign origin components (42.8%), maximum achievable domestic local content cannot exceed 57.2%, contradicting the claimed 75% Class-I Local Supplier threshold.

Recommendation: Procurement Officer should request line-item cost audit certificate from statutory CA before final qualification.`
    }
  }
};
