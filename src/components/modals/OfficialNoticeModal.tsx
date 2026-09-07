import React, { useState, useEffect } from "react";
import { Tender, NoticeDetails } from "../../data/tenders";
import { C, F } from "../../tokens";

interface OfficialNoticeModalProps {
  tender: Tender;
  onClose: () => void;
  onParticipate?: () => void;
}

export const OfficialNoticeModal: React.FC<OfficialNoticeModalProps> = ({ tender, onClose, onParticipate }) => {
  const [activeTab, setActiveTab] = useState<"FULL" | "SCOPE_TECH" | "FIN_PQC" | "STATUTORY" | "SCHEDULE">("FULL");

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const notice: NoticeDetails = tender.notice || {
    nitNumber: `NIT/${tender.referenceNumber.replace(/\//g, "-")}`,
    gemBidNumber: `GEM/2026/B/${tender.id.replace(/[^0-9]/g, "").padEnd(6, "894102")}`,
    publishedDate: "15 Aug 2026",
    bidOpeningDate: tender.closingDate,
    location: `${tender.department}, Industrial Complex, India`,
    deliveryPeriod: "90 Days from Purchase Order date",
    contractType: `${tender.tenderType} (Two-Packet Sovereign Bidding System)`,
    scopeSummary: `Procurement, manufacturing, testing, and delivery of ${tender.title} adhering to GFR 2017 & GeM 4.0 guidelines for ${tender.department}.`,
    technicalRequirements: [
      `Compliance with standard industrial code for ${tender.category}`,
      "Mandatory quality testing and chemical analysis reports",
      "OEM Technical Datasheets & detailed BOQ line-item compliance",
      "Third-party inspection clearance by approved national testing agency"
    ],
    financialEligibility: [
      `Minimum 3-Year Average Annual Turnover threshold of ₹${Math.round(parseInt(tender.estimatedValue.replace(/[^0-9]/g, "") || "80000000") * 0.2 / 10000000)} Crores`,
      "Proven track record of past supply to Central/State PSU departments in the last 5 years",
      "Audited balance sheet and positive net worth certified by Chartered Accountant"
    ],
    statutoryMandates: [
      "Public Procurement (Preference to Make in India) Order 2017: Minimum 50% Local Content (Class-I Supplier)",
      "Public Procurement Policy for MSEs Order 2012: 25% purchase preference with valid Udyam Certificate",
      "Mandatory Non-Blacklisting / Debarment Undertaking on non-judicial stamp paper"
    ],
    emdExemption: `Earnest Money Deposit (EMD) of ${tender.emdAmount} is 100% exempt for valid MSME / Udyam registered enterprises and DPIIT recognized Startups.`,
    fullNoticeText: ""
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Official Notice Inviting Tender - ${tender.referenceNumber}</title>
  <style>
    body { font-family: 'Open Sans', 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 40px; }
    .header { text-align: center; border-bottom: 2px solid #0b3d91; padding-bottom: 20px; margin-bottom: 24px; }
    .emblem { font-size: 36px; }
    .gov { font-size: 13px; font-weight: 700; color: #475569; letter-spacing: 1px; text-transform: uppercase; }
    .ministry { font-size: 14px; font-weight: 700; color: #1e3a8a; }
    .dept { font-size: 24px; font-weight: 900; color: #0b3d91; margin: 8px 0; text-transform: uppercase; }
    .nit-badge { display: inline-block; background: #eff6ff; border: 1px solid #bfdbfe; color: #1e3a8a; padding: 6px 16px; font-weight: 700; border-radius: 4px; margin-top: 10px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 14px; text-align: left; }
    th { background: #f1f5f9; color: #0b3d91; font-weight: 700; }
    .section-title { font-size: 16px; font-weight: 800; color: #0b3d91; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 6px; margin: 26px 0 12px; text-transform: uppercase; }
    .clause { margin-bottom: 10px; padding-left: 18px; position: relative; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
    .alert-box { background: #fffbeb; border: 1px solid #fde68a; border-left: 4px solid #d97706; padding: 14px; margin: 20px 0; border-radius: 6px; }
    .signature { margin-top: 40px; display: flex; justify-content: space-between; border-top: 1px solid #cbd5e1; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="emblem">🏛️</div>
    <div class="gov">भारत सरकार • Government of India</div>
    <div class="ministry">Ministry of Petroleum & Natural Gas</div>
    <div class="dept">${tender.department}</div>
    <div style="font-size: 13px; color: #64748b;">Central Procurement & Contracts Directorate • GeM 4.0 Standard</div>
    <div class="nit-badge">OFFICIAL NOTICE INVITING TENDER (NIT) • GLOBAL / NATIONAL COMPETITIVE BID</div>
  </div>

  <table>
    <tr>
      <th>Tender Reference No.</th>
      <td><strong>${tender.referenceNumber}</strong></td>
      <th>GeM Bid Number</th>
      <td><strong>${notice.gemBidNumber}</strong></td>
    </tr>
    <tr>
      <th>Tender Title</th>
      <td colspan="3"><strong>${tender.title}</strong></td>
    </tr>
    <tr>
      <th>Estimated Budget</th>
      <td>${tender.estimatedValue}</td>
      <th>Earnest Money Deposit</th>
      <td>${tender.emdAmount} (MSME Exempt)</td>
    </tr>
    <tr>
      <th>Publication Date</th>
      <td>${notice.publishedDate}</td>
      <th>Bid Submission Cutoff</th>
      <td><strong>${tender.closingDate} (${tender.submissionDeadline})</strong></td>
    </tr>
    <tr>
      <th>Bidding Mechanism</th>
      <td>Two-Packet Open E-Tender (Technical + Financial)</td>
      <th>Delivery Period</th>
      <td>${notice.deliveryPeriod}</td>
    </tr>
  </table>

  <div class="section-title">Clause 1.0 — Executive Scope of Supply & Installation</div>
  <p>${notice.scopeSummary}</p>
  <p><strong>Designated Delivery & Inspection Point:</strong> ${notice.location}</p>

  <div class="section-title">Clause 2.0 — Technical Specifications & Quality Mandates</div>
  ${notice.technicalRequirements.map((req, i) => `<div class="clause"><strong>2.${i + 1}</strong> ${req}</div>`).join("")}

  <div class="section-title">Clause 3.0 — Pre-Qualification Criteria (PQC)</div>
  ${notice.financialEligibility.map((pqc, i) => `<div class="clause"><strong>3.${i + 1}</strong> ${pqc}</div>`).join("")}

  <div class="section-title">Clause 4.0 — Sovereign Mandates & GFR 2017 Compliance</div>
  ${notice.statutoryMandates.map((st, i) => `<div class="clause"><strong>4.${i + 1}</strong> ${st}</div>`).join("")}

  <div class="alert-box">
    <strong>Clause 5.0 — Liquidated Damages & Disqualification Policy:</strong><br>
    Liquidated damages for delayed delivery will be deducted at 0.5% per week of delay or part thereof, capped at a maximum of 10% of total contract value. Any fraudulent statutory claims or false Make-in-India declarations will result in immediate disqualification and debarment under GFR Rule 151(iii).
  </div>

  <div class="signature">
    <div>
      <div style="font-size: 11px; color: #64748b;">Notice Reference: GeM-NIT-${tender.referenceNumber.replace(/[^a-zA-Z0-9]/g, "-")}</div>
      <div style="font-size: 11px; color: #64748b;">Digitally Certified via National Informatics Centre (NIC) PKI Infrastructure</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: 800; color: #0b3d91;">Dr. K. S. Ramanathan</div>
      <div style="font-size: 12px; color: #475569;">Chief Procurement Officer & TEC Member Secretary</div>
      <div style="font-size: 12px; color: #64748b;">Tender Inviting Authority • ${tender.department}</div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tender.referenceNumber.replace(/[^a-zA-Z0-9_-]/g, "_")}_Official_Notice_Inviting_Tender.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        fontFamily: F.sans,
        animation: "fadeIn 0.2s ease-out"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 960,
          background: "#ffffff",
          borderRadius: 14,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.1)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "92vh",
          overflow: "hidden",
          border: `1px solid ${C.border}`
        }}
      >
        {/* Top Control Bar with Sovereign Styling */}
        <div
          style={{
            padding: "14px 24px",
            background: "linear-gradient(135deg, #071f52 0%, #0b3d91 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            borderBottom: "1px solid rgba(255,255,255,0.12)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>🏛️</span>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Official Notice Inviting Tender (NIT Document)
              </div>
              <div style={{ fontSize: 11.5, color: "#93c5fd", fontFamily: F.mono, marginTop: 2 }}>
                {notice.nitNumber} • GeM Bid ID: {notice.gemBidNumber}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {onParticipate && (
              <button
                onClick={onParticipate}
                style={{
                  padding: "7px 16px",
                  borderRadius: 6,
                  border: "none",
                  background: C.gemOrange,
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  boxShadow: "0 2px 8px rgba(243,112,33,0.45)",
                  transition: "opacity 0.15s"
                }}
                title="Participate in this Tender Bid"
              >
                <span>📝</span> Participate in Bid →
              </button>
            )}

            <button
              onClick={handlePrint}
              style={{
                padding: "7px 14px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.12)",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background 0.15s"
              }}
              title="Print official document or Save as PDF"
            >
              <span>🖨️</span> Print / Save PDF
            </button>

            <button
              onClick={handleDownloadHtml}
              style={{
                padding: "7px 15px",
                borderRadius: 6,
                border: "none",
                background: "rgba(255,255,255,0.18)",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "rgba(255,255,255,0.3)",
                transition: "opacity 0.15s"
              }}
              title="Download formatted Gazette document (HTML/Doc view)"
            >
              <span>⬇️</span> Download Notice
            </button>

            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
                width: 32,
                height: 32,
                borderRadius: 6,
                fontSize: 16,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                marginLeft: 4
              }}
              title="Close Notice Viewer (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div
          style={{
            display: "flex",
            background: "#f1f5f9",
            borderBottom: `1px solid ${C.border}`,
            padding: "0 24px",
            overflowX: "auto",
            gap: 4
          }}
        >
          {[
            { id: "FULL", label: "📜 Complete Gazette Notice" },
            { id: "SCOPE_TECH", label: "⚙️ Scope & Technical Specs" },
            { id: "FIN_PQC", label: "💼 Financial & PQC Criteria" },
            { id: "STATUTORY", label: "⚖️ Statutory & GFR Mandates" },
            { id: "SCHEDULE", label: "⏱️ Timetable & Commercials" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: "10px 14px",
                border: "none",
                borderBottom: activeTab === tab.id ? `3px solid ${C.navy}` : "3px solid transparent",
                background: "transparent",
                color: activeTab === tab.id ? C.navy : C.inkMuted,
                fontWeight: activeTab === tab.id ? 800 : 600,
                fontSize: 12.5,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Document Container */}
        <div
          style={{
            padding: "28px 36px",
            overflowY: "auto",
            flex: 1,
            background: "#ffffff"
          }}
        >
          {/* TAB 1: FULL GAZETTE NOTICE OR TABBED VIEWS */}
          {/* Official Letterhead Header */}
          <div style={{ textAlign: "center", borderBottom: "2px solid #0f2b5c", paddingBottom: 18, marginBottom: 24 }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              भारत सरकार • GOVERNMENT OF INDIA
            </div>
            <div style={{ fontSize: 13, color: "#1e3a8a", fontWeight: 700, margin: "3px 0" }}>
              Ministry of Petroleum & Natural Gas • Central Public Sector Enterprise
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: C.navy, margin: "6px 0 2px", textTransform: "uppercase", letterSpacing: "0.03em" }}>
              {tender.department}
            </h2>
            <div style={{ fontSize: 12, color: C.inkMuted }}>
              Materials & Contracts Directorate • GeM Sovereign Procurement Framework 4.0
            </div>
            <div style={{ marginTop: 10 }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#eff6ff",
                  padding: "5px 16px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 800,
                  color: C.navy,
                  border: "1px solid #bfdbfe",
                  letterSpacing: "0.04em"
                }}
              >
                OFFICIAL NOTICE INVITING TENDER (NIT) • TWO-PACKET COMPETITIVE BIDDING
              </span>
            </div>
          </div>

          {/* Quick Identification Table */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, marginBottom: 24, border: "1px solid #e2e8f0" }}>
            <tbody>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted, width: "22%" }}>Tender Reference</td>
                <td style={{ padding: "10px 14px", fontFamily: F.mono, fontWeight: 800, color: C.navy, width: "28%" }}>{tender.referenceNumber}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted, width: "22%" }}>GeM Bid Number</td>
                <td style={{ padding: "10px 14px", fontFamily: F.mono, fontWeight: 800, color: C.navy, width: "28%" }}>{notice.gemBidNumber}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted }}>Tender Subject / Title</td>
                <td colSpan={3} style={{ padding: "10px 14px", fontWeight: 800, color: C.ink, fontSize: 13 }}>
                  {tender.title}
                </td>
              </tr>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted }}>Estimated Value</td>
                <td style={{ padding: "10px 14px", fontWeight: 800, color: C.navy }}>{tender.estimatedValue}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted }}>EMD (Earnest Money)</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.ink }}>
                  {tender.emdAmount} <span style={{ color: C.emerald, fontSize: 11, fontWeight: 700 }}>(MSME Exempt)</span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted }}>Published Date</td>
                <td style={{ padding: "10px 14px", color: C.ink }}>{notice.publishedDate}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted }}>Submission Deadline</td>
                <td style={{ padding: "10px 14px", fontWeight: 800, color: C.crimson }}>
                  {tender.closingDate} ({tender.submissionDeadline})
                </td>
              </tr>
              <tr style={{ background: "#f8fafc" }}>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted }}>Delivery Schedule</td>
                <td style={{ padding: "10px 14px", color: C.ink }}>{notice.deliveryPeriod}</td>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: C.inkMuted }}>Bidding Procedure</td>
                <td style={{ padding: "10px 14px", color: C.ink }}>{notice.contractType}</td>
              </tr>
            </tbody>
          </table>

          {/* CONTENT ACCORDING TO ACTIVE TAB */}

          {/* Section 1: Executive Scope */}
          {(activeTab === "FULL" || activeTab === "SCOPE_TECH") && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `1.5px solid ${C.navy}`, paddingBottom: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>🎯</span>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: C.navy, margin: 0, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Clause 1.0 — Executive Scope of Supply & Technical Objective
                </h3>
              </div>
              <p style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.65, margin: "0 0 12px" }}>
                {notice.scopeSummary}
              </p>
              <div style={{ background: "#f8fafc", padding: "12px 16px", borderRadius: 8, border: "1px solid #e2e8f0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12.5 }}>
                <div>
                  <strong>📍 Consignee / Delivery Complex:</strong><br />
                  <span style={{ color: C.inkMuted }}>{notice.location}</span>
                </div>
                <div>
                  <strong>⏱️ Total Completion Window:</strong><br />
                  <span style={{ color: C.inkMuted }}>{notice.deliveryPeriod}</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Technical Specifications & Testing */}
          {(activeTab === "FULL" || activeTab === "SCOPE_TECH") && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: `1.5px solid ${C.navy}`, paddingBottom: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>⚙️</span>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: C.navy, margin: 0, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Clause 2.0 — Technical Specifications & Quality Assurance Standards
                </h3>
              </div>
              <div style={{ fontSize: 13, color: C.inkMuted, marginBottom: 10 }}>
                Every participating bidder must submit complete technical compliance datasheets confirming strict adherence to the following mandatory standards without deviations:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {notice.technicalRequirements.map((req, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      background: "#f8fafc",
                      padding: "10px 14px",
                      borderRadius: 6,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                      color: C.ink,
                      lineHeight: 1.5
                    }}
                  >
                    <span style={{ fontFamily: F.mono, fontWeight: 800, color: C.navy, minWidth: 40 }}>
                      2.{idx + 1}
                    </span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Financial & Commercial Eligibility (PQC) */}
          {(activeTab === "FULL" || activeTab === "FIN_PQC") && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1.5px solid #9a3412", paddingBottom: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>💼</span>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#9a3412", margin: 0, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Clause 3.0 — Pre-Qualification Criteria (PQC: Financial & Experience)
                </h3>
              </div>
              <div style={{ fontSize: 13, color: C.inkMuted, marginBottom: 10 }}>
                The tender evaluation committee will disqualify bids that fail to substantiate compliance with the following commercial thresholds via certified documentary evidence:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {notice.financialEligibility.map((pqc, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      background: "#fffaf5",
                      padding: "10px 14px",
                      borderRadius: 6,
                      border: "1px solid #fed7aa",
                      fontSize: 13,
                      color: C.ink,
                      lineHeight: 1.5
                    }}
                  >
                    <span style={{ fontFamily: F.mono, fontWeight: 800, color: "#c2410c", minWidth: 40 }}>
                      3.{idx + 1}
                    </span>
                    <span>{pqc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Statutory Compliances & Sovereign Policies */}
          {(activeTab === "FULL" || activeTab === "STATUTORY") && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1.5px solid #166534", paddingBottom: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>⚖️</span>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#166534", margin: 0, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Clause 4.0 — Statutory Mandates, Sovereign Policies & GFR 2017 Rules
                </h3>
              </div>
              <div style={{ fontSize: 13, color: C.inkMuted, marginBottom: 10 }}>
                Bids are subject to sovereign public procurement guidelines under the General Financial Rules (GFR) 2017 issued by the Ministry of Finance:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {notice.statutoryMandates.map((st, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      background: "#f0fdf4",
                      padding: "10px 14px",
                      borderRadius: 6,
                      border: "1px solid #bbf7d0",
                      fontSize: 13,
                      color: C.ink,
                      lineHeight: 1.5
                    }}
                  >
                    <span style={{ fontFamily: F.mono, fontWeight: 800, color: "#15803d", minWidth: 40 }}>
                      4.{idx + 1}
                    </span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: EMD Exemption & Penalties / Liquidated Damages */}
          {(activeTab === "FULL" || activeTab === "SCHEDULE") && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, borderBottom: "1.5px solid #d97706", paddingBottom: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#92400e", margin: 0, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Clause 5.0 — Earnest Money Deposit, Liquidated Damages & Disqualification
                </h3>
              </div>

              <div style={{ background: "#fffbeb", padding: "14px 18px", borderRadius: 8, border: "1px solid #fde68a", marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#92400e", marginBottom: 6 }}>
                  5.1 EMD Policy & Sovereign Exemptions:
                </div>
                <div style={{ fontSize: 12.5, color: "#78350f", lineHeight: 1.55 }}>
                  {notice.emdExemption} Bidders claiming exemption must upload a certified copy of their valid Udyam Registration Certificate or DPIIT Recognition Letter. Failure to provide proof will lead to immediate summary rejection at Packet-1 opening.
                </div>
              </div>

              <div style={{ background: "#fef2f2", padding: "14px 18px", borderRadius: 8, border: "1px solid #fecaca" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.crimson, marginBottom: 6 }}>
                  5.2 Liquidated Damages (LD) & Penal Clause:
                </div>
                <div style={{ fontSize: 12.5, color: "#991b1b", lineHeight: 1.55 }}>
                  If the supplier fails to complete deliveries within the contractual delivery period of {notice.deliveryPeriod}, Liquidated Damages will be recovered at the rate of <strong>0.5% of the total purchase order value per week of delay or part thereof</strong>, subject to a maximum ceiling of <strong>10% of total contract value</strong>. Any fraudulent certificate or forged Make-in-India declaration will result in forfeiture of EMD and 2-year debarment under Rule 151(iii) of GFR 2017.
                </div>
              </div>
            </div>
          )}

          {/* Formal Verification & Signatory Box */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 18,
              borderTop: "2px dashed #cbd5e1",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 16
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Authentication & Gazette Reference
              </div>
              <div style={{ fontSize: 12, fontFamily: F.mono, color: C.ink, marginTop: 3 }}>
                GeM-NIT-{tender.referenceNumber.replace(/[^a-zA-Z0-9]/g, "-")}-CERT-V2
              </div>
              <div style={{ fontSize: 11, color: C.emerald, fontWeight: 700, marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}>
                <span>✓</span> Digitally Verified & Signed via National Informatics Centre (NIC) PKI
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.navy }}>
                Dr. K. S. Ramanathan
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.inkMuted }}>
                Chief Procurement Officer & Member Secretary
              </div>
              <div style={{ fontSize: 11.5, color: C.inkFaint }}>
                Tender Evaluation Committee (TEC) • {tender.issuingAuthority}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: "14px 28px",
            background: "#f8fafc",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12
          }}
        >
          <div style={{ fontSize: 12, color: C.inkMuted, display: "flex", alignItems: "center", gap: 6 }}>
            <span>🏛️</span> Official Gazette Tender Document • GeM 4.0 Standard Format • Sovereign Procurement
          </div>

          {onParticipate && (
            <button
              onClick={onParticipate}
              style={{
                padding: "10px 24px",
                borderRadius: 8,
                border: "none",
                background: `linear-gradient(135deg, ${C.gemOrange} 0%, #ea580c 100%)`,
                color: "#ffffff",
                fontSize: 13.5,
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 4px 14px rgba(243,112,33,0.35)",
                transition: "all 0.15s"
              }}
            >
              <span>📝</span> Participate in Bid →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
