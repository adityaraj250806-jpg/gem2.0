import { mockDocuments, DocumentItem } from "../data/documents";

const STORAGE_KEY_DOCS = "gem_sentinel_documents";
const STORAGE_KEY_BIDS = "gem_sentinel_submitted_bids";

export interface SubmittedBid {
  bidId: string;
  tenderId: string;
  tenderRef: string;
  tenderTitle: string;
  department: string;
  submissionDate: string;
  status: string;
  documentsCount: number;
}

export class DocumentService {
  private documents: Record<string, DocumentItem[]>;
  private submittedBids: SubmittedBid[];

  constructor() {
    this.documents = this.loadDocuments();
    this.submittedBids = this.loadSubmittedBids();
  }

  private loadDocuments(): Record<string, DocumentItem[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_DOCS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error reading stored documents:", e);
    }
    return JSON.parse(JSON.stringify(mockDocuments));
  }

  saveDocuments(): void {
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(this.documents));
    } catch (e) {
      console.warn("Error saving documents:", e);
    }
  }

  private loadSubmittedBids(): SubmittedBid[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BIDS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error reading submitted bids:", e);
    }
    return [
      {
        bidId: "BID-00231",
        tenderId: "CPCL-2026-TE-045",
        tenderRef: "CPCL/2026/TE/045",
        tenderTitle: "Supply of High Pressure Valves",
        department: "CPCL",
        submissionDate: "01 Sep 2026, 09:12 AM",
        status: "UNDER EVALUATION",
        documentsCount: 10
      }
    ];
  }

  saveSubmittedBids(): void {
    try {
      localStorage.setItem(STORAGE_KEY_BIDS, JSON.stringify(this.submittedBids));
    } catch (e) {
      console.warn("Error saving submitted bids:", e);
    }
  }

  async getDocumentsByBidder(bidderId = "BID-001"): Promise<DocumentItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const docs = this.documents[bidderId] || this.documents["BID-001"] || [];
        resolve(JSON.parse(JSON.stringify(docs)));
      }, 50);
    });
  }

  async uploadDocument(
    bidderId: string,
    docId: string,
    file: { name?: string; size?: number }
  ): Promise<{ success: boolean; document?: DocumentItem; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.documents[bidderId]) {
          this.documents[bidderId] = JSON.parse(JSON.stringify(this.documents["BID-001"] || []));
        }

        const doc = this.documents[bidderId].find(d => d.id === docId);
        if (doc) {
          doc.fileName = file.name || "Uploaded_Document.pdf";
          doc.fileSize = file.size ? `${(file.size / 1024).toFixed(1)} KB` : "1.2 MB";
          doc.uploadDate = new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          });
          doc.verified = true;
          this.saveDocuments();
          resolve({ success: true, document: doc });
        } else {
          resolve({ success: false, error: "Document item not found" });
        }
      }, 150);
    });
  }

  async submitBid(
    tenderId: string,
    tenderRef: string,
    _bidderName?: string,
    documentsList?: any[]
  ): Promise<{ success: boolean; submission: SubmittedBid }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomNum = Math.floor(100 + Math.random() * 900);
        const newBidId = `BID-002${randomNum}`;
        const newSubmission: SubmittedBid = {
          bidId: newBidId,
          tenderId: tenderId,
          tenderRef: tenderRef || "CPCL/2026/TE/045",
          tenderTitle: "Supply of High Pressure Valves",
          department: "CPCL",
          submissionDate: new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          status: "UNDER EVALUATION",
          documentsCount: documentsList ? documentsList.length : 10
        };

        this.submittedBids.unshift(newSubmission);
        this.saveSubmittedBids();
        resolve({ success: true, submission: newSubmission });
      }, 300);
    });
  }

  async getMyBids(): Promise<SubmittedBid[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(this.submittedBids)));
      }, 50);
    });
  }
}

export const documentService = new DocumentService();
