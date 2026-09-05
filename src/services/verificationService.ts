import { mockVerificationResults, VerificationResult } from "../data/verificationResults";
import { mockEvidence, EvidenceRecord } from "../data/evidence";
import { bidderService } from "./bidderService";

export interface VerificationStage {
  id: string;
  label: string;
}

export interface VerificationProgress {
  stageIndex: number;
  currentStage: VerificationStage;
  percent: number;
  completedStages: VerificationStage[];
  isComplete: boolean;
}

export const VERIFICATION_STAGES: VerificationStage[] = [
  { id: "extraction", label: "Document Extraction" },
  { id: "ocr", label: "OCR / Text Analysis" },
  { id: "qr", label: "QR Code Verification" },
  { id: "udyam", label: "Udyam Verification" },
  { id: "gst", label: "GST Verification" },
  { id: "pan", label: "PAN / Income Tax Verification" },
  { id: "epfo", label: "EPFO / ESIC" },
  { id: "blacklisting", label: "Blacklisting Check" },
  { id: "mii", label: "Make in India Cross Check" },
  { id: "scoring", label: "Final Compliance Score" }
];

export class VerificationService {
  private resultsCache: Map<string, VerificationResult>;

  constructor() {
    this.resultsCache = new Map();
  }

  hasBeenVerified(bidderId: string): boolean {
    return this.resultsCache.has(bidderId);
  }

  getResults(bidderId = "BID-001"): VerificationResult {
    if (this.resultsCache.has(bidderId)) {
      return this.resultsCache.get(bidderId)!;
    }
    return mockVerificationResults[bidderId] || mockVerificationResults["BID-001"];
  }

  getEvidence(bidderId = "BID-001"): EvidenceRecord {
    return mockEvidence[bidderId] || mockEvidence["BID-001"];
  }

  async runVerification(
    bidderId: string,
    onProgress?: (progress: VerificationProgress) => void
  ): Promise<VerificationResult> {
    return new Promise((resolve) => {
      let currentStageIndex = 0;
      const totalStages = VERIFICATION_STAGES.length;

      const advance = () => {
        if (currentStageIndex < totalStages) {
          const stage = VERIFICATION_STAGES[currentStageIndex];
          const percent = Math.round(((currentStageIndex + 1) / totalStages) * 100);

          if (onProgress) {
            onProgress({
              stageIndex: currentStageIndex,
              currentStage: stage,
              percent,
              completedStages: VERIFICATION_STAGES.slice(0, currentStageIndex),
              isComplete: false
            });
          }

          currentStageIndex++;
          const delay = currentStageIndex === 9 ? 700 : 350;
          setTimeout(advance, delay);
        } else {
          const result = mockVerificationResults[bidderId] || mockVerificationResults["BID-001"];
          this.resultsCache.set(bidderId, result);

          bidderService.getBidderById(bidderId).then(bidder => {
            if (bidder) {
              bidder.aiStatus = "VERIFIED";
              bidder.complianceScore = result.complianceScore;
              bidder.riskLevel = result.riskLevel;
              bidder.aiAdvisory = result.aiAdvisory.status;
            }
          });

          if (onProgress) {
            onProgress({
              stageIndex: totalStages,
              currentStage: { id: "done", label: "Verification Complete" },
              percent: 100,
              completedStages: VERIFICATION_STAGES,
              isComplete: true
            });
          }

          setTimeout(() => {
            resolve(result);
          }, 300);
        }
      };

      advance();
    });
  }

  async recordDecision(
    bidderId: string,
    decision: "QUALIFIED" | "REJECTED" | "CLARIFICATION_REQUESTED",
    remarks: string
  ) {
    return bidderService.updateOfficerDecision(bidderId, decision, remarks);
  }
}

export const verificationService = new VerificationService();
