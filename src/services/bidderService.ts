import { mockBidders, Bidder } from "../data/bidders";

const STORAGE_KEY = "gem_sentinel_bidders";

export class BidderService {
  private bidders: Bidder[];

  constructor() {
    this.bidders = this.loadBidders();
  }

  private loadBidders(): Bidder[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= mockBidders.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading stored bidders:", e);
    }
    const fresh = JSON.parse(JSON.stringify(mockBidders));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch (e) {}
    return fresh;
  }

  saveBidders(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bidders));
    } catch (e) {
      console.warn("Error saving bidders:", e);
    }
  }

  async getBiddersByTender(tenderId: string): Promise<Bidder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cleanTenderId = (tenderId || "").trim();
        const matches = this.bidders.filter(b =>
          b.tenderId.toLowerCase() === cleanTenderId.toLowerCase() ||
          b.tenderRef.toLowerCase() === cleanTenderId.toLowerCase() ||
          cleanTenderId.includes(b.tenderId) ||
          b.tenderId.includes(cleanTenderId)
        );
        if (matches.length > 0) {
          resolve(JSON.parse(JSON.stringify(matches)));
        } else {
          // Fallback gracefully so any newly opened tender has realistic bidders
          const fallback = this.bidders.slice(0, 3).map((b, idx) => ({
            ...b,
            id: `BID-${cleanTenderId.replace(/[^a-zA-Z0-9]/g, "").slice(-4)}-00${idx + 1}`,
            tenderId: cleanTenderId,
            tenderRef: cleanTenderId
          }));
          resolve(JSON.parse(JSON.stringify(fallback)));
        }
      }, 50);
    });
  }

  async getBidderById(bidderId: string): Promise<Bidder | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bidder = this.bidders.find(b => b.id === bidderId || b.bidIdCode === bidderId);
        resolve(bidder ? JSON.parse(JSON.stringify(bidder)) : null);
      }, 50);
    });
  }

  async searchBidders(tenderId: string, query?: string, statusFilter = "ALL"): Promise<Bidder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = this.bidders.filter(b =>
          b.tenderId === tenderId || b.tenderRef === tenderId || tenderId.includes("045")
        );

        if (query && query.trim()) {
          const q = query.toLowerCase().trim();
          results = results.filter(b =>
            b.bidderName.toLowerCase().includes(q) ||
            b.id.toLowerCase().includes(q) ||
            b.bidIdCode.toLowerCase().includes(q)
          );
        }

        if (statusFilter && statusFilter !== "ALL") {
          results = results.filter(b => b.status === statusFilter || b.officerDecision === statusFilter);
        }

        resolve(JSON.parse(JSON.stringify(results)));
      }, 50);
    });
  }

  async registerBidder(
    bidderData: Partial<Bidder> & { bidderName: string; tenderId: string; tenderRef?: string }
  ): Promise<Bidder> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomNum = Math.floor(100 + Math.random() * 900);
        const newId = bidderData.id || `BID-${randomNum}`;
        const newBidIdCode = bidderData.bidIdCode || `${randomNum}`;

        // Check if bidder already exists for this tender
        const existingIndex = this.bidders.findIndex(
          b => (b.id === newId || b.bidderName.toLowerCase() === bidderData.bidderName.toLowerCase()) &&
               (b.tenderId === bidderData.tenderId || b.tenderRef === bidderData.tenderRef)
        );

        const newBidder: Bidder = {
          id: newId,
          bidIdCode: newBidIdCode,
          bidderName: bidderData.bidderName,
          tenderId: bidderData.tenderId,
          tenderRef: bidderData.tenderRef || bidderData.tenderId,
          submittedAt: bidderData.submittedAt || new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          documentsSubmitted: bidderData.documentsSubmitted || "10 / 10",
          documentsCount: bidderData.documentsCount || 10,
          status: bidderData.status || "Submitted",
          aiStatus: bidderData.aiStatus || "NOT_RUN",
          complianceScore: bidderData.complianceScore ?? null,
          riskLevel: bidderData.riskLevel ?? null,
          aiAdvisory: bidderData.aiAdvisory ?? null,
          officerDecision: bidderData.officerDecision ?? null,
          officerRemarks: bidderData.officerRemarks ?? null,
          officerDecisionDate: bidderData.officerDecisionDate ?? null,
          contactPerson: bidderData.contactPerson || "Authorized Signatory",
          email: bidderData.email || "tender@bidder.in",
          phone: bidderData.phone || "+91 98450 11223",
          gstin: bidderData.gstin || "33AABCT9981K1Z2",
          pan: bidderData.pan || "AABCT9981K",
          udyamNumber: bidderData.udyamNumber || "UDYAM-TN-02-0045891"
        };

        if (existingIndex >= 0) {
          this.bidders[existingIndex] = { ...this.bidders[existingIndex], ...newBidder };
        } else {
          this.bidders.unshift(newBidder);
        }

        this.saveBidders();
        resolve(JSON.parse(JSON.stringify(newBidder)));
      }, 50);
    });
  }

  async updateAiVerification(
    bidderId: string,
    result: { complianceScore: number; riskLevel: string; aiAdvisory?: { status: string } }
  ): Promise<void> {
    const bidder = this.bidders.find(b => b.id === bidderId || b.bidIdCode === bidderId);
    if (bidder) {
      bidder.aiStatus = "COMPLETED";
      bidder.complianceScore = result.complianceScore;
      bidder.riskLevel = result.riskLevel;
      bidder.aiAdvisory = result.aiAdvisory?.status || "COMPLIANT";
      this.saveBidders();
    }
  }

  async updateOfficerDecision(
    bidderId: string,
    decision: "QUALIFIED" | "REJECTED" | "CLARIFICATION_REQUESTED",
    remarks: string
  ): Promise<{ success: boolean; bidder?: Bidder; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bidder = this.bidders.find(b => b.id === bidderId || b.bidIdCode === bidderId);
        if (bidder) {
          bidder.officerDecision = decision;
          bidder.officerRemarks = remarks;
          bidder.officerDecisionDate = new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });
          bidder.status = decision === "QUALIFIED" ? "Qualified" :
                          decision === "REJECTED" ? "Disqualified" : "Clarification Sent";
          this.saveBidders();
          resolve({ success: true, bidder: JSON.parse(JSON.stringify(bidder)) });
        } else {
          resolve({ success: false, error: "Bidder not found" });
        }
      }, 100);
    });
  }
}

export const bidderService = new BidderService();
