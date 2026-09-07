import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { tenderService } from "../../services/tenderService";
import { Tender, NoticeDetails, getTenderNotice } from "../../data/tenders";
import { OfficialNoticeModal } from "../../components/modals/OfficialNoticeModal";
import { C, F, S } from "../../tokens";

export const BidderTenderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tender, setTender] = useState<Tender | null>(null);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [activeReqTab, setActiveReqTab] = useState<"ALL" | "TECH" | "PQC" | "STATUTORY">("ALL");

  useEffect(() => {
    tenderService.getTenderById(id || "CPCL-2026-TE-045").then(res => {
      if (res) setTender(res);
      else tenderService.getAllTenders().then(list => setTender(list[0]));
    });
  }, [id]);

  if (!tender) {
    return <div style={{ padding: 40, textAlign: "center", color: C.inkFaint }}>Loading tender specifications...</div>;
  }

  const notice: NoticeDetails = getTenderNotice(tender);

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", fontFamily: F.sans, paddingBottom: 48 }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to="/bidder/tenders" style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>← Back to Tenders</Link>
        {" / "}
        <span style={{ color: C.ink, fontWeight: 700 }}>{tender.referenceNumber}</span>
      </div>

      {/* ── 1. COMPREHENSIVE TENDER INFORMATION (EXTRACTED FROM OFFICIAL NIT) ── */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          marginBottom: 32,
          boxShadow: S.card,
          overflow: "hidden"
        }}
      >
        {/* Top Official Banner with View/Download Links */}
        <div
          style={{
            background: "linear-gradient(135deg, #071f52 0%, #0b3d91 100%)",
            color: "#ffffff",
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>🏛️</span>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                भारत सरकार • Government of India • Ministry of Petroleum & Natural Gas
              </div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>
                {tender.department} • Official Sovereign Procurement Notice
              </div>
            </div>
          </div>

          {/* Official Document Action Links */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              id="download-official-notice-btn"
              onClick={() => setShowNoticeModal(true)}
              style={{
                padding: "8px 20px",
                borderRadius: 6,
                border: "none",
                background: C.gemOrange,
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 2px 6px rgba(243,112,33,0.4)",
                transition: "all 0.15s"
              }}
              title="View & Download formal Gazette Notice Document"
            >
              <span style={{ fontSize: 16 }}>⬇️</span> Download / View Notice
            </button>
          </div>
        </div>

        {/* Tender Header Details */}
        <div style={{ padding: "24px 28px 18px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: F.mono,
                    fontWeight: 800,
                    background: "#eff6ff",
                    color: C.navy,
                    border: "1px solid #bfdbfe"
                  }}
                >
                  {tender.referenceNumber}
                </span>

                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 6,
                    fontSize: 11.5,
                    fontFamily: F.mono,
                    fontWeight: 700,
                    background: "#f1f5f9",
                    color: C.inkMuted,
                    border: "1px solid #cbd5e1"
                  }}
                >
                  GeM Bid: {notice.gemBidNumber}
                </span>

                <span style={{ fontSize: 11, color: C.inkFaint }}>
                  Published: {notice.publishedDate}
                </span>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 6px" }}>
                {tender.title}
              </h1>

              <div style={{ fontSize: 13, color: C.inkMuted }}>
                <strong>Category:</strong> {tender.category} • <strong>Procurement Type:</strong> {tender.tenderType}
              </div>
            </div>

            {/* Status & Evaluation Stage Badges */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <span
                style={{
                  padding: "5px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 800,
                  background: "#f0fdf4",
                  color: C.emerald,
                  border: "1px solid #bbf7d0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <span>●</span> Open for Bidding (Live)
              </span>
              <span style={{ fontSize: 11.5, color: C.inkFaint }}>
                Authority: {tender.issuingAuthority}
              </span>
            </div>
          </div>

          {/* Executive Scope Summary Box */}
          <div
            style={{
              marginTop: 18,
              padding: "14px 18px",
              background: "#f8fafc",
              borderRadius: 10,
              border: "1px solid #e2e8f0",
              borderLeft: `4px solid ${C.navy}`
            }}
          >
            <div style={{ fontSize: 11.5, fontWeight: 800, color: C.navy, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <span>🎯</span> Executive Procurement Scope (Extracted from NIT Notice):
            </div>
            <p style={{ margin: 0, fontSize: 13, color: C.ink, lineHeight: 1.55 }}>
              {notice.scopeSummary}
            </p>
            <div style={{ marginTop: 8, display: "flex", gap: 16, fontSize: 11.5, color: C.inkMuted, flexWrap: "wrap" }}>
              <span>📍 <strong>Location:</strong> {notice.location}</span>
              <span>⏱️ <strong>Delivery Period:</strong> {notice.deliveryPeriod}</span>
              <span>📜 <strong>Contract:</strong> {notice.contractType}</span>
            </div>
          </div>
        </div>

        {/* 6 Key Commercials & Milestones Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            padding: "16px 28px",
            background: "#ffffff",
            borderBottom: `1px solid ${C.border}`
          }}
        >
          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Estimated Budget</span>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.navy, marginTop: 3 }}>
              {tender.estimatedValue}
            </div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>EMD Amount</span>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginTop: 3 }}>
              {tender.emdAmount}
            </div>
            <div style={{ fontSize: 10, color: C.emerald, fontWeight: 600 }}>100% MSME Exempt</div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Bid Closing Date</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.crimson, marginTop: 3 }}>
              {tender.closingDate}
            </div>
            <div style={{ fontSize: 10, color: C.inkFaint }}>15:00 IST</div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Tech Bid Opening</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 3 }}>
              {notice.bidOpeningDate}
            </div>
            <div style={{ fontSize: 10, color: C.inkFaint }}>11:00 IST</div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Delivery Window</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 3 }}>
              {notice.deliveryPeriod}
            </div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Total Bidders</span>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.navy, marginTop: 3 }}>
              {tender.biddersCount} Applied
            </div>
            <div style={{ fontSize: 10, color: C.emerald, fontWeight: 600 }}>Accepting Submissions</div>
          </div>
        </div>

        {/* ── Extracted Requirements from Notice (3 Column Matrix) ── */}
        <div style={{ padding: "24px 28px", background: "#f8fafc", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.navy, textTransform: "uppercase", letterSpacing: 0.6 }}>
                📋 Main Requirements Extracted from Official Tender Notice
              </div>
              <div style={{ fontSize: 12, color: C.inkMuted, marginTop: 2 }}>
                Critical technical specifications, financial thresholds, and statutory policies extracted from NIT notice
              </div>
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              {[
                { id: "ALL", label: "All Requirements" },
                { id: "TECH", label: "Technical Specs" },
                { id: "PQC", label: "Financial / PQC" },
                { id: "STATUTORY", label: "Statutory / GFR" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveReqTab(tab.id as any)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 6,
                    border: activeReqTab === tab.id ? `1.5px solid ${C.navy}` : `1px solid ${C.border}`,
                    background: activeReqTab === tab.id ? C.navy : "#ffffff",
                    color: activeReqTab === tab.id ? "#ffffff" : C.inkMuted,
                    fontSize: 11.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: activeReqTab === "ALL" ? "repeat(auto-fit, minmax(280px, 1fr))" : "1fr", gap: 18 }}>
            {/* 1. Technical Specifications */}
            {(activeReqTab === "ALL" || activeReqTab === "TECH") && (
              <div style={{ background: "#ffffff", padding: "16px 18px", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: C.navy, marginBottom: 10, display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #f1f5f9", paddingBottom: 6 }}>
                  <span>⚙️ Technical Specifications & Testing</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(notice.technicalRequirements || []).map((req, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: C.ink, lineHeight: 1.45 }}>
                      <span style={{ color: C.navy, fontWeight: 800, fontSize: 11 }}>•</span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Financial Eligibility & PQC */}
            {(activeReqTab === "ALL" || activeReqTab === "PQC") && (
              <div style={{ background: "#ffffff", padding: "16px 18px", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: "#9a3412", marginBottom: 10, display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #f1f5f9", paddingBottom: 6 }}>
                  <span>💼 Financial & Prior Experience (PQC)</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(notice.financialEligibility || []).map((pqc, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: C.ink, lineHeight: 1.45 }}>
                      <span style={{ color: "#ea580c", fontWeight: 800, fontSize: 11 }}>•</span>
                      <span>{pqc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Statutory & Sovereign Mandates */}
            {(activeReqTab === "ALL" || activeReqTab === "STATUTORY") && (
              <div style={{ background: "#ffffff", padding: "16px 18px", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: "#166534", marginBottom: 10, display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #f1f5f9", paddingBottom: 6 }}>
                  <span>⚖️ Statutory & GFR 2017 Mandates</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(notice.statutoryMandates || []).map((st, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: C.ink, lineHeight: 1.45 }}>
                      <span style={{ color: "#16a34a", fontWeight: 800, fontSize: 11 }}>•</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mandatory Submission Documents Checklist */}
        <div style={{ padding: "18px 28px", background: "#ffffff", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.navy, whiteSpace: "nowrap" }}>
            📁 Mandatory Submission Documents:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {(tender.requiredDocuments && tender.requiredDocuments.length > 0) ? (
              tender.requiredDocuments.map(d => (
                <span
                  key={d.id}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    fontSize: 11.5,
                    fontWeight: 600,
                    background: "#eff6ff",
                    color: C.navy,
                    border: "1px solid #bfdbfe"
                  }}
                >
                  ✓ {d.name}
                </span>
              ))
            ) : (
              <span style={{ fontSize: 12, color: C.inkFaint }}>Standard statutory tender documents</span>
            )}
          </div>
        </div>

        {/* Critical Bidder Submission Guidelines alert box */}
        <div style={{ padding: "20px 28px", background: "#fffaf5" }}>
          <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: 18 }}>
            <div style={{ fontWeight: 800, color: C.navy, fontSize: 13, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <span>📌</span> Critical Bidder Submission Guidelines
            </div>
            <p style={{ fontSize: 13, color: "#1e3a8a", margin: 0, lineHeight: 1.55 }}>
              All participating bidders must submit complete statutory documentation, including valid GST registration, MSME/Udyam certificates, and signed Make-in-India declarations. All documents will be verified by the AI Triangulation Engine and reviewed strictly by the Competent Procurement Authority.
            </p>
          </div>

          {/* Action Button Bar */}
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => setShowNoticeModal(true)}
              style={{
                padding: "14px 28px",
                borderRadius: 8,
                background: "#ffffff",
                border: `1.5px solid ${C.border}`,
                color: C.navy,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.15s"
              }}
            >
              <span>📄</span> View Official Gazette Notice
            </button>

            <Link
              to={`/bidder/tenders/${tender.id}/documents`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 38px",
                borderRadius: 8,
                background: `linear-gradient(135deg, ${C.gemOrange} 0%, #ea580c 100%)`,
                color: "#ffffff",
                fontSize: 14.5,
                fontWeight: 800,
                textDecoration: "none",
                letterSpacing: "0.03em",
                boxShadow: "0 4px 16px rgba(243,112,33,0.35)",
                transition: "all 0.15s"
              }}
            >
              <span>📝</span> PARTICIPATE IN BID & UPLOAD DOCUMENTS →
            </Link>
          </div>
        </div>
      </div>

      {/* Official Notice Modal */}
      {showNoticeModal && (
        <OfficialNoticeModal
          tender={tender}
          onClose={() => setShowNoticeModal(false)}
          onParticipate={() => {
            setShowNoticeModal(false);
            navigate(`/bidder/tenders/${tender.id}/documents`);
          }}
        />
      )}
    </div>
  );
};

export default BidderTenderDetails;
