import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verificationService, VERIFICATION_STAGES, VerificationProgress } from "../../services/verificationService";
import { bidderService } from "../../services/bidderService";
import { Bidder } from "../../data/bidders";
import { C, F, S } from "../../tokens";

export const OfficerAiProcessing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bidderId = id || "BID-001";
  const navigate = useNavigate();

  const [bidder, setBidder] = useState<Bidder | null>(null);
  const [progress, setProgress] = useState<VerificationProgress>({
    stageIndex: 0,
    currentStage: VERIFICATION_STAGES[0],
    percent: 0,
    completedStages: [],
    isComplete: false
  });

  useEffect(() => {
    bidderService.getBidderById(bidderId).then(b => {
      if (b) setBidder(b);
      else bidderService.getBiddersByTender("CPCL-2026-TE-045").then(list => setBidder(list[0]));
    });

    verificationService.runVerification(bidderId, p => {
      setProgress(p);
      if (p.isComplete) {
        setTimeout(() => {
          navigate(`/officer/bidders/${bidderId}/results`);
        }, 600);
      }
    });
  }, [bidderId, navigate]);

  return (
    <div style={{ maxWidth: 720, margin: "20px auto", fontFamily: F.sans, textAlign: "center" }}>
      <div style={{ background: "#ffffff", borderRadius: 16, border: `1px solid ${C.border}`, padding: "36px 40px", boxShadow: S.card }}>
        <div style={{ fontSize: 11, letterSpacing: "0.08em", color: C.inkFaint, fontWeight: 700, textTransform: "uppercase" }}>
          Automated Forensic Evaluation
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: "6px 0 16px" }}>
          AI VERIFICATION IN PROGRESS
        </h2>

        {/* Target Bidder Box */}
        <div style={{ background: "#f8fafc", padding: "14px", borderRadius: 8, border: `1px solid ${C.border}`, marginBottom: 28 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.navy }}>
            {bidder?.bidderName || "ABC ENGINEERING LTD"}
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>
            {bidder?.id || bidderId} • Tender: CPCL/2026/TE/045
          </div>
        </div>

        {/* Gauge Box */}
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: `6px solid #e2e8f0`,
            borderTopColor: C.navy,
            borderRightColor: progress.percent > 25 ? C.navy : "#e2e8f0",
            borderBottomColor: progress.percent > 50 ? C.navy : "#e2e8f0",
            borderLeftColor: progress.percent > 75 ? C.navy : "#e2e8f0",
            margin: "0 auto 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 800,
            fontFamily: F.mono,
            color: C.navy,
            transition: "all 0.3s ease"
          }}
        >
          {progress.percent}%
        </div>

        {/* Stages Checklist */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, textAlign: "left", marginBottom: 28 }}>
          {VERIFICATION_STAGES.map((s, idx) => {
            const isCompleted = idx < progress.stageIndex;
            const isActive = idx === progress.stageIndex;

            return (
              <div
                key={s.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: isActive ? "#eff6ff" : isCompleted ? "#f0fdf4" : "#f8fafc",
                  border: `1px solid ${isActive ? "#bfdbfe" : isCompleted ? "#bbf7d0" : C.border}`
                }}
              >
                <span
                  style={{
                    color: isCompleted ? C.emerald : isActive ? C.navy : C.inkFaint,
                    fontWeight: 800,
                    fontSize: 14
                  }}
                >
                  {isCompleted ? "✓" : isActive ? "◉" : "○"}
                </span>
                <span style={{ fontSize: 12, fontWeight: isActive ? 700 : 500, color: C.ink }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 13, color: progress.isComplete ? C.emerald : C.inkMuted, fontWeight: 600 }}>
          {progress.isComplete ? (
            "✓ Verification Complete. Redirecting to Scorecard..."
          ) : (
            `Verifying ${progress.currentStage.label}... Please wait...`
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficerAiProcessing;
