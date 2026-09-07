import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { verificationService } from "../../services/verificationService";
import { bidderService } from "../../services/bidderService";
import { OfficerDecisionModal } from "../../components/modals/OfficerDecisionModal";
import { Bidder } from "../../data/bidders";
import { VerificationResult } from "../../data/verificationResults";
import { C, F, S } from "../../tokens";

export const OfficerAiResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bidderId = id || "BID-001";

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
  }, [bidderId]);

  if (!results) {
    return <div style={{ padding: 40, textAlign: "center", color: C.inkFaint }}>Loading scorecard results...</div>;
  }

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
          <div style={{ background: "#ecfdf5", border: "2px solid #10b981", borderRadius: 8, padding: "8px 16px", textAlign: "right" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#065f46", textTransform: "uppercase" }}>
              Officer Final Decision:
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#047857" }}>
              {bidder.officerDecision}
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
              <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 800, background: "#f0fdf4", color: C.emerald, border: "1px solid #bbf7d0" }}>
                ✓ {results.riskLevel}
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
              {results.checks.map((chk, idx) => (
                <tr key={idx} style={{ borderBottom: idx === results.checks.length - 1 ? "none" : `1px solid #f1f5f9` }}>
                  <td style={{ padding: "12px 18px", fontWeight: 700, color: C.ink, width: "25%" }}>
                    {chk.parameter}
                  </td>
                  <td style={{ padding: "12px 18px", color: C.inkMuted }}>
                    {chk.details}
                  </td>
                  <td style={{ padding: "12px 18px", textAlign: "right", width: 140 }}>
                    <span
                      style={{
                        padding: "3px 10px",
                        borderRadius: 12,
                        fontSize: 11,
                        fontWeight: 700,
                        background: chk.type === "success" ? "#f0fdf4" : "#fffbeb",
                        color: chk.type === "success" ? C.emerald : C.amber,
                        border: `1px solid ${chk.type === "success" ? "#bbf7d0" : "#fde68a"}`
                      }}
                    >
                      {chk.icon} {chk.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Anomalies Warning Box */}
        <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 10, padding: 18, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#9a3412", fontWeight: 800, fontSize: 14, marginBottom: 10 }}>
            <span>⚠</span>
            <span>{results.anomaliesCount} ANOMALIES FOUND</span>
          </div>

          <ol style={{ paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {results.anomalies.map(ano => (
              <li key={ano.id} style={{ fontSize: 13, color: "#431407", lineHeight: 1.5 }}>
                <strong>{ano.title}:</strong> {ano.description}
              </li>
            ))}
          </ol>
        </div>

        {/* AI Advisory */}
        <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 16 }}>🤖</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: C.navy, letterSpacing: "0.06em", textTransform: "uppercase" }}>AI ADVISORY</span>
            <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, background: "#fffbeb", color: C.amber }}>
              {results.aiAdvisory.status}
            </span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
            {results.aiAdvisory.summary}
          </div>
          <div style={{ fontSize: 12, color: C.inkMuted, lineHeight: 1.6, background: "#ffffff", padding: 12, borderRadius: 6, border: `1px solid ${C.border}` }}>
            {results.aiAdvisory.fullNote}
          </div>
        </div>

        {/* Evidence Link Buttons */}
        <div style={{ display: "flex", gap: 14, marginBottom: 32 }}>
          <Link
            to={`/officer/bidders/${bidder?.id || bidderId}/evidence`}
            style={{
              padding: "11px 22px",
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(11, 61, 145, 0.25)"
            }}
          >
            🔍 VIEW EVIDENCE →
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

        {/* Officer Final Decision Bar */}
        <div
          style={{
            padding: 20,
            background: "#f1f5f9",
            borderRadius: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>
              Officer Final Decision:
            </div>
            <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>
              AI is strictly advisory. The Competent Authority holds sole decision-making jurisdiction.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
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
