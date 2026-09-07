import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { tenderService } from "../../services/tenderService";
import { Tender } from "../../data/tenders";
import { C, F, S } from "../../tokens";

export const OfficerDashboard: React.FC = () => {
  const { user } = useApp();
  const [tenders, setTenders] = useState<Tender[]>([]);

  useEffect(() => {
    tenderService.getAllTenders().then(setTenders);
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", fontFamily: F.sans }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.navyDark} 0%, #0f2b5c 100%)`,
          borderRadius: 14,
          padding: "24px 32px",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          boxShadow: S.card
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#93c5fd", textTransform: "uppercase" }}>
            Tender Evaluation Committee Console
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "4px 0 6px" }}>
            Procurement Officer Dashboard
          </h2>
          <div style={{ fontSize: 13, color: "#cbd5e1" }}>
            Logged in as: <strong>{user?.name || "Dr. K. S. Ramanathan"}</strong> ({user?.roleTitle || "Chief Procurement Officer"})
          </div>
        </div>
        <div style={{ background: "rgba(255, 255, 255, 0.1)", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>
          🏢 CPCL Central TEC Unit
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 32 }}>
        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: S.card }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>ACTIVE</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.navy, margin: "6px 0 2px" }}>08</div>
          <div style={{ fontSize: 12, color: C.inkMuted }}>Live published tenders</div>
        </div>

        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: S.card }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>PENDING</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.amber, margin: "6px 0 2px" }}>24</div>
          <div style={{ fontSize: 12, color: C.inkMuted }}>Submissions awaiting technical review</div>
        </div>

        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: S.card }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>COMPLETED</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.emerald, margin: "6px 0 2px" }}>41</div>
          <div style={{ fontSize: 12, color: C.inkMuted }}>Awarded / finalized contracts</div>
        </div>
      </div>

      {/* Tenders Section Header */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: C.ink, margin: 0 }}>Tenders Awaiting Evaluation</h3>
        <p style={{ fontSize: 13, color: C.inkMuted, margin: "2px 0 0" }}>Select a tender to inspect bidder submissions and proceed with evaluation</p>
      </div>

      {/* Tender Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {tenders.map(t => (
          <div
            key={t.id}
            style={{
              background: "#ffffff",
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              borderLeft: t.id === "CPCL-2026-TE-045" ? `5px solid ${C.navy}` : `1px solid ${C.border}`,
              padding: "20px 24px",
              boxShadow: S.card
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 700, color: C.navy }}>{t.referenceNumber}</span>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: C.ink, margin: "4px 0 0" }}>{t.title}</h4>
              </div>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  background: t.officerStatus === "Awaiting Evaluation" ? "#fffbeb" : "#f0fdf4",
                  color: t.officerStatus === "Awaiting Evaluation" ? C.amber : C.emerald
                }}
              >
                {t.officerStatus}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: "12px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 11, color: C.inkFaint }}>Total Bidders:</span>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.navy }}>{t.biddersCount}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: C.inkFaint }}>Documents:</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: F.mono }}>{t.documentsCount.toLocaleString()}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: C.inkFaint }}>Status:</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.emerald }}>{t.status}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: C.inkFaint }}>Closing Date:</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{t.closingDate}</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: C.inkFaint }}>
                High-priority PSU procurement under Make-in-India PPO Guidelines.
              </span>
              <Link
                to={`/officer/tenders/${t.id}/bidders`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "9px 20px",
                  borderRadius: 6,
                  background: C.navy,
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 4px rgba(11,61,145,0.2)",
                  transition: "all 0.15s ease"
                }}
              >
                <span>OPEN EVALUATION</span>
                <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerDashboard;
