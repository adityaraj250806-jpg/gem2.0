import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { tenderService } from "../../services/tenderService";
import { documentService } from "../../services/documentService";
import { DocumentModal } from "../../components/modals/DocumentModal";
import { Tender } from "../../data/tenders";
import { DocumentItem } from "../../data/documents";
import { useApp } from "../../context/AppContext";
import { C, F, S } from "../../tokens";

interface DocStateItem {
  id: string;
  name: string;
  fileName: string | null;
  isUploaded: boolean;
  docRef: DocumentItem;
}

export const BidderUpload: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [tender, setTender] = useState<Tender | null>(null);
  const [docItems, setDocItems] = useState<DocStateItem[]>([]);
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const tenderId = id || "CPCL-2026-TE-045";
    tenderService.getTenderById(tenderId).then(t => {
      if (t) setTender(t);
      else tenderService.getAllTenders().then(list => setTender(list[0]));
    });

    documentService.getDocumentsByBidder("BID-001").then(docs => {
      const required = [
        { id: "doc-gst", name: "1. GST Registration Certificate", defaultFile: "GST_Certificate.pdf" },
        { id: "doc-pan", name: "2. PAN Card", defaultFile: "PAN.pdf" },
        { id: "doc-udyam", name: "3. Udyam / MSME Certificate", defaultFile: "Udyam.pdf" },
        { id: "doc-itr", name: "4. ITR / Income Tax Documents", defaultFile: "ITR_V_FY24_25.pdf" },
        { id: "doc-epfo", name: "5. EPFO / ESIC Certificate", defaultFile: "EPFO.pdf" },
        { id: "doc-mii", name: "6. Make in India Declaration", defaultFile: "Make_in_India_Declaration.pdf" },
        { id: "doc-balance-sheet", name: "7. Balance Sheet & CA Audit", defaultFile: "Balance_Sheet_FY25.pdf" },
        { id: "doc-boq", name: "8. Technical BOQ Compliance", defaultFile: "Technical_BOQ_Final.pdf" },
        { id: "doc-oem", name: "9. OEM Authorization", defaultFile: "OEM_Authorization.pdf" },
        { id: "doc-undertaking", name: "10. Non-Blacklisting Undertaking", defaultFile: null }
      ];

      const initial = required.map(r => {
        const found = docs.find(d => d.id === r.id);
        const hasFile = !!(found?.fileName || r.defaultFile);
        return {
          id: r.id,
          name: r.name,
          fileName: found?.fileName || r.defaultFile || null,
          isUploaded: hasFile,
          docRef: found || {
            id: r.id,
            title: r.name,
            fileName: r.defaultFile || "Sample_Document.pdf",
            fileSize: "1.2 MB",
            uploadDate: "01 Sep 2026",
            verified: true,
            category: "Compliance",
            content: { status: "Verified" }
          }
        };
      });

      setDocItems(initial);
    });
  }, [id]);

  const handleSimulateUpload = async (docId: string) => {
    const filename = `Signed_${docId.replace("doc-", "").toUpperCase()}_Document.pdf`;
    await documentService.uploadDocument("BID-001", docId, { name: filename, size: 1024 * 850 });
    setDocItems(prev => prev.map(item => {
      if (item.id === docId) {
        return {
          ...item,
          fileName: filename,
          isUploaded: true
        };
      }
      return item;
    }));
    showToast(`Uploaded ${filename} successfully`, "success");
  };

  const handleSubmitBid = async () => {
    if (!tender) return;
    setSubmitting(true);
    const res = await documentService.submitBid(tender.id, tender.referenceNumber, "ABC Engineering Ltd", docItems);
    setSubmitting(false);

    if (res.success) {
      showToast(`Bid submitted successfully! Reference: ${res.submission.bidId}`, "success");
      navigate("/bidder/bids");
    }
  };

  const uploadedCount = docItems.filter(d => d.isUploaded).length;
  const totalCount = docItems.length || 10;
  const percent = Math.round((uploadedCount / totalCount) * 100);

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", fontFamily: F.sans }}>
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: C.inkFaint }}>
          <Link to={`/bidder/tenders/${tender?.id || ""}`} style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>
            ← Tender Details
          </Link>
          {" / "}
          <span style={{ color: C.ink }}>Required Documents</span>
        </div>

        <button
          onClick={handleSubmitBid}
          disabled={submitting}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
            color: "#ffffff",
            fontWeight: 800,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
            boxShadow: `0 4px 12px ${C.navy}40`
          }}
        >
          {submitting ? "Submitting..." : "SUBMIT BID →"}
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: C.navy }}>{tender?.referenceNumber}</div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: "4px 0 0" }}>Upload Required Statutory Documents</h1>
      </div>

      {/* Progress Card */}
      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, padding: "18px 24px", marginBottom: 20, boxShadow: S.card }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>
            Upload Progress: <span style={{ color: C.navy, fontSize: 16 }}>{uploadedCount} / {totalCount}</span>
            <span style={{ fontSize: 12, color: C.inkFaint, fontWeight: 500, marginLeft: 8 }}>({percent}% complete)</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: percent === 100 ? C.emerald : C.amber }}>
            {percent === 100 ? "Ready for Submission ✓" : "Pending Documents"}
          </span>
        </div>
        <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${percent}%`, background: `linear-gradient(90deg, ${C.teal}, ${C.emerald})`, transition: "width 0.3s ease" }} />
        </div>
      </div>

      {/* Documents List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {docItems.map(item => (
          <div
            key={item.id}
            style={{
              background: "#ffffff",
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: S.subtle
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: item.isUploaded ? "#f0fdf4" : "#f1f5f9",
                  color: item.isUploaded ? C.emerald : C.inkFaint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 14,
                  border: `1px solid ${item.isUploaded ? "#bbf7d0" : "#cbd5e1"}`
                }}
              >
                {item.isUploaded ? "✓" : "○"}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{item.name}</div>
                <div style={{ fontSize: 12, color: item.isUploaded ? C.navy : C.inkFaint, marginTop: 2 }}>
                  {item.isUploaded ? `📄 ${item.fileName}` : "No document uploaded yet"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {item.isUploaded ? (
                <>
                  <button
                    onClick={() => setPreviewDoc(item.docRef)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 6,
                      border: `1px solid ${C.border}`,
                      background: "#ffffff",
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.ink,
                      cursor: "pointer"
                    }}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleSimulateUpload(item.id)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 6,
                      border: `1px solid #cbd5e1`,
                      background: "#f8fafc",
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.inkMuted,
                      cursor: "pointer"
                    }}
                  >
                    Re-upload
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleSimulateUpload(item.id)}
                  style={{
                    padding: "7px 18px",
                    borderRadius: 6,
                    border: "none",
                    background: C.navy,
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Upload File ⬆
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {previewDoc && <DocumentModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />}
    </div>
  );
};

export default BidderUpload;
