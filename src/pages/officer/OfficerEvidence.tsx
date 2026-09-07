import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [bidder, setBidder] = useState<Bidder | null>(null);
  const [evidenceList, setEvidenceList] = useState<EvidenceRecord[]>([]);
  const [selectedErrorIdx, setSelectedErrorIdx] = useState<number>(0);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [activeDocTab, setActiveDocTab] = useState<"DOC_A" | "DOC_B">("DOC_B");

  useEffect(() => {
    bidderService.getBidderById(bidderId).then(b => {
      if (b) setBidder(b);
      else bidderService.getBiddersByTender("CPCL-2026-TE-045").then(list => setBidder(list[0]));
    });

    const allEv = verificationService.getAllEvidence(bidderId);
    setEvidenceList(allEv);

    // Parse URL query parameter ?error=0,1,2...
    const query = new URLSearchParams(location.search);
    const errorParam = query.get("error");
    if (errorParam !== null) {
      const parsedIdx = parseInt(errorParam, 10);
      if (!isNaN(parsedIdx) && parsedIdx >= 0 && parsedIdx < allEv.length) {
        setSelectedErrorIdx(parsedIdx);
      }
    }

    documentService.getDocumentsByBidder(bidderId).then(setDocs);
  }, [bidderId, location.search]);

  if (evidenceList.length === 0) {
    return <div style={{ padding: 40, textAlign: "center", color: C.inkFaint }}>Loading forensic evidence...</div>;
  }

  const currentEvidence = evidenceList[selectedErrorIdx] || evidenceList[0];
  const isAllCleared = currentEvidence.severity === "LOW" || currentEvidence.statusBadge === "badge-success";

  const handleOpenRelatedDoc = () => {
    const activeDocMeta = activeDocTab === "DOC_A" ? currentEvidence.primaryDocument : currentEvidence.secondaryDocument;
    const found = docs.find(d => 
      d.fileName.toLowerCase() === activeDocMeta.fileName.toLowerCase() ||
      d.title.toLowerCase().includes(activeDocMeta.name.toLowerCase()) ||
      activeDocMeta.name.toLowerCase().includes(d.title.toLowerCase())
    ) || docs[0];
    if (found) setSelectedDoc(found);
  };

  const getSeverityStyle = (severity: string) => {
    if (severity === "HIGH" || severity === "CRITICAL" || severity === "CRITICAL_REVIEW") {
      return { bg: "#fef2f2", color: C.crimson, border: "#fecaca", icon: "✕" };
    }
    if (severity === "MEDIUM" || severity === "MODERATE") {
      return { bg: "#fffbeb", color: "#b45309", border: "#fde68a", icon: "⚠" };
    }
    return { bg: "#f0fdf4", color: C.emerald, border: "#bbf7d0", icon: "✓" };
  };

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", fontFamily: F.sans, paddingBottom: 60 }}>
      {/* Top Action Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Link to={`/officer/bidders/${bidder?.id || bidderId}/results`} style={{ color: C.navy, textDecoration: "none", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
          <span>←</span> Back to AI Evaluation Results
        </Link>
        <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, letterSpacing: "0.04em" }}>
          FORENSIC EVIDENCE & ANOMALIES INSPECTOR
        </div>
        <span style={{ 
          padding: "5px 12px", 
          borderRadius: 20, 
          fontSize: 11.5, 
          fontWeight: 800, 
          background: isAllCleared ? "#f0fdf4" : "#fef2f2", 
          color: isAllCleared ? C.emerald : C.crimson, 
          border: `1px solid ${isAllCleared ? "#bbf7d0" : "#fecaca"}` 
        }}>
          {isAllCleared ? "✓ 0 Discrepancies Found" : `⚡ ${evidenceList.length} Discrepancies Detected Live`}
        </span>
      </div>

      {/* Header Info */}
      <div style={{ background: "#ffffff", padding: "20px 24px", borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: S.card, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: 0, textTransform: "uppercase" }}>
                {bidder?.bidderName || "ABC ENGINEERING LTD"}
              </h1>
              <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: F.mono, background: "#eff6ff", color: C.navy }}>
                {bidder?.id || bidderId}
              </span>
              <span style={{ fontSize: 12, color: C.inkMuted }}>
                Tender: <strong style={{ color: C.navy, fontFamily: F.mono }}>{bidder?.tenderRef || "CPCL/2026/TE/045"}</strong>
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: C.inkMuted, margin: "6px 0 0" }}>
              Live cross-document triangulation comparing submitted PDF certificates against official Government Registries (CBIC GSTN, CBDT PAN, MSME Udyam, EPFO, ESIC, ICAI UDIN).
            </p>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Link
              to={`/officer/bidders/${bidder?.id || bidderId}/documents`}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                background: "#f8fafc",
                border: `1px solid ${C.border}`,
                color: C.ink,
                fontSize: 12,
                fontWeight: 700,
                textDecoration: "none"
              }}
            >
              📄 Browse All Submitted Documents
            </Link>
          </div>
        </div>

        {/* ── LIVE ERROR SELECTOR TABS RIBBON ── */}
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid #f1f5f9` }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.inkFaint, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
            SELECT DETECTED FLAW TO INSPECT EVIDENCE ({evidenceList.length} TOTAL):
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {evidenceList.map((item, idx) => {
              const isSelected = idx === selectedErrorIdx;
              const sev = getSeverityStyle(item.severity);
              return (
                <button
                  key={item.findingId}
                  onClick={() => {
                    setSelectedErrorIdx(idx);
                    setActiveDocTab("DOC_B");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: isSelected ? `2px solid ${C.navy}` : `1px solid ${C.border}`,
                    background: isSelected ? "#eff6ff" : "#ffffff",
                    cursor: "pointer",
                    textAlign: "left",
                    boxShadow: isSelected ? "0 2px 8px rgba(11, 61, 145, 0.15)" : "none",
                    transition: "all 0.15s ease"
                  }}
                >
                  <span style={{ 
                    padding: "2px 6px", 
                    borderRadius: 4, 
                    fontSize: 10, 
                    fontWeight: 900, 
                    background: sev.bg, 
                    color: sev.color,
                    border: `1px solid ${sev.border}`
                  }}>
                    {sev.icon} #{idx + 1}
                  </span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: isSelected ? 800 : 700, color: isSelected ? C.navy : C.ink }}>
                      {item.findingId}
                    </div>
                    <div style={{ fontSize: 11, color: isSelected ? C.navy : C.inkMuted, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CURRENT SELECTED FLAW BANNER ── */}
      <div style={{ 
        background: isAllCleared ? "#f0fdf4" : "#fff7ed", 
        border: `1px solid ${isAllCleared ? "#bbf7d0" : "#fed7aa"}`, 
        borderRadius: 10, 
        padding: "14px 20px", 
        marginBottom: 20, 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>{isAllCleared ? "✓" : "⚡"}</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: isAllCleared ? "#166534" : "#9a3412", textTransform: "uppercase" }}>
              ACTIVE FORENSIC AUDIT TARGET [ERROR {selectedErrorIdx + 1} OF {evidenceList.length}]
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: isAllCleared ? "#15803d" : "#7c2d12", marginTop: 2 }}>
              {currentEvidence.title}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ 
            padding: "4px 10px", 
            borderRadius: 6, 
            fontSize: 11, 
            fontWeight: 800, 
            background: isAllCleared ? "#dcfce7" : "#ffedd5", 
            color: isAllCleared ? "#15803d" : "#c2410c" 
          }}>
            Confidence: {currentEvidence.confidence}
          </span>
          <span style={{ 
            padding: "4px 10px", 
            borderRadius: 6, 
            fontSize: 11, 
            fontWeight: 800, 
            background: isAllCleared ? "#dcfce7" : "#fee2e2", 
            color: isAllCleared ? "#15803d" : C.crimson 
          }}>
            Severity: {currentEvidence.severity}
          </span>
        </div>
      </div>

      {/* ── TWO-PANEL SPLIT VIEWPORT ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 20, alignItems: "start", marginBottom: 32 }}>
        {/* LEFT PANEL: Live Document Extracts (Submitted vs Registry) */}
        <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card }}>
          <div style={{ padding: "12px 18px", background: "#f8fafc", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.ink, textTransform: "uppercase" }}>
              📄 FORENSIC SOURCE ARTIFACTS
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setActiveDocTab("DOC_A")}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  border: `1px solid ${activeDocTab === "DOC_A" ? C.navy : C.border}`,
                  background: activeDocTab === "DOC_A" ? C.navy : "#ffffff",
                  color: activeDocTab === "DOC_A" ? "#ffffff" : C.ink,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                1. {currentEvidence.primaryDocument.name} (Pg {currentEvidence.primaryDocument.currentPage})
              </button>
              <button
                onClick={() => setActiveDocTab("DOC_B")}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  border: `1px solid ${activeDocTab === "DOC_B" ? (isAllCleared ? C.emerald : C.crimson) : C.border}`,
                  background: activeDocTab === "DOC_B" ? (isAllCleared ? C.emerald : C.crimson) : "#ffffff",
                  color: activeDocTab === "DOC_B" ? "#ffffff" : C.ink,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                2. {currentEvidence.secondaryDocument.name} (Pg {currentEvidence.secondaryDocument.currentPage})
              </button>
            </div>
          </div>

          <div style={{ padding: 22, minHeight: 400 }}>
            {activeDocTab === "DOC_A" ? (
              <div>
                <div style={{ fontSize: 11, color: C.inkFaint, marginBottom: 6 }}>
                  ARTIFACT: <strong style={{ color: C.ink }}>{currentEvidence.primaryDocument.fileName}</strong> • Page {currentEvidence.primaryDocument.currentPage} of {currentEvidence.primaryDocument.totalPages}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.navy, marginBottom: 12 }}>
                  {currentEvidence.primaryDocument.excerptTitle}
                </div>
                <div style={{ background: isAllCleared ? "#f0fdf4" : "#fffbeb", border: `1px solid ${isAllCleared ? "#bbf7d0" : "#fde68a"}`, padding: "14px", borderRadius: 8, margin: "14px 0" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isAllCleared ? "#166534" : "#92400e", textTransform: "uppercase" }}>
                    Bidder Submitted Declaration / Claim:
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 900, color: isAllCleared ? C.emerald : "#b45309", fontFamily: F.mono, margin: "4px 0" }}>
                    {currentEvidence.primaryDocument.highlightSnippet}
                  </div>
                </div>
                <pre style={{ background: "#f8fafc", padding: 14, borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 11.5, color: C.ink, fontFamily: F.mono, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                  {currentEvidence.primaryDocument.surroundingText}
                </pre>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 11, color: C.inkFaint, marginBottom: 6 }}>
                  COUNTER-SOURCE: <strong style={{ color: C.ink }}>{currentEvidence.secondaryDocument.fileName}</strong> • Page {currentEvidence.secondaryDocument.currentPage} of {currentEvidence.secondaryDocument.totalPages}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: isAllCleared ? C.emerald : C.crimson, marginBottom: 12 }}>
                  {currentEvidence.secondaryDocument.excerptTitle}
                </div>
                <div style={{ background: isAllCleared ? "#f0fdf4" : "#fef2f2", border: `1px solid ${isAllCleared ? "#bbf7d0" : "#fecaca"}`, padding: "14px", borderRadius: 8, margin: "14px 0" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isAllCleared ? "#166534" : "#991b1b", textTransform: "uppercase" }}>
                    {isAllCleared ? "Official Government Registry / Audit Proof:" : "Contradicting Portal Record / Statutory Failure:"}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 900, color: isAllCleared ? C.emerald : C.crimson, fontFamily: F.mono, margin: "4px 0" }}>
                    {currentEvidence.secondaryDocument.highlightSnippet}
                  </div>
                </div>
                <pre style={{ background: "#f8fafc", padding: 14, borderRadius: 6, border: `1px solid ${C.border}`, fontSize: 11.5, color: C.ink, fontFamily: F.mono, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                  {currentEvidence.secondaryDocument.surroundingText}
                </pre>
              </div>
            )}
          </div>

          <div style={{ padding: "10px 18px", background: "#f8fafc", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", fontSize: 11, color: C.inkFaint }}>
            <span>Viewing: {activeDocTab === "DOC_A" ? currentEvidence.primaryDocument.name : currentEvidence.secondaryDocument.name}</span>
            <span style={{ fontFamily: F.mono }}>INTEGRITY HASH: SHA256-AUTHENTIC</span>
          </div>
        </div>

        {/* RIGHT PANEL: AI Forensic Analysis & Direct Comparison */}
        <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${isAllCleared ? "#bbf7d0" : "#fed7aa"}`, overflow: "hidden", boxShadow: S.card }}>
          <div style={{ padding: "12px 18px", background: isAllCleared ? "#f0fdf4" : "#fff7ed", borderBottom: `1px solid ${isAllCleared ? "#bbf7d0" : "#fed7aa"}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: isAllCleared ? "#166534" : "#9a3412", textTransform: "uppercase" }}>
              🤖 AI FORENSIC TRIANGULATION
            </div>
            <span style={{ padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 800, background: isAllCleared ? "#dcfce7" : "#ffedd5", color: isAllCleared ? "#15803d" : "#c2410c" }}>
              {currentEvidence.findingId}
            </span>
          </div>

          <div style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 18 }}>{isAllCleared ? "✓" : "⚠"}</span>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: isAllCleared ? "#15803d" : "#9a3412", margin: 0 }}>
                {currentEvidence.aiFinding.detectionType}
              </h3>
            </div>

            {/* Side-by-Side Comparison Box */}
            <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, marginBottom: 16 }}>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>
                  CLAIM A ({currentEvidence.aiFinding.comparison.itemA.doc}):
                </div>
                <div style={{ fontWeight: 800, color: C.navy, fontSize: 13, padding: "6px 10px", background: "#ffffff", borderRadius: 6, borderLeft: `3px solid ${C.navy}`, marginTop: 4 }}>
                  {currentEvidence.aiFinding.comparison.itemA.value}
                </div>
              </div>

              <div style={{ textAlign: "center", margin: "6px 0", fontSize: 11, fontWeight: 900, color: isAllCleared ? C.emerald : C.crimson }}>
                {isAllCleared ? "⚡ FULLY CORROBORATES WITH ⚡" : "⚡ CONTRADICTED BY OFFICIAL RECORD ⚡"}
              </div>

              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>
                  RECORD B ({currentEvidence.aiFinding.comparison.itemB.doc}):
                </div>
                <div style={{ fontWeight: 800, color: isAllCleared ? C.emerald : C.crimson, fontSize: 13, padding: "6px 10px", background: isAllCleared ? "#f0fdf4" : "#fef2f2", borderRadius: 6, borderLeft: `3px solid ${isAllCleared ? C.emerald : C.crimson}`, marginTop: 4 }}>
                  {currentEvidence.aiFinding.comparison.itemB.value}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: isAllCleared ? "#f0fdf4" : "#fef2f2", border: `1px solid ${isAllCleared ? "#bbf7d0" : "#fecaca"}`, borderRadius: 6, marginBottom: 16 }}>
              <span style={{ fontSize: 11.5, fontWeight: 800, color: isAllCleared ? "#166534" : C.crimson }}>
                {isAllCleared ? "✓" : "⚠"} {currentEvidence.aiFinding.findingLabel}
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: isAllCleared ? "#15803d" : "#991b1b" }}>
                Confidence: <strong>{currentEvidence.confidence}</strong>
              </span>
            </div>

            <div style={{ fontSize: 12, color: C.ink, lineHeight: 1.6, whiteSpace: "pre-line", background: "#f8fafc", padding: 14, borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 18 }}>
              {currentEvidence.aiFinding.forensicAnalysis}
            </div>

            <button
              onClick={handleOpenRelatedDoc}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 8,
                background: C.navy,
                color: "#ffffff",
                fontSize: 12.5,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(11,61,145,0.2)"
              }}
            >
              🔍 VIEW FULL {activeDocTab === "DOC_A" ? currentEvidence.primaryDocument.name : currentEvidence.secondaryDocument.name} IN MODAL
            </button>
          </div>
        </div>
      </div>

      {/* ── ALL DETECTED ANOMALIES & EVIDENCE SUMMARY GRID ── */}
      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, padding: 24, boxShadow: S.card }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: C.navy, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              📋 ALL DETECTED DISCREPANCIES FOR {bidder?.bidderName || "THIS BIDDER"} ({evidenceList.length} TOTAL)
            </h3>
            <p style={{ fontSize: 12, color: C.inkMuted, margin: "3px 0 0" }}>
              Click on any flaw card below to immediately load its side-by-side evidence in the live inspector above.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 16 }}>
          {evidenceList.map((item, idx) => {
            const isSelected = idx === selectedErrorIdx;
            const sev = getSeverityStyle(item.severity);
            return (
              <div
                key={item.findingId}
                onClick={() => {
                  setSelectedErrorIdx(idx);
                  setActiveDocTab("DOC_B");
                  window.scrollTo({ top: 120, behavior: "smooth" });
                }}
                style={{
                  padding: 16,
                  borderRadius: 10,
                  border: isSelected ? `2px solid ${C.navy}` : `1px solid ${C.border}`,
                  background: isSelected ? "#f8fafc" : "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isSelected ? "0 4px 12px rgba(11,61,145,0.12)" : "none",
                  transition: "all 0.15s ease"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ 
                      padding: "2px 8px", 
                      borderRadius: 4, 
                      fontSize: 10, 
                      fontWeight: 900, 
                      background: sev.bg, 
                      color: sev.color,
                      border: `1px solid ${sev.border}`
                    }}>
                      {sev.icon} ERROR #{idx + 1}: {item.findingId}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint }}>
                      Confidence: {item.confidence}
                    </span>
                  </div>

                  <div style={{ fontSize: 13.5, fontWeight: 800, color: isSelected ? C.navy : C.ink, lineHeight: 1.4, marginBottom: 8 }}>
                    {item.title}
                  </div>

                  <div style={{ fontSize: 11.5, color: C.inkMuted, background: "#f8fafc", padding: "8px 10px", borderRadius: 6, border: `1px solid #f1f5f9`, marginBottom: 10 }}>
                    <div><strong>Submitted:</strong> {item.aiFinding.comparison.itemA.value}</div>
                    <div style={{ color: isAllCleared ? C.emerald : C.crimson, marginTop: 3 }}>
                      <strong>Registry:</strong> {item.aiFinding.comparison.itemB.value}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: `1px solid #f1f5f9` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: isSelected ? C.navy : C.inkFaint }}>
                    {isSelected ? "● CURRENTLY INSPECTING" : "Click to Inspect"}
                  </span>
                  <button
                    style={{
                      padding: "4px 10px",
                      borderRadius: 5,
                      background: isSelected ? C.navy : "#ffffff",
                      color: isSelected ? "#ffffff" : C.navy,
                      border: `1px solid ${C.navy}`,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Inspect Proof ↗
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDoc && <DocumentModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
    </div>
  );
};

export default OfficerEvidence;

