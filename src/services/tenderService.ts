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
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error reading stored tenders:", e);
    }
    return JSON.parse(JSON.stringify(mockTenders));
  }

  saveTenders(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tenders));
    } catch (e) {
      console.warn("Error saving tenders:", e);
    }
  }

  async getAllTenders(): Promise<Tender[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.tenders]);
      }, 50);
    });
  }

  async getTenderById(id: string): Promise<Tender | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tender = this.tenders.find(t => t.id === id || t.referenceNumber === id);
        resolve(tender ? { ...tender } : null);
      }, 50);
    });
  }

  async searchTenders(query?: string, statusFilter = "ALL"): Promise<Tender[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
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
        resolve(results);
      }, 50);
    });
  }
}

export const tenderService = new TenderService();
