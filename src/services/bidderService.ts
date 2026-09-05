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
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error reading stored bidders:", e);
    }
    return JSON.parse(JSON.stringify(mockBidders));
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
        const matches = this.bidders.filter(b =>
          b.tenderId === tenderId || b.tenderRef === tenderId || tenderId.includes("045")
        );
        resolve(JSON.parse(JSON.stringify(matches)));
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
