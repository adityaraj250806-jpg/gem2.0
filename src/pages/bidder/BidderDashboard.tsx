import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { tenderService } from "../../services/tenderService";
import { Tender } from "../../data/tenders";
import { C, F, S } from "../../tokens";

export const BidderDashboard: React.FC = () => {
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
          background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
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
            Bidder Enterprise Workspace
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: "4px 0 6px" }}>
            Welcome, {user?.name || "ABC Engineering Ltd"}
          </h2>
          <div style={{ fontSize: 13, color: "#cbd5e1" }}>
            Vendor ID: <span style={{ fontFamily: F.mono, color: "#ffffff" }}>VEND-984210</span> • Class-I Local Supplier (MII Certified)
          </div>
        </div>
        <Link
          to="/bidder/tenders"
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            background: `linear-gradient(135deg, ${C.teal}, ${C.tealLight})`,
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(8, 145, 178, 0.3)"
          }}
        >
          🔍 Explore All Tenders
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 32 }}>
        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: S.card }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>Active Tenders</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.navy, margin: "6px 0 2px" }}>12</div>
          <div style={{ fontSize: 12, color: C.inkMuted }}>Open for public participation</div>
        </div>

        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: S.card }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>My Submissions</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.emerald, margin: "6px 0 2px" }}>04</div>
          <div style={{ fontSize: 12, color: C.inkMuted }}>Bids submitted & under technical review</div>
        </div>

        <div style={{ background: "#ffffff", padding: 20, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: S.card }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase" }}>EMD Held in Escrow</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.ink, margin: "6px 0 2px" }}>₹35.5 L</div>
          <div style={{ fontSize: 12, color: C.inkMuted }}>Fully secured in PSU trust escrow</div>
        </div>
      </div>

      {/* Available Tenders Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: C.ink, margin: 0 }}>Available Tenders</h3>
          <p style={{ fontSize: 13, color: C.inkMuted, margin: "2px 0 0" }}>Verified public procurement notices published on GeM</p>
        </div>
        <Link to="/bidder/tenders" style={{ fontSize: 13, fontWeight: 700, color: C.navy, textDecoration: "none" }}>
          View All Notices →
        </Link>
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
              padding: "20px 24px",
              boxShadow: S.card,
              transition: "transform 0.15s, box-shadow 0.15s"
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
                  background: "#f0f9ff",
                  color: C.teal,
                  border: "1px solid #bae6fd"
                }}
              >
                {t.category}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: "12px 0", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div>
                <span style={{ fontSize: 11, color: C.inkFaint }}>Department:</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{t.department}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: C.inkFaint }}>Closing Date:</span>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.crimson }}>📅 {t.closingDate}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: C.inkFaint }}>EMD Amount:</span>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{t.emdAmount}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, color: C.inkFaint }}>Tender Type:</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{t.tenderType}</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: C.inkFaint }}>
                Published under Public Procurement (Preference to Make in India) Policy
              </span>
              <Link
                to={`/bidder/tenders/${t.id}`}
                style={{
                  padding: "8px 18px",
                  borderRadius: 6,
                  background: C.navy,
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: "0.03em"
                }}
              >
                VIEW TENDER →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidderDashboard;
