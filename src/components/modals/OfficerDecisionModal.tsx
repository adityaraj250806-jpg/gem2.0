import React, { useState } from "react";
import { Bidder } from "../../data/bidders";
import { verificationService } from "../../services/verificationService";
import { useApp } from "../../context/AppContext";
import { C, F } from "../../tokens";

interface OfficerDecisionModalProps {
  bidder: Bidder;
  decisionType: "QUALIFY" | "REJECT" | "SEND_CLARIFICATION";
  onClose: () => void;
  onSuccess: (updatedBidder: Bidder) => void;
}

export const OfficerDecisionModal: React.FC<OfficerDecisionModalProps> = ({
  bidder,
  decisionType,
  onClose,
  onSuccess
}) => {
  const { showToast } = useApp();

  const decisionTitles = {
    QUALIFY: "Technical Qualification Approval",
    REJECT: "Disqualification Notice",
    SEND_CLARIFICATION: "Request for Technical Clarification"
  };

  const defaultRemarks = {
    QUALIFY: bidder?.clarificationResponse
      ? "Technical clarification accepted. Verified 75% domestic value addition via Chartered Engineer certificate. Qualification approved for commercial opening."
      : "Verified statutory records, tax compliance, and factory capabilities. Qualification confirmed subject to PPO audit submission.",
    REJECT: bidder?.clarificationResponse
      ? "Submitted technical clarification fails to resolve Make in India local content discrepancy for Line Item 14.2. Disqualification confirmed."
      : "Material contradiction identified in Make in India local content computation fails minimum Class-I threshold requirements.",
    SEND_CLARIFICATION: "Clarification requested under PPO 2017 Clause 9(a) regarding origin of Line Item 14.2 actuator pump assembly versus 75% local content declaration."
  };

  const [remarks, setRemarks] = useState(defaultRemarks[decisionType] || "");
  const [pin, setPin] = useState("1234");
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    setSubmitting(true);
    const finalDecision = decisionType === "QUALIFY" ? "QUALIFIED" :
                          decisionType === "REJECT" ? "REJECTED" : "CLARIFICATION_REQUESTED";

    const res = await verificationService.recordDecision(bidder.id, finalDecision, remarks);
    setSubmitting(false);

    if (res.success && res.bidder) {
      showToast(`Decision recorded: Bidder is ${finalDecision}`, "success");
      onSuccess(res.bidder);
      onClose();
    } else {
      showToast(res.error || "Failed to record decision", "danger");
    }
  };

  const isReject = decisionType === "REJECT";
  const isQualify = decisionType === "QUALIFY";
  const themeColor = isReject ? C.crimson : isQualify ? C.emerald : C.amber;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: F.sans
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 580,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc"
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 800, color: C.ink }}>
            ⚖️ {decisionTitles[decisionType]}
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 20,
              color: C.inkMuted,
              cursor: "pointer",
              padding: 4
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Dual badge banner */}
          <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
              <span style={{ fontWeight: 700, color: C.inkFaint }}>AI SYSTEM ADVISORY:</span>
              <span style={{ fontWeight: 700, color: C.amber, background: "#fffbeb", padding: "2px 8px", borderRadius: 4 }}>
                CONDITIONAL (Review Recommended)
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: `1px dashed ${C.border}` }}>
              <span style={{ fontWeight: 700, color: C.navy, fontSize: 12 }}>OFFICER DECISION TO RECORD:</span>
              <span style={{ fontWeight: 800, color: "#ffffff", background: themeColor, padding: "3px 10px", borderRadius: 4, fontSize: 12 }}>
                {decisionType.replace("_", " ")}
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase", marginBottom: 4 }}>
              Bidder & Tender
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>
              {bidder.bidderName} ({bidder.id})
            </div>
            <div style={{ fontSize: 12, color: C.inkMuted }}>
              Tender: {bidder.tenderRef || "CPCL/2026/TE/045"}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
              Official Evaluation Remarks / Statutory Justification:
            </label>
            <textarea
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1.5px solid ${C.border}`,
                borderRadius: 8,
                fontSize: 13,
                fontFamily: F.sans,
                color: C.ink,
                resize: "vertical",
                boxSizing: "border-box"
              }}
            />
            <div style={{ fontSize: 11, color: C.inkFaint, marginTop: 4 }}>
              These remarks will be permanently recorded in the GeM Tender Evaluation Committee (TEC) audit trail.
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
              Digital Signature Verification PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="Enter PIN"
              maxLength={6}
              style={{
                width: 140,
                padding: "8px 12px",
                border: `1.5px solid ${C.border}`,
                borderRadius: 6,
                fontSize: 14,
                fontFamily: F.mono,
                boxSizing: "border-box"
              }}
            />
            <div style={{ fontSize: 11, color: C.inkFaint, marginTop: 4 }}>
              NIC DSC Token: Registered to Dr. K. S. Ramanathan (CPO)
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            background: "#f8fafc"
          }}
        >
          <button
            onClick={onClose}
            disabled={submitting}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              background: "#ffffff",
              color: C.ink,
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={submitting}
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              border: "none",
              background: themeColor,
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: `0 2px 8px ${themeColor}50`
            }}
          >
            {submitting ? "Recording..." : "Confirm & Record Final Decision"}
          </button>
        </div>
      </div>
    </div>
  );
};
