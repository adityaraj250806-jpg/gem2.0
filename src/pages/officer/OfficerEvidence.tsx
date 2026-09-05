import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { verificationService } from "../../services/verificationService";
import { bidderService } from "../../services/bidderService";
import { documentService } from "../../services/documentService";
import { DocumentModal } from "../../components/modals/DocumentModal";
import { Bidder } from "../../data/bidders";
import { EvidenceRecord } from "../../data/evidence";
import { DocumentItem } from "../../data/documents";
import { C, F, S } from "../../tokens";

export const OfficerEvidence: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bidderId = id || "BID-001";

  const [bidder, setBidder] = useState<Bidder | null>(null);
  const [evidence, setEvidence] = useState<EvidenceRecord | null>(null);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [activeTab, setActiveTab] = useState<"MII" | "BOQ">("BOQ");

  useEffect(() => {
    bidderService.getBidderById(bidderId).then(b => {
      if (b) setBidder(b);
      else bidderService.getBiddersByTender("CPCL-2026-TE-045").then(list => setBidder(list[0]));
    });

    const ev = verificationService.getEvidence(bidderId);
    setEvidence(ev);

    documentService.getDocumentsByBidder(bidderId).then(setDocs);
  }, [bidderId]);

  if (!evidence) {
    return <div style={{ padding: 40, textAlign: "center", color: C.inkFaint }}>Loading forensic evidence...</div>;
  }

  const handleOpenRelatedDoc = () => {
    const targetDocId = activeTab === "MII" ? "doc-mii" : "doc-boq";
    const found = docs.find(d => d.id === targetDocId);
    if (found) setSelectedDoc(found);
  };

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", fontFamily: F.sans }}>
      {/* Top Action Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Link to={`/officer/bidders/${bidder?.id || bidderId}/results`} style={{ color: C.navy, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
          ← Back to AI Results
        </Link>
        <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, letterSpacing: "0.04em" }}>
          EVIDENCE VIEWER
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700, background: "#fffbeb", color: C.amber, border: "1px solid #fde68a" }}>
          ⚠ Contradiction ID: MII-BOQ-2026
        </span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.ink }}>
          {bidder?.bidderName || "ABC ENGINEERING LTD"} <span style={{ fontFamily: F.mono, fontSize: 14, color: C.inkFaint }}>({bidder?.id || bidderId})</span>
        </div>
        <p style={{ fontSize: 12, color: C.inkMuted, margin: "2px 0 0" }}>
          Forensic cross-document triangulation and statutory origin verification
        </p>
      </div>

      {/* Two-Panel Split Viewport */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        {/* LEFT PANEL: Bidder Document Preview */}
        <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card }}>
          <div style={{ padding: "14px 20px", background: "#f8fafc", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.ink, textTransform: "uppercase" }}>
              📄 BIDDER DOCUMENT PREVIEW
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setActiveTab("MII")}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  border: `1px solid ${activeTab === "MII" ? C.navy : C.border}`,
                  background: activeTab === "MII" ? C.navy : "#ffffff",
                  color: activeTab === "MII" ? "#ffffff" : C.ink,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                MII Decl. (Pg 3)
              </button>
              <button
                onClick={() => setActiveTab("BOQ")}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  border: `1px solid ${activeTab === "BOQ" ? C.navy : C.border}`,
                  background: activeTab === "BOQ" ? C.navy : "#ffffff",
                  color: activeTab === "BOQ" ? "#ffffff" : C.ink,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Tech BOQ (Pg 64)
              </button>
            </div>
          </div>

          <div style={{ padding: 24, minHeight: 380 }}>
            {activeTab === "MII" ? (
              <div>
                <div style={{ fontSize: 11, color: C.inkFaint, marginBottom: 6 }}>
                  DOCUMENT: Make_in_India_Declaration.pdf • Page 3 of 8
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 12 }}>
                  {evidence.primaryDocument.excerptTitle}
                </div>
                <p style={{ fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }}>
                  We, M/s ABC Engineering Ltd, hereby confirm that all equipment supplied under Tender CPCL/2026/TE/045 meets Class-I Local Supplier criteria under the Public Procurement Order.
                </p>
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: "14px", borderRadius: 8, margin: "14px 0" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase" }}>
                    Detected Statutory Claim:
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#b45309", fontFamily: F.mono, margin: "4px 0" }}>
                    {evidence.primaryDocument.highlightSnippet}
                  </div>
                  <div style={{ fontSize: 11, color: "#92400e" }}>
                    Location of Value Addition: Plot 14-B, Ambattur Industrial Estate, Chennai
                  </div>
                </div>
                <pre style={{ background: "#f8fafc", padding: 12, borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 11, color: C.inkMuted, fontFamily: F.mono, whiteSpace: "pre-wrap" }}>
                  {evidence.primaryDocument.surroundingText}
                </pre>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 11, color: C.inkFaint, marginBottom: 6 }}>
                  DOCUMENT: Technical_BOQ_Final.pdf • Page 64 of 156
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.crimson, marginBottom: 12 }}>
                  {evidence.secondaryDocument.excerptTitle}
                </div>
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "14px", borderRadius: 8, margin: "14px 0" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#991b1b", textTransform: "uppercase" }}>
                    Contradicting Bill of Materials Entry:
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: C.crimson, fontFamily: F.mono, margin: "4px 0" }}>
                    {evidence.secondaryDocument.highlightSnippet}
                  </div>
                  <div style={{ fontSize: 11, color: "#991b1b" }}>
                    Line Item 14.2: High Pressure Cryogenic Valve Actuator / Pump Assembly
                  </div>
                </div>
                <pre style={{ background: "#f8fafc", padding: 12, borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 11, color: C.ink, fontFamily: F.mono, whiteSpace: "pre-wrap", lineHeight: 1.4 }}>
                  {evidence.secondaryDocument.surroundingText}
                </pre>
              </div>
            )}
          </div>

          <div style={{ padding: "10px 20px", background: "#f8fafc", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", fontSize: 11, color: C.inkFaint }}>
            <span>{activeTab === "MII" ? "Page 3 / 8" : "Page 64 / 156"}</span>
            <span style={{ fontFamily: F.mono }}>OCR Checksum: SHA256-VALID</span>
          </div>
        </div>

        {/* RIGHT PANEL: AI Finding Explanation */}
        <div style={{ background: "#ffffff", borderRadius: 12, border: "1px solid #fed7aa", overflow: "hidden", boxShadow: S.card }}>
          <div style={{ padding: "14px 20px", background: "#fff7ed", borderBottom: "1px solid #fed7aa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#9a3412", textTransform: "uppercase" }}>
              🤖 AI FORENSIC FINDING
            </div>
            <span style={{ padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 800, background: "#ffedd5", color: "#c2410c" }}>
              ⚠ {evidence.findingId}
            </span>
          </div>

          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>⚠</span>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#9a3412", margin: 0 }}>
                {evidence.aiFinding.detectionType}
              </h3>
            </div>

            {/* VS Box */}
            <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>
                  {evidence.aiFinding.comparison.itemA.doc} ({evidence.aiFinding.comparison.itemA.page}):
                </div>
                <div style={{ fontWeight: 800, color: C.navy, fontSize: 14, padding: "6px 10px", background: "#ffffff", borderRadius: 6, borderLeft: `3px solid ${C.navy}`, marginTop: 4 }}>
                  {evidence.aiFinding.comparison.itemA.value}
                </div>
              </div>

              <div style={{ textAlign: "center", margin: "8px 0", fontSize: 11, fontWeight: 800, color: C.inkFaint }}>
                ⚡ CONTRADICTS ⚡
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>
                  {evidence.aiFinding.comparison.itemB.doc} ({evidence.aiFinding.comparison.itemB.page}):
                </div>
                <div style={{ fontWeight: 800, color: C.crimson, fontSize: 14, padding: "6px 10px", background: "#fef2f2", borderRadius: 6, borderLeft: `3px solid ${C.crimson}`, marginTop: 4 }}>
                  {evidence.aiFinding.comparison.itemB.value}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: C.crimson }}>
                ⚠ {evidence.aiFinding.findingLabel}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#991b1b" }}>
                Confidence: <strong>{evidence.confidence}</strong>
              </span>
            </div>

            <div style={{ fontSize: 12, color: C.ink, lineHeight: 1.6, whiteSpace: "pre-line", background: "#f8fafc", padding: 16, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 20 }}>
              {evidence.aiFinding.forensicAnalysis}
            </div>

            <button
              onClick={handleOpenRelatedDoc}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 8,
                background: C.navy,
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 700,
                border: "none",
                cursor: "pointer"
              }}
            >
              [ VIEW FULL DOCUMENT IN MODAL ]
            </button>
          </div>
        </div>
      </div>

      {selectedDoc && <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
    </div>
  );
};

export default OfficerEvidence;
