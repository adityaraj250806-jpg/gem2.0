import { mockTenders, Tender } from "../data/tenders";

const STORAGE_KEY = "gem_sentinel_tenders";

export class TenderService {
  private tenders: Tender[];

  constructor() {
    this.tenders = this.loadTenders();
  }

  private loadTenders(): Tender[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          mockTenders.forEach(mt => {
            const idx = parsed.findIndex((p: Tender) => p.id === mt.id);
            if (idx === -1) {
              parsed.push(JSON.parse(JSON.stringify(mt)));
            }
          });
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading stored tenders:", e);
    }
    const fresh = JSON.parse(JSON.stringify(mockTenders));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch (e) {}
    return fresh;
  }

  saveTenders(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tenders));
    } catch (e) {
      console.warn("Error saving tenders:", e);
    }
  }

  async getAllTenders(): Promise<Tender[]> {
    return [...this.tenders];
  }

  async getTenderById(id: string): Promise<Tender | null> {
    const tender = this.tenders.find(t => t.id === id || t.referenceNumber === id);
    return tender ? { ...tender } : null;
  }

  async searchTenders(query?: string, statusFilter = "ALL"): Promise<Tender[]> {
    let results = [...this.tenders];
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(t =>
        t.referenceNumber.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q)
      );
    }
    if (statusFilter && statusFilter !== "ALL") {
      results = results.filter(t => t.status === statusFilter || t.officerStatus === statusFilter);
    }
    return results;
  }

  async incrementBidderCount(tenderId: string): Promise<void> {
    const tender = this.tenders.find(
      t => t.id.toLowerCase() === tenderId.toLowerCase() ||
           t.referenceNumber.toLowerCase() === tenderId.toLowerCase() ||
           tenderId.toLowerCase().includes(t.id.toLowerCase())
    );
    if (tender) {
      tender.biddersCount = (tender.biddersCount || 0) + 1;
      tender.documentsCount = (tender.documentsCount || 0) + 10;
      this.saveTenders();
    }
  }
}

export const tenderService = new TenderService();
