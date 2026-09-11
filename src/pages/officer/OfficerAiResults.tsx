import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { verificationService } from "../../services/verificationService";
import { bidderService } from "../../services/bidderService";
import { OfficerDecisionModal } from "../../components/modals/OfficerDecisionModal";
import { Bidder } from "../../data/bidders";
import { VerificationResult } from "../../data/verificationResults";
import { C, F, S } from "../../tokens";

export const OfficerAiResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bidderId = id || "BID-001";
  const navigate = useNavigate();
  const [bidder, setBidder] = useState<Bidder | null>(null);
  const [results, setResults] = useState<VerificationResult | null>(null);
  const [decisionModalType, setDecisionModalType] = useState<"QUALIFY" | "REJECT" | "SEND_CLARIFICATION" | null>(null);

  useEffect(() => {
    bidderService.getBidderById(bidderId).then(b => {
      if (b) setBidder(b);
      else bidderService.getBiddersByTender("CPCL-2026-TE-045").then(list => setBidder(list[0]));
    });

    const res = verificationService.getResults(bidderId);
    setResults(res);

    const handleUpdate = () => {
      bidderService.getBidderById(bidderId).then(b => {
        if (b) setBidder(b);
      });
    };
    window.addEventListener("gem_officer_decision_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("gem_officer_decision_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [bidderId]);

  if (!results) {
    return <div style={{ padding: 40, textAlign: "center", color: C.inkFaint }}>Loading scorecard results...</div>;
  }

  // Live dynamic advisory synchronized with bidder status, clarification, and anomalies
  const getDynamicAdvisory = () => {
    if (bidder?.clarificationResponse) {
      return {
        status: "CLARIFICATION_SUBMITTED (Review Ready)",
        badgeBg: "#f0fdf4",
        badgeColor: C.emerald,
        summary: "Vendor Clarification Received — PPO 2017 Local Content Justification Provided",
        fullNote: `The bidder submitted official technical clarification on ${bidder.clarificationResponseDate || "recent"} affirming 75% domestic value addition: "${bidder.clarificationResponse}". Supported by verified Chartered Engineer attestation${bidder.clarificationAttachment ? ` (${bidder.clarificationAttachment})` : ""}. Recommended for technical qualification approval.`
      };
    }
    if (bidder?.officerDecision === "CLARIFICATION_REQUESTED") {
      return {
        status: "CLARIFICATION_PENDING",
        badgeBg: "#fffbeb",
        badgeColor: C.amber,
        summary: "Formal Clarification Transmitted to Bidder — Awaiting Vendor Reply",
        fullNote: `Tender Evaluation Committee issued formal query under PPO 2017 Clause 9(a): "${bidder.officerRemarks || "Discrepancy in domestic local content vs imported line items."}". 48-hour statutory response window active in vendor portal.`
      };
    }
    if (bidder?.officerDecision === "QUALIFIED") {
      return {
        status: "QUALIFIED",
        badgeBg: "#f0fdf4",
        badgeColor: C.emerald,
        summary: "Technical Qualification Approved by Competent Authority",
        fullNote: `Bidder certified fully compliant with all technical specifications and statutory mandates for Tender ${bidder.tenderRef || "CPCL/2026/TE/045"}. Cleared for Packet-2 commercial opening.`
      };
    }
    if (bidder?.officerDecision === "REJECTED") {
      return {
        status: "DISQUALIFIED",
        badgeBg: "#fef2f2",
        badgeColor: C.crimson,
        summary: "Disqualification Notice Recorded under GFR 2017 Rules",
        fullNote: `Bidder disqualified by Competent Authority: "${bidder.officerRemarks || "Non-compliant with mandatory technical criteria."}". Non-compliance grounds permanently logged in TEC audit trail.`
      };
    }
    return {
      status: results.aiAdvisory.status,
      badgeBg: results.aiAdvisory.statusBadge === "badge-success" ? "#f0fdf4" : results.aiAdvisory.statusBadge === "badge-danger" ? "#fef2f2" : "#fffbeb",
      badgeColor: results.aiAdvisory.statusBadge === "badge-success" ? C.emerald : results.aiAdvisory.statusBadge === "badge-danger" ? C.crimson : C.amber,
      summary: results.aiAdvisory.summary,
      fullNote: results.aiAdvisory.fullNote
    };
  };

  const dynamicAdvisory = getDynamicAdvisory();

  return (
    <div style={{ maxWidth: 1040, margin: "0 auto", fontFamily: F.sans }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to={`/officer/tenders/${bidder?.tenderId || "CPCL-2026-TE-045"}/bidders`} style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>
          ← Back to Bidders
        </Link>
        {" / "}
        <span style={{ color: C.ink }}>{bidder?.bidderName} AI Results</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: 0, textTransform: "uppercase" }}>
              {bidder?.bidderName || "ABC ENGINEERING LTD"}
            </h1>
            <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 12, fontWeight: 700, fontFamily: F.mono, background: "#eff6ff", color: C.navy }}>
              {bidder?.id || bidderId}
            </span>
          </div>
          <div style={{ fontSize: 13, color: C.inkMuted, marginTop: 4 }}>
            Tender: {bidder?.tenderRef || "CPCL/2026/TE/045"} • Automated Forensic Audit Scorecard
          </div>
        </div>

        {bidder?.officerDecision && (
          <div
            style={{
              background:
                bidder.officerDecision === "QUALIFIED"
                  ? "#ecfdf5"
                  : bidder.officerDecision === "REJECTED"
                  ? "#fef2f2"
                  : bidder.clarificationResponse
                  ? "#f0fdf4"
                  : "#fffbeb",
              border: `2px solid ${
                bidder.officerDecision === "QUALIFIED"
                  ? "#10b981"
                  : bidder.officerDecision === "REJECTED"
                  ? "#ef4444"
                  : bidder.clarificationResponse
                  ? "#10b981"
                  : "#f59e0b"
              }`,
              borderRadius: 8,
              padding: "8px 16px",
              textAlign: "right"
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color:
                  bidder.officerDecision === "QUALIFIED"
                    ? "#065f46"
                    : bidder.officerDecision === "REJECTED"
                    ? "#991b1b"
                    : bidder.clarificationResponse
                    ? "#065f46"
                    : "#92400e",
                textTransform: "uppercase"
              }}
            >
              Officer Final Decision:
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color:
                  bidder.officerDecision === "QUALIFIED"
                    ? "#047857"
                    : bidder.officerDecision === "REJECTED"
                    ? "#dc2626"
                    : bidder.clarificationResponse
                    ? "#047857"
                    : "#d97706"
              }}
            >
              {bidder.officerDecision === "CLARIFICATION_REQUESTED"
                ? bidder.clarificationResponse
                  ? "CLARIFICATION RECEIVED"
                  : "CLARIFICATION SENT"
                : bidder.officerDecision}
            </div>
          </div>
        )}
      </div>

      {/* Main Scorecard Container */}
      <div style={{ background: "#ffffff", borderRadius: 14, border: `1px solid ${C.border}`, padding: 28, boxShadow: S.card, marginBottom: 28 }}>
        {/* Score Top Display */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, paddingBottom: 24, borderBottom: `1px solid ${C.border}`, marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 6,
              background: "#f8fafc",
              border: `2px solid ${C.navy}`,
              borderRadius: 12,
              padding: "16px 24px"
            }}
          >
            <span style={{ fontSize: 44, fontWeight: 900, color: C.navy, fontFamily: F.mono, lineHeight: 1 }}>
              {results.complianceScore}
            </span>
            <span style={{ fontSize: 18, color: C.inkFaint, fontWeight: 600 }}>/ {results.scoreOutOf}</span>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ 
                padding: "4px 12px", 
                borderRadius: 20, 
                fontSize: 12, 
                fontWeight: 800, 
                background: results.riskLevel === "LOW RISK" ? "#f0fdf4" : results.riskLevel === "HIGH RISK" ? "#fef2f2" : "#fffbeb", 
                color: results.riskLevel === "LOW RISK" ? C.emerald : results.riskLevel === "HIGH RISK" ? C.crimson : C.amber, 
                border: `1px solid ${results.riskLevel === "LOW RISK" ? "#bbf7d0" : results.riskLevel === "HIGH RISK" ? "#fecaca" : "#fde68a"}` 
              }}>
                {results.riskLevel === "LOW RISK" ? "✓" : results.riskLevel === "HIGH RISK" ? "✕" : "⚠"} {results.riskLevel}
              </span>
              <span style={{ fontSize: 13, color: C.inkMuted }}>
                AI Model Confidence: <strong style={{ color: C.navy }}>{results.aiConfidence}</strong>
              </span>
            </div>
            <p style={{ fontSize: 12, color: C.inkFaint, margin: "6px 0 0" }}>
              Evaluated against GFR 2017 Rules, MSME Classification, GSTN Filings, and CPPP debarment records.
            </p>
          </div>
        </div>

        {/* Verification Checklist Table */}
        <h3 style={{ fontSize: 14, fontWeight: 800, color: C.navy, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
          AI VERIFICATION RESULTS
        </h3>

        <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              {results.checks.map((chk, idx) => {
                const isSuccess = chk.type === "success";
                const isError = chk.type === "error";
                return (
                  <tr key={idx} style={{ borderBottom: idx === results.checks.length - 1 ? "none" : `1px solid #f1f5f9` }}>
                    <td style={{ padding: "12px 18px", fontWeight: 700, color: C.ink, width: "25%" }}>
                      {chk.parameter}
                    </td>
                    <td style={{ padding: "12px 18px", color: C.inkMuted }}>
                      {chk.details}
                    </td>
                    <td style={{ padding: "12px 18px", textAlign: "right", width: 170 }}>
                      <span
                        style={{
                          padding: "3px 10px",
                          borderRadius: 12,
                          fontSize: 11,
                          fontWeight: 700,
                          background: isSuccess ? "#f0fdf4" : isError ? "#fef2f2" : "#fffbeb",
                          color: isSuccess ? C.emerald : isError ? C.crimson : C.amber,
                          border: `1px solid ${isSuccess ? "#bbf7d0" : isError ? "#fecaca" : "#fde68a"}`
                        }}
                      >
                        {chk.icon} {chk.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Anomalies Box (Warning or Success) */}
        {results.anomaliesCount === 0 ? (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 18, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#166534", fontWeight: 800, fontSize: 14 }}>
              <span>✓</span>
              <span>0 ANOMALIES FOUND — 100% REGULATORY & STATUTORY INTEGRITY</span>
            </div>
            <p style={{ margin: "6px 0 0", fontSize: 12.5, color: "#15803d", lineHeight: 1.5 }}>
              All submitted registration numbers, statutory filings, and financial metrics verified flawlessly against official government portals with zero contradictions detected.
            </p>
          </div>
        ) : (
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: 18, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#9a3412", fontWeight: 800, fontSize: 14, marginBottom: 10 }}>
              <span>⚠</span>
              <span>{results.anomaliesCount} {results.anomaliesCount === 1 ? "ANOMALY FOUND" : "ANOMALIES FOUND"}</span>
            </div>

            <ol style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {results.anomalies.map((ano, idx) => (
                <li key={ano.id} style={{ fontSize: 13, color: "#431407", lineHeight: 1.5 }}>
                  <div style={{ fontWeight: 800, color: "#7c2d12" }}>
                    #{idx + 1}: {ano.title}
                  </div>
                  <div style={{ margin: "2px 0 6px", color: "#431407" }}>
                    {ano.description}
                  </div>
                  <Link
                    to={`/officer/bidders/${bidder?.id || bidderId}/evidence?error=${idx}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: C.navy,
                      textDecoration: "none",
                      background: "#ffffff",
                      padding: "3px 10px",
                      borderRadius: 6,
                      border: `1px solid #fed7aa`,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                    }}
                  >
                    <span>🔍</span> Inspect Live Evidence Proof (Flaw #{idx + 1}) →
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* AI Advisory */}
        <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>🤖</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.navy, letterSpacing: "0.06em", textTransform: "uppercase" }}>AI ADVISORY</span>
            <span style={{ 
              padding: "2px 8px", 
              borderRadius: 4, 
              fontSize: 11, 
              fontWeight: 700, 
              background: dynamicAdvisory.badgeBg, 
              color: dynamicAdvisory.badgeColor 
            }}>
              {dynamicAdvisory.status}
            </span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
            {dynamicAdvisory.summary}
          </div>
          <div style={{ fontSize: 12, color: C.inkMuted, lineHeight: 1.6, background: "#ffffff", padding: 12, borderRadius: 6, border: `1px solid ${C.border}` }}>
            {dynamicAdvisory.fullNote}
          </div>
        </div>

        {/* Evidence Link Buttons */}
        <div style={{ display: "flex", gap: 14, marginBottom: 32, flexWrap: "wrap" }}>
          <Link
            to={`/officer/bidders/${bidder?.id || bidderId}/evidence`}
            style={{
              padding: "12px 24px",
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(11, 61, 145, 0.25)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8
            }}
          >
            <span>🔍</span> VIEW ALL FORENSIC EVIDENCE ({results.anomaliesCount === 0 ? "0 ANOMALIES" : `${results.anomaliesCount} ${results.anomaliesCount === 1 ? "ANOMALY" : "ANOMALIES"} DETECTED`}) →
          </Link>
          <Link
            to={`/officer/bidders/${bidder?.id || bidderId}/documents`}
            style={{
              padding: "11px 22px",
              borderRadius: 8,
              background: "#ffffff",
              border: `1.5px solid ${C.border}`,
              color: C.ink,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            📄 VIEW DOCUMENTS
          </Link>
        </div>

        {/* Officer Final Decision & Live Clarification Lifecycle */}
        {!bidder?.officerDecision ? (
          <div
            style={{
              padding: 20,
              background: "#f1f5f9",
              borderRadius: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>
                Officer Final Decision:
              </div>
              <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>
                AI is strictly advisory. The Competent Authority holds sole decision-making jurisdiction under GFR 2017.
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => setDecisionModalType("QUALIFY")}
                style={{
                  padding: "10px 20px",
                  borderRadius: 6,
                  border: "none",
                  background: C.emerald,
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(5, 150, 105, 0.3)"
                }}
              >
                QUALIFY
              </button>
              <button
                onClick={() => setDecisionModalType("REJECT")}
                style={{
                  padding: "10px 20px",
                  borderRadius: 6,
                  border: "none",
                  background: C.crimson,
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(220, 38, 38, 0.3)"
                }}
              >
                REJECT
              </button>
              <button
                onClick={() => setDecisionModalType("SEND_CLARIFICATION")}
                style={{
                  padding: "10px 20px",
                  borderRadius: 6,
                  border: "none",
                  background: C.amber,
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(217, 119, 6, 0.3)"
                }}
              >
                SEND CLARIFICATION
              </button>
            </div>
          </div>
        ) : bidder.officerDecision === "CLARIFICATION_REQUESTED" ? (
          <div
            style={{
              padding: 22,
              background: bidder.clarificationResponse ? "#f0fdf4" : "#fffbeb",
              border: `1.5px solid ${bidder.clarificationResponse ? "#86efac" : "#fde68a"}`,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{bidder.clarificationResponse ? "📩" : "⏳"}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: bidder.clarificationResponse ? "#166534" : "#92400e", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    OFFICER CLARIFICATION LIFECYCLE
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      background: bidder.clarificationResponse ? "#dcfce7" : "#fef3c7",
                      color: bidder.clarificationResponse ? "#15803d" : "#b45309"
                    }}
                  >
                    {bidder.clarificationResponse ? "REPLY RECEIVED — ACTION REQUIRED" : "AWAITING VENDOR REPLY"}
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: C.inkMuted, marginTop: 4 }}>
                  Dispatched on {bidder.officerDecisionDate || "Today"} • Signed DSC: <span style={{ fontFamily: F.mono, fontWeight: 600 }}>{bidder.officerDscToken || "DSC-88219-AUTH"}</span> • Audit Trail Ref: <span style={{ fontFamily: F.mono, fontWeight: 600 }}>{bidder.officerAuditRef || "AUDIT-TEC-9021"}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => bidder && bidderService.resetOfficerDecision(bidder.id)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 6,
                    border: `1px solid ${C.border}`,
                    background: "#ffffff",
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.inkMuted,
                    cursor: "pointer"
                  }}
                  title="Reset to re-evaluate decision"
                >
                  ↺ Reset Decision
                </button>
              </div>
            </div>

            {/* Officer Query Box */}
            <div style={{ background: "#ffffff", border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>
                Transmitted TEC Clarification Query (PPO 2017 Clause 9(a)):
              </div>
              <div style={{ fontSize: 13, color: C.ink, fontWeight: 600 }}>
                "{bidder.officerRemarks || "Discrepancy in Make in India local content vs imported technical items."}"
              </div>
            </div>

            {/* Vendor Clarification Response Box if present */}
            {bidder.clarificationResponse ? (
              <div style={{ background: "#ffffff", border: `1.5px solid #86efac`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#166534" }}>
                    ✓ Bidder Technical Clarification Submitted ({bidder.clarificationResponseDate || "Recent"}):
                  </div>
                  {bidder.clarificationAttachment && (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: C.navy, background: "#f1f5f9", padding: "3px 10px", borderRadius: 4 }}>
                      <span>📎</span> {bidder.clarificationAttachment}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.6, background: "#f8fafc", padding: 12, borderRadius: 6, border: `1px solid #e2e8f0`, marginBottom: 14 }}>
                  "{bidder.clarificationResponse}"
                </div>

                {/* RE-RUN AI VERIFICATION — key sync action after clarification */}
                <div style={{
                  background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
                  border: "1.5px solid #93c5fd",
                  borderRadius: 10,
                  padding: "16px 20px",
                  marginBottom: 14,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: C.navy }}>Re-run AI Verification with Clarification</div>
                    <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>
                      Run a fresh AI forensic analysis that incorporates the bidder's technical response and updates the compliance scorecard.
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/officer/bidders/${bidder.id}/verification`)}
                    style={{
                      padding: "11px 22px",
                      borderRadius: 8,
                      border: "none",
                      background: `linear-gradient(135deg, ${C.navy}, #1e40af)`,
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: 13,
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(11,61,145,0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}
                  >
                    <span>✨</span> Re-run AI Verification
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingTop: 10, borderTop: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: C.inkMuted }}>
                    Or issue a direct committee verdict without re-running AI:
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      onClick={() => setDecisionModalType("QUALIFY")}
                      style={{
                        padding: "9px 18px",
                        borderRadius: 6,
                        border: "none",
                        background: C.emerald,
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: 12.5,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(5, 150, 105, 0.3)"
                      }}
                    >
                      ✓ Accept Clarification & Qualify
                    </button>
                    <button
                      onClick={() => setDecisionModalType("REJECT")}
                      style={{
                        padding: "9px 18px",
                        borderRadius: 6,
                        border: "none",
                        background: C.crimson,
                        color: "#ffffff",
                        fontWeight: 700,
                        fontSize: 12.5,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(220, 38, 38, 0.3)"
                      }}
                    >
                      ✕ Reject Bidder
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#ffffff", border: `1px solid #fde68a`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
                  <span style={{ fontSize: 18 }}>⏱</span>
                  <div style={{ flex: 1, fontSize: 12.5, color: "#92400e" }}>
                    <strong>Live Vendor Portal Sync Active:</strong> Notice sent to {bidder.email}. Statutory 48-hour clarification window is counting down. Bidder has not submitted response yet.
                  </div>
                  <button
                    onClick={() => {
                      if (bidder) {
                        bidderService.submitClarificationResponse(
                          bidder.id,
                          "Regarding Item 14.2 actuator pump assembly: While the raw casting is German sourced, all precision CNC machining, motor integration, impeller fabrication, and final FAT pressure testing are executed at our Tiruvallur facility. Total domestic value addition is audited at 75.4% per attached Chartered Engineer certificate.",
                          "Chartered_Engineer_Attestation_MII.pdf"
                        );
                      }
                    }}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 6,
                      border: `1.5px solid #d97706`,
                      background: "#fffbeb",
                      color: "#b45309",
                      fontWeight: 700,
                      fontSize: 11.5,
                      cursor: "pointer"
                    }}
                    title="Simulate receiving vendor's technical response"
                  >
                    📥 Receive Vendor Response (Test Live Flow)
                  </button>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                  <button
                    onClick={() => setDecisionModalType("QUALIFY")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: `1px solid ${C.emerald}`,
                      background: "#ffffff",
                      color: C.emerald,
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer"
                    }}
                  >
                    Override & Qualify
                  </button>
                  <button
                    onClick={() => setDecisionModalType("REJECT")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: `1px solid ${C.crimson}`,
                      background: "#ffffff",
                      color: C.crimson,
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer"
                    }}
                  >
                    Reject Now
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : bidder.officerDecision === "QUALIFIED" ? (
          <div
            style={{
              padding: 22,
              background: "#f0fdf4",
              border: "1.5px solid #86efac",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18, color: C.emerald }}>✓</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#166534" }}>
                    BIDDER OFFICIALLY QUALIFIED BY OFFICER
                  </span>
                  <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, background: "#dcfce7", color: "#15803d" }}>
                    CLEARED FOR COMMERCIAL BID OPENING
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: C.inkMuted, marginTop: 4 }}>
                  Certified on {bidder.officerDecisionDate || "Recent"} • DSC Token: <span style={{ fontFamily: F.mono, fontWeight: 600 }}>{bidder.officerDscToken || "DSC-88219-AUTH"}</span> • Audit Trail: <span style={{ fontFamily: F.mono, fontWeight: 600 }}>{bidder.officerAuditRef || "AUDIT-TEC-9021"}</span>
                </div>
              </div>

              <button
                onClick={() => bidder && bidderService.resetOfficerDecision(bidder.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  background: "#ffffff",
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: C.inkMuted,
                  cursor: "pointer"
                }}
              >
                ↺ Re-evaluate Decision
              </button>
            </div>

            <div style={{ background: "#ffffff", border: `1px solid #bbf7d0`, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#166534", textTransform: "uppercase", marginBottom: 4 }}>
                Official Committee Endorsement Remarks:
              </div>
              <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>
                "{bidder.officerRemarks || "Verified statutory records, tax compliance, and capabilities. Qualification confirmed."}"
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: 22,
              background: "#fef2f2",
              border: "1.5px solid #fca5a5",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18, color: C.crimson }}>✕</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#991b1b" }}>
                    BIDDER DISQUALIFIED BY OFFICER
                  </span>
                  <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, background: "#fee2e2", color: "#b91c1c" }}>
                    DISQUALIFIED UNDER GFR 2017 RULES
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: C.inkMuted, marginTop: 4 }}>
                  Recorded on {bidder.officerDecisionDate || "Recent"} • DSC Token: <span style={{ fontFamily: F.mono, fontWeight: 600 }}>{bidder.officerDscToken || "DSC-88219-AUTH"}</span> • Audit Trail: <span style={{ fontFamily: F.mono, fontWeight: 600 }}>{bidder.officerAuditRef || "AUDIT-TEC-9021"}</span>
                </div>
              </div>

              <button
                onClick={() => bidder && bidderService.resetOfficerDecision(bidder.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  background: "#ffffff",
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: C.inkMuted,
                  cursor: "pointer"
                }}
              >
                ↺ Re-evaluate Decision
              </button>
            </div>

            <div style={{ background: "#ffffff", border: `1px solid #fecaca`, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#991b1b", textTransform: "uppercase", marginBottom: 4 }}>
                Official Disqualification Grounds:
              </div>
              <div style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>
                "{bidder.officerRemarks || "Material contradiction identified failing mandatory tender criteria."}"
              </div>
            </div>
          </div>
        )}
      </div>

      {decisionModalType && bidder && (
        <OfficerDecisionModal
          bidder={bidder}
          decisionType={decisionModalType}
          onClose={() => setDecisionModalType(null)}
          onSuccess={updated => setBidder(updated)}
        />
      )}
    </div>
  );
};

export default OfficerAiResults;
