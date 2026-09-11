import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { bidderService } from "../../services/bidderService";
import { documentService } from "../../services/documentService";
import { DocumentModal } from "../../components/modals/DocumentModal";
import { Bidder } from "../../data/bidders";
import { DocumentItem } from "../../data/documents";
import { C, F, S } from "../../tokens";

export const OfficerBidderDocs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bidderId = id || "BID-002";
  const navigate = useNavigate();

  const [bidder, setBidder] = useState<Bidder | null>(null);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  useEffect(() => {
    bidderService.getBidderById(bidderId).then(b => {
      if (b) setBidder(b);
      else bidderService.getBiddersByTender("CPCL-2026-TE-045").then(list => setBidder(list[0]));
    });

    documentService.getDocumentsByBidder(bidderId).then(setDocs);
  }, [bidderId]);

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", fontFamily: F.sans }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to={`/officer/tenders/${bidder?.tenderId || "CPCL-2026-TE-045"}/bidders`} style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>
          ← Back to Bidders
        </Link>
        {" / "}
        <span style={{ color: C.ink }}>{bidder?.bidderName} Documents</span>
      </div>

      {/* Hero Banner */}
      <div
        style={{
          background: "#ffffff",
          padding: "24px 28px",
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          marginBottom: 24,
          boxShadow: S.card,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: 0, textTransform: "uppercase" }}>
              {bidder?.bidderName || "ABC ENGINEERING LTD"}
            </h1>
            <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: F.mono, background: "#eff6ff", color: C.navy }}>
              {bidder?.id || "BID-001"}
            </span>
          </div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Tender: <strong style={{ color: C.navy, fontFamily: F.mono }}>{bidder?.tenderRef || "CPCL/2026/TE/045"}</strong>
            <span style={{ margin: "0 8px", color: C.borderStrong }}>•</span>
            Submitted: <strong>{bidder?.submittedAt || "01 Sep 2026, 09:12 AM"}</strong>
          </div>
        </div>

        <span style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: docs.length === 10 ? "#f0fdf4" : "#fffbeb", color: docs.length === 10 ? C.emerald : C.amber }}>
          Package: {docs.length} of 10 Uploaded
        </span>
      </div>

      {/* Documents Package Box */}
      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card, marginBottom: 30 }}>
        <div style={{ padding: "16px 24px", background: "#f8fafc", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: C.navy, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
            DOCUMENT PACKAGE
          </h3>
          <span style={{ fontSize: 12, color: C.inkFaint }}>
            Click VIEW to inspect authentic submitted certificate artifacts
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {docs.map((doc, idx) => (
            <div
              key={doc.id}
              style={{
                padding: "14px 24px",
                borderBottom: idx === docs.length - 1 ? "none" : `1px solid #f1f5f9`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 20 }}>📄</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{doc.title}</div>
                  <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 2 }}>{doc.fileName} ({doc.fileSize})</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(doc)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  background: "#ffffff",
                  color: C.ink,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                VIEW
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CLARIFICATION RECEIVED BANNER — shown when bidder has replied to a sent clarification */}
      {bidder?.officerDecision === "CLARIFICATION_REQUESTED" && bidder?.clarificationResponse && (
        <div style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)",
          borderRadius: 14,
          border: "2px solid #86efac",
          padding: "24px 28px",
          boxShadow: S.card,
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>📩</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#166534", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                CLARIFICATION RESPONSE RECEIVED
              </span>
              <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, background: "#dcfce7", color: "#15803d" }}>
                ACTION REQUIRED
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: "#166534", lineHeight: 1.5, maxWidth: 480 }}>
              Bidder has submitted their technical clarification ({bidder.clarificationResponseDate || "Recently"}). Re-run the AI forensic verification to incorporate this response into the updated compliance scorecard.
            </div>
            <div style={{ fontSize: 12, color: "#15803d", marginTop: 6, background: "#ffffff", padding: "8px 12px", borderRadius: 6, border: "1px solid #bbf7d0", maxWidth: 480 }}>
              <strong>Bidder Response:</strong> "{bidder.clarificationResponse?.slice(0, 120)}{(bidder.clarificationResponse?.length || 0) > 120 ? "..." : ""}"
            </div>
          </div>
          <button
            onClick={() => navigate(`/officer/bidders/${bidder.id}/verification`)}
            style={{
              padding: "14px 28px",
              borderRadius: 10,
              border: "none",
              background: `linear-gradient(135deg, ${C.navy}, #1e40af)`,
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 800,
              cursor: "pointer",
              letterSpacing: "0.04em",
              boxShadow: "0 6px 20px rgba(11,61,145,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <span>✨</span> RE-RUN AI VERIFICATION
          </button>
        </div>
      )}

      {/* RUN AI VERIFICATION TRIGGER — shown on first run or after reset */}
      {!(bidder?.officerDecision === "CLARIFICATION_REQUESTED" && bidder?.clarificationResponse) && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            border: "2px dashed #93c5fd",
            padding: "32px 24px",
            textAlign: "center",
            boxShadow: S.card,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <button
            onClick={() => navigate(`/officer/bidders/${bidder?.id || "BID-002"}/verification`)}
            style={{
              padding: "14px 36px",
              borderRadius: 10,
              border: "none",
              background: `linear-gradient(135deg, ${C.navy}, #1e40af)`,
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 800,
              cursor: "pointer",
              letterSpacing: "0.04em",
              boxShadow: `0 6px 20px rgba(11, 61, 145, 0.35)`,
              transition: "transform 0.15s"
            }}
          >
            ✨ RUN AI VERIFICATION
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 12, color: C.amber, fontWeight: 600 }}>
            <span>ℹ️</span>
            <span>AI analysis has not been performed yet.</span>
          </div>

          <p style={{ fontSize: 12, color: C.inkFaint, maxWidth: 520, margin: "8px 0 0", lineHeight: 1.5 }}>
            Clicking this button will initiate forensic verification, cross-registry triangulation, and automated anomaly detection for {bidder?.bidderName}.
          </p>
        </div>
      )}

      {selectedDoc && <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
    </div>
  );
};

export default OfficerBidderDocs;
