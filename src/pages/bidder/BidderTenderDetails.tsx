import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { tenderService } from "../../services/tenderService";
import { Tender } from "../../data/tenders";
import { C, F, S } from "../../tokens";

export const BidderTenderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tender, setTender] = useState<Tender | null>(null);

  useEffect(() => {
    tenderService.getTenderById(id || "CPCL-2026-TE-045").then(res => {
      if (res) setTender(res);
      else tenderService.getAllTenders().then(list => setTender(list[0]));
    });
  }, [id]);

  if (!tender) {
    return <div style={{ padding: 40, textAlign: "center", color: C.inkFaint }}>Loading tender specifications...</div>;
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", fontFamily: F.sans }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to="/bidder/tenders" style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>← Back to Tenders</Link>
        {" / "}
        <span style={{ color: C.ink }}>{tender.referenceNumber}</span>
      </div>

      <div style={{ background: "#ffffff", borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card }}>
        {/* Header */}
        <div style={{ padding: "28px 32px", borderBottom: `1px solid ${C.border}`, background: "#f8fafc" }}>
          <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 6 }}>
            {tender.referenceNumber}
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 8px" }}>{tender.title}</h1>
          <div style={{ fontSize: 13, color: C.inkMuted }}>
            {tender.department} • Ref ID: <span style={{ fontFamily: F.mono }}>{tender.id}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "32px" }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: C.navy, borderBottom: `2px solid ${C.border}`, paddingBottom: 8, marginBottom: 20 }}>
            Tender Information
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 32 }}>
            <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Issuing Authority</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 4 }}>{tender.issuingAuthority}</div>
            </div>

            <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Tender Type</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 4 }}>{tender.tenderType}</div>
            </div>

            <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Closing Date</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.crimson, marginTop: 4 }}>📅 {tender.closingDate}</div>
            </div>

            <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Earnest Money Deposit (EMD)</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.emerald, marginTop: 4 }}>{tender.emdAmount}</div>
            </div>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 800, color: C.navy, borderBottom: `2px solid ${C.border}`, paddingBottom: 8, marginBottom: 20 }}>
            Eligibility Criteria
          </h3>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 10 }}>
            {tender.eligibilityCriteria.map((crit, idx) => (
              <li key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 13, color: C.ink, lineHeight: 1.5 }}>
                <span style={{ color: C.emerald, fontWeight: 800, fontSize: 16, marginTop: -2 }}>✓</span>
                <span>{crit}</span>
              </li>
            ))}
          </ul>

          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: 18, marginBottom: 36 }}>
            <div style={{ fontWeight: 800, color: C.navy, fontSize: 13, marginBottom: 6 }}>
              📌 Critical Bidder Submission Guidelines
            </div>
            <p style={{ fontSize: 13, color: "#1e3a8a", margin: 0, lineHeight: 1.5 }}>
              All participating bidders must submit complete statutory documentation, including valid GST registration, MSME/Udyam certificates, and signed Make-in-India declarations. All documents will be reviewed strictly by the Competent Procurement Authority.
            </p>
          </div>

          <div style={{ textAlign: "center", borderTop: `1px solid ${C.border}`, paddingTop: 28 }}>
            <Link
              to={`/bidder/tenders/${tender.id}/documents`}
              style={{
                display: "inline-block",
                padding: "14px 44px",
                borderRadius: 8,
                background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
                color: "#ffffff",
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
                letterSpacing: "0.04em",
                boxShadow: `0 4px 16px ${C.navy}40`
              }}
            >
              PARTICIPATE IN BID →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidderTenderDetails;
