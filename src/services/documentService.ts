import { mockDocuments, DocumentItem } from "../data/documents";
import { bidderService } from "./bidderService";
import { tenderService } from "./tenderService";

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
        const parsed = JSON.parse(stored);
        // Ensure all mock bidders exist in storage
        delete parsed["BID-001"];
        delete parsed["BID-005"];
        Object.keys(mockDocuments).forEach(bidderId => {
          if (bidderId === "BID-001" || bidderId === "BID-005") return;
          if (!parsed[bidderId] || !Array.isArray(parsed[bidderId]) || parsed[bidderId].length === 0) {
            parsed[bidderId] = JSON.parse(JSON.stringify(mockDocuments[bidderId]));
          } else {
            // Ensure every mock document exists and its content is updated
            const defaultList = mockDocuments[bidderId] || [];
            defaultList.forEach(defDoc => {
              const existingIndex = parsed[bidderId].findIndex((d: DocumentItem) => d.id === defDoc.id);
              if (existingIndex === -1) {
                parsed[bidderId].push(JSON.parse(JSON.stringify(defDoc)));
              } else if (!parsed[bidderId][existingIndex].content || Object.keys(parsed[bidderId][existingIndex].content || {}).length < 5) {
                parsed[bidderId][existingIndex].content = JSON.parse(JSON.stringify(defDoc.content || {}));
              }
            });
          }
        });
        return parsed;
      }
    } catch (e) {
      console.warn("Error reading stored documents:", e);
    }
    const fresh = JSON.parse(JSON.stringify(mockDocuments));
    delete fresh["BID-001"];
    delete fresh["BID-005"];
    try {
      localStorage.setItem(STORAGE_KEY_DOCS, JSON.stringify(fresh));
    } catch (e) {}
    return fresh;
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
        let parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed = parsed.filter(
            (b: SubmittedBid) =>
              b.bidId !== "BID-001" &&
              b.bidId !== "001" &&
              b.bidId !== "BID-00231" &&
              b.bidId !== "BID-002270" &&
              !b.bidId?.toLowerCase().includes("abc") &&
              !b.tenderTitle?.toLowerCase().includes("abc") &&
              b.bidId !== "BID-005" &&
              b.bidId !== "005" &&
              !b.bidId?.toLowerCase().includes("kavach") &&
              !b.tenderTitle?.toLowerCase().includes("kavach")
          );
          try {
            localStorage.setItem(STORAGE_KEY_BIDS, JSON.stringify(parsed));
          } catch (e) {}
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Error reading submitted bids:", e);
    }
    return [
      {
        bidId: "BID-002",
        tenderId: "CPCL-2026-TE-045",
        tenderRef: "CPCL/2026/TE/045",
        tenderTitle: "Supply of High Pressure Valves",
        department: "CPCL",
        submissionDate: "01 Sep 2026, 11:30 AM",
        status: "UNDER EVALUATION",
        documentsCount: 10
      }
    ];
  }

  async deleteBid(bidId: string): Promise<boolean> {
    this.submittedBids = this.submittedBids.filter(b => b.bidId !== bidId);
    this.saveSubmittedBids();
    return true;
  }

  saveSubmittedBids(): void {
    try {
      localStorage.setItem(STORAGE_KEY_BIDS, JSON.stringify(this.submittedBids));
    } catch (e) {
      console.warn("Error saving submitted bids:", e);
    }
  }

  async getDocumentsByBidder(bidderId = "BID-002"): Promise<DocumentItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const docs = this.documents[bidderId] || mockDocuments[bidderId] || this.documents["BID-002"] || [];
        resolve(JSON.parse(JSON.stringify(docs)));
      }, 50);
    });
  }

  async uploadDocument(
    bidderId: string,
    docId: string,
    file: { name?: string; size?: number; fileDataUrl?: string }
  ): Promise<{ success: boolean; document?: DocumentItem; error?: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.documents[bidderId]) {
          this.documents[bidderId] = JSON.parse(JSON.stringify(this.documents["BID-002"] || []));
        }

        let doc = this.documents[bidderId].find(d => d.id === docId);
        if (!doc) {
          doc = {
            id: docId,
            title: file.name || "Statutory Document",
            fileName: file.name || "Uploaded_Document.pdf",
            fileSize: "1.2 MB",
            uploadDate: "",
            verified: true,
            category: "Compliance",
            content: { status: "Uploaded" }
          };
          this.documents[bidderId].push(doc);
        }

        doc.fileName = file.name || "Uploaded_Document.pdf";
        doc.fileSize = file.size
          ? file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${(file.size / 1024).toFixed(1)} KB`
          : "1.2 MB";
        doc.uploadDate = new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        });
        doc.verified = true;
        if (file.fileDataUrl) {
          doc.fileDataUrl = file.fileDataUrl;
        }
        this.saveDocuments();
        resolve({ success: true, document: doc });
      }, 150);
    });
  }

  async submitBid(
    tenderId: string,
    tenderRef: string,
    bidderName = "Bharat Industries",
    documentsList?: any[],
    tenderTitle?: string,
    department?: string,
    specificBidderId?: string
  ): Promise<{ success: boolean; submission: SubmittedBid; bidderId: string }> {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newBidId = specificBidderId || `BID-002${randomNum}`;
    const uploadedDocs = documentsList && documentsList.length > 0 ? documentsList : (this.documents[newBidId] || this.documents["BID-002"] || []);

    // Format and store documents under this new bidderId
    const formattedDocs: DocumentItem[] = uploadedDocs.map((item: any, idx: number) => {
      const fileSize = item.fileSize || (item.file?.size
        ? (item.file.size > 1024 * 1024 ? `${(item.file.size / (1024 * 1024)).toFixed(1)} MB` : `${(item.file.size / 1024).toFixed(1)} KB`)
        : "1.2 MB");

      if (item.docRef) {
        return {
          ...item.docRef,
          fileName: item.fileName || item.docRef.fileName || "Uploaded_Document.pdf",
          fileSize: fileSize || item.docRef.fileSize || "1.2 MB",
          fileDataUrl: item.fileDataUrl || item.docRef.fileDataUrl
        };
      }
      return {
        id: item.id || `doc-${idx + 1}`,
        title: item.name || item.title || `Document ${idx + 1}`,
        fileName: item.fileName || "Submitted_Document.pdf",
        fileSize: fileSize,
        fileDataUrl: item.fileDataUrl,
        uploadDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        verified: true,
        category: "Compliance",
        content: { status: "Submitted for Technical Verification" }
      };
    });

    this.documents[newBidId] = formattedDocs;
    this.saveDocuments();

    // Register bidder into bidderService for real-time visibility in officer portal
    await bidderService.registerBidder({
      id: newBidId,
      bidIdCode: specificBidderId ? specificBidderId.replace(/[^0-9]/g, "") || "005" : `GEM/2026/BID/${randomNum}`,
      bidderName: bidderName,
      tenderId: tenderId,
      tenderRef: tenderRef || tenderId,
      documentsSubmitted: `${formattedDocs.length} / 10`,
      documentsCount: formattedDocs.length,
      status: "Submitted",
      aiStatus: "NOT_RUN"
    });

    // Increment tender's total bidder and document count
    await tenderService.incrementBidderCount(tenderId);

    const newSubmission: SubmittedBid = {
      bidId: newBidId,
      tenderId: tenderId,
      tenderRef: tenderRef || "CPCL/2026/TE/045",
      tenderTitle: tenderTitle || "Supply of High Pressure Valves",
      department: department || "CPCL",
      submissionDate: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "UNDER EVALUATION",
      documentsCount: formattedDocs.length
    };

    this.submittedBids.unshift(newSubmission);
    this.saveSubmittedBids();

    return { success: true, submission: newSubmission, bidderId: newBidId };
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
