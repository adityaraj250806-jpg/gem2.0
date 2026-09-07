import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { bidderService } from "../../services/bidderService";
import { tenderService } from "../../services/tenderService";
import { Bidder } from "../../data/bidders";
import { Tender, getTenderNotice, NoticeDetails } from "../../data/tenders";
import { OfficialNoticeModal } from "../../components/modals/OfficialNoticeModal";
import { C, F, S } from "../../tokens";

export const OfficerBidders: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tenderId = id || "CPCL-2026-TE-045";

  const [tender, setTender] = useState<Tender | null>(null);
  const [bidders, setBidders] = useState<Bidder[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [activeReqTab, setActiveReqTab] = useState<"ALL" | "TECH" | "PQC" | "STATUTORY">("ALL");

  useEffect(() => {
    tenderService.getTenderById(tenderId).then(t => {
      if (t) setTender(t);
      else tenderService.getAllTenders().then(list => setTender(list[0]));
    });

    bidderService.getBiddersByTender(tenderId).then(setBidders);
  }, [tenderId]);

  const notice: NoticeDetails | null = tender ? getTenderNotice(tender) : null;

  const handleDownloadNotice = () => {
    if (!tender || !notice) return;
    const content = `================================================================================
GOVERNMENT OF INDIA • MINISTRY OF PETROLEUM & NATURAL GAS
${tender.department.toUpperCase()}
OFFICIAL NOTICE INVITING TENDER (NIT) • GeM 4.0 SOVEREIGN PORTAL
================================================================================

NIT REFERENCE NO: ${notice.nitNumber}
GeM BID IDENTIFIER: ${notice.gemBidNumber}
TENDER TITLE: ${tender.title}
DEPARTMENT / PSU: ${tender.department}
ISSUING AUTHORITY: ${tender.issuingAuthority}
DATE OF PUBLICATION: ${notice.publishedDate}
BID SUBMISSION DEADLINE: ${tender.closingDate} (${tender.submissionDeadline})
TECHNICAL BID OPENING: ${notice.bidOpeningDate}

1. ESTIMATED VALUE & EARNEST MONEY DEPOSIT (EMD)
--------------------------------------------------------------------------------
- Estimated Tender Budget: ${tender.estimatedValue}
- Earnest Money Deposit (EMD): ${tender.emdAmount}
- EMD Exemption Policy: ${notice.emdExemption}

2. DETAILED SCOPE OF SUPPLY & SPECIFICATIONS
--------------------------------------------------------------------------------
${notice.scopeSummary}
Delivery & Inspection Location: ${notice.location}
Contract Delivery Schedule: ${notice.deliveryPeriod}

3. TECHNICAL SPECIFICATIONS & MANDATORY CODES
--------------------------------------------------------------------------------
${notice.technicalRequirements.map((r, i) => `${i + 1}. ${r}`).join("\n")}

4. COMMERCIAL & PRE-QUALIFICATION CRITERIA (PQC)
--------------------------------------------------------------------------------
${notice.financialEligibility.map((f, i) => `${i + 1}. ${f}`).join("\n")}

5. STATUTORY COMPLIANCE & SOVEREIGN PREFERENCES (GFR 2017)
--------------------------------------------------------------------------------
${notice.statutoryMandates.map((m, i) => `${i + 1}. ${m}`).join("\n")}

6. PENALTIES & LIQUIDATED DAMAGES CLAUSE
--------------------------------------------------------------------------------
Liquidated Damages (LD) for delayed delivery will be levied at 0.5% of PO value 
per week of delay or part thereof, subject to a maximum ceiling of 10% of total order value.

================================================================================
ISSUED BY ORDER OF THE TENDER INVITING AUTHORITY (TIA)
Dr. K. S. Ramanathan (Chief Procurement Officer / CPCL TEC Committee)
Tender Evaluation Unit, Government e-Marketplace (GeM 4.0 Verified)
================================================================================`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tender.referenceNumber.replace(/[^a-zA-Z0-9_-]/g, "_")}_Official_Notice_Inviting_Tender.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filtered = bidders.filter(b => {
    const q = search.toLowerCase().trim();
    const matchQuery = !q || b.bidderName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) || b.bidIdCode.includes(q);
    const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
    return matchQuery && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === "Qualified") return { bg: "#f0fdf4", color: C.emerald };
    if (status === "Disqualified") return { bg: "#fef2f2", color: C.crimson };
    if (status === "Clarification Sent") return { bg: "#fffbeb", color: C.amber };
    return { bg: "#f1f5f9", color: C.inkMuted };
  };

  return (
    <div style={{ maxWidth: 1240, margin: "0 auto", fontFamily: F.sans, paddingBottom: 48 }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to="/officer/dashboard" style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>← Dashboard</Link>
        {" / "}
        <Link to="/officer/tenders" style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>Tenders</Link>
        {" / "}
        <span style={{ color: C.ink, fontWeight: 700 }}>{tender?.referenceNumber || tenderId}</span>
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
                {tender?.department || "CPCL (Chennai Petroleum Corporation Limited)"} • Tender Evaluation Authority
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
                  {tender?.referenceNumber || tenderId}
                </span>

                {notice && (
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
                )}

                <span style={{ fontSize: 11, color: C.inkFaint }}>
                  Published: {notice?.publishedDate || "15 Aug 2026"}
                </span>
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 6px" }}>
                {tender?.title || "Supply of High Pressure Valves"}
              </h1>

              <div style={{ fontSize: 13, color: C.inkMuted }}>
                <strong>Category:</strong> {tender?.category} • <strong>Procurement Type:</strong> {tender?.tenderType}
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
                  background: tender?.officerStatus === "Completed" ? "#f0fdf4" : "#fffbeb",
                  color: tender?.officerStatus === "Completed" ? C.emerald : C.amber,
                  border: tender?.officerStatus === "Completed" ? "1px solid #bbf7d0" : "1px solid #fde68a",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <span>●</span> {tender?.officerStatus || "Awaiting Evaluation"}
              </span>
              <span style={{ fontSize: 11.5, color: C.inkFaint }}>
                Authority: {tender?.issuingAuthority || "CPCL Central TEC Unit"}
              </span>
            </div>
          </div>

          {/* Executive Scope Summary Box */}
          {notice && (
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
          )}
        </div>

        {/* 6 Key Commercials & Milestones Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 12,
            padding: "16px 28px",
            background: "#ffffff",
            borderBottom: `1px solid ${C.border}`
          }}
        >
          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Estimated Budget</span>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.navy, marginTop: 3 }}>
              {tender?.estimatedValue || "₹8,45,00,000"}
            </div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>EMD Amount</span>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginTop: 3 }}>
              {tender?.emdAmount || "₹10,00,000"}
            </div>
            <div style={{ fontSize: 10, color: C.emerald, fontWeight: 600 }}>100% MSME Exempt</div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Bid Closing Date</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.crimson, marginTop: 3 }}>
              {tender?.closingDate}
            </div>
            <div style={{ fontSize: 10, color: C.inkFaint }}>15:00 IST</div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Tech Bid Opening</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 3 }}>
              {notice?.bidOpeningDate || "16 Sep 2026"}
            </div>
            <div style={{ fontSize: 10, color: C.inkFaint }}>11:00 IST</div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Delivery Window</span>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginTop: 3 }}>
              {notice?.deliveryPeriod || "90 Days from PO"}
            </div>
          </div>

          <div>
            <span style={{ fontSize: 11, color: C.inkFaint, textTransform: "uppercase", fontWeight: 700 }}>Total Bidders</span>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.navy, marginTop: 3 }}>
              {bidders.length} Applied
            </div>
            <div style={{ fontSize: 10, color: C.emerald, fontWeight: 600 }}>All Packages Active</div>
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
                Critical technical specifications, financial thresholds, and statutory policies extracted for officer evaluation
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

          <div style={{ display: "grid", gridTemplateColumns: activeReqTab === "ALL" ? "repeat(3, 1fr)" : "1fr", gap: 18 }}>
            {/* 1. Technical Specifications */}
            {(activeReqTab === "ALL" || activeReqTab === "TECH") && (
              <div style={{ background: "#ffffff", padding: "16px 18px", borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: C.navy, marginBottom: 10, display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #f1f5f9", paddingBottom: 6 }}>
                  <span>⚙️ Technical Specifications & Testing</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(notice?.technicalRequirements || []).map((req, idx) => (
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
                  {(notice?.financialEligibility || []).map((pqc, idx) => (
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
                  {(notice?.statutoryMandates || []).map((st, idx) => (
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
        <div style={{ padding: "18px 28px", background: "#ffffff", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: C.navy, whiteSpace: "nowrap" }}>
            📁 Mandatory Submission Documents:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {(tender?.requiredDocuments && tender.requiredDocuments.length > 0) ? (
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
              [
                "GST Registration",
                "PAN Card",
                "Udyam / MSME Certificate",
                "CA Audit Balance Sheet",
                "Technical BOQ Compliance",
                "OEM Authorization Letter",
                "Make-in-India Declaration",
                "Non-Blacklisting Affidavit"
              ].map((name, i) => (
                <span
                  key={i}
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
                  ✓ {name}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── 2. BIDDERS APPLIED FOR THIS PARTICULAR TENDER ── */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: "0 0 4px" }}>
              Bidders Applied for this Tender ({filtered.length})
            </h2>
            <p style={{ fontSize: 13, color: C.inkMuted, margin: 0 }}>
              Technical bid packages submitted specifically for <strong>{tender?.referenceNumber || tenderId}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: "flex", gap: 14, marginBottom: 18, background: "#ffffff", padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, boxShadow: S.card }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.inkFaint }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Search from ${bidders.length} applied bidders by Name, GSTIN, or Bid ID...`}
            style={{
              width: "100%",
              padding: "9px 12px 9px 36px",
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.inkMuted }}>Status:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              padding: "9px 16px",
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              fontSize: 13,
              background: "#ffffff",
              color: C.ink,
              outline: "none"
            }}
          >
            <option value="ALL">All Statuses ▾</option>
            <option value="Submitted">Submitted</option>
            <option value="Qualified">Qualified</option>
            <option value="Disqualified">Disqualified</option>
            <option value="Clarification Sent">Clarification Sent</option>
          </select>
        </div>
      </div>

      {/* Applied Bidders Table */}
      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card, marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: `1px solid ${C.border}`, color: C.inkMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "14px 18px", width: 90 }}>BID ID</th>
              <th style={{ padding: "14px 18px" }}>BIDDER LEGAL ENTITY</th>
              <th style={{ padding: "14px 18px" }}>DOCUMENTS</th>
              <th style={{ padding: "14px 18px" }}>COMPLIANCE STATUS</th>
              <th style={{ padding: "14px 18px", textAlign: "right", width: 170 }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "32px 18px", textAlign: "center", color: C.inkMuted, fontSize: 13 }}>
                  No bidders matching your search criteria for this tender.
                </td>
              </tr>
            ) : (
              filtered.map(b => {
                const badge = getStatusBadge(b.status);
                return (
                  <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 18px", fontFamily: F.mono, fontWeight: 800, color: C.navy }}>
                      {b.bidIdCode || b.id}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 700, color: C.ink, fontSize: 14 }}>{b.bidderName}</div>
                      <div style={{ fontSize: 11.5, color: C.inkMuted, marginTop: 2 }}>
                        GSTIN: <span style={{ fontFamily: F.mono }}>{b.gstin}</span> • Submitted: {b.submittedAt}
                      </div>
                      {b.contactPerson && (
                        <div style={{ fontSize: 11, color: C.inkFaint, marginTop: 1 }}>
                          Contact: {b.contactPerson}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: 12,
                          fontSize: 11,
                          fontWeight: 700,
                          background: "#f0fdf4",
                          color: C.emerald
                        }}
                      >
                        {b.documentsSubmitted || `${b.documentsCount || 10} / 10`}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: 12,
                          fontSize: 11,
                          fontWeight: 700,
                          background: badge.bg,
                          color: badge.color
                        }}
                      >
                        {b.status}
                      </span>
                      {b.aiStatus === "COMPLETED" && (
                        <span
                          style={{
                            marginLeft: 6,
                            padding: "3px 6px",
                            borderRadius: 4,
                            fontSize: 10,
                            fontWeight: 700,
                            background: "#ecfdf5",
                            color: "#059669"
                          }}
                        >
                          AI: {b.complianceScore}%
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "right", whiteSpace: "nowrap" }}>
                      <Link
                        to={`/officer/bidders/${b.id}/documents`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          padding: "7px 16px",
                          borderRadius: 6,
                          background: C.navy,
                          color: "#ffffff",
                          fontSize: 12,
                          fontWeight: 700,
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          boxShadow: "0 2px 4px rgba(11,61,145,0.2)",
                          transition: "all 0.15s ease"
                        }}
                      >
                        <span>INSPECT & EVALUATE</span>
                        <span style={{ fontSize: 13, lineHeight: 1 }}>→</span>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div style={{ padding: "14px 18px", background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }}>
        ℹ️ <strong>Officer Evaluation Protocol:</strong> Review the technical eligibility criteria and mandatory document package above, then select a bidder to inspect their statutory files. AI verification runs on-demand according to GFR 2017 & GeM 4.0 guidelines.
      </div>

      {/* Official Notice Modal in Proper Formal Words */}
      {showNoticeModal && tender && (
        <OfficialNoticeModal tender={tender} onClose={() => setShowNoticeModal(false)} />
      )}
    </div>
  );
};

export default OfficerBidders;
