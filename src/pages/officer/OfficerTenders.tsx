import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tenderService } from "../../services/tenderService";
import { Tender } from "../../data/tenders";
import { C, F, S } from "../../tokens";

export const OfficerTenders: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);

  useEffect(() => {
    tenderService.getAllTenders().then(setTenders);
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", fontFamily: F.sans }}>
      {/* Breadcrumbs */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to="/officer/dashboard" style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>Dashboard</Link>
        {" / "}
        <span style={{ color: C.ink }}>Tender Management</span>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 4px" }}>Tender Management</h1>
        <p style={{ fontSize: 13, color: C.inkMuted, margin: 0 }}>Active and pending evaluation tenders across CPCL & PSU departments</p>
      </div>

      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: `1px solid ${C.border}`, color: C.inkMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "14px 18px" }}>Tender Ref</th>
              <th style={{ padding: "14px 18px" }}>Title & Scope</th>
              <th style={{ padding: "14px 18px" }}>Department</th>
              <th style={{ padding: "14px 18px" }}>Bidders</th>
              <th style={{ padding: "14px 18px" }}>Submissions</th>
              <th style={{ padding: "14px 18px" }}>Evaluation Status</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map(t => (
              <tr key={t.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 18px", fontFamily: F.mono, fontWeight: 700, color: C.navy }}>
                  {t.referenceNumber}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 600, color: C.ink }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: C.inkFaint }}>Closing: {t.closingDate}</div>
                </td>
                <td style={{ padding: "14px 18px", color: C.inkMuted }}>{t.department}</td>
                <td style={{ padding: "14px 18px", fontWeight: 800, color: C.navy }}>{t.biddersCount}</td>
                <td style={{ padding: "14px 18px", fontFamily: F.mono }}>{t.documentsCount.toLocaleString()} docs</td>
                <td style={{ padding: "14px 18px" }}>
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 12,
                      fontSize: 11,
                      fontWeight: 700,
                      background: t.officerStatus === "Awaiting Evaluation" ? "#fffbeb" : "#f0f9ff",
                      color: t.officerStatus === "Awaiting Evaluation" ? C.amber : C.teal
                    }}
                  >
                    {t.officerStatus}
                  </span>
                </td>
                <td style={{ padding: "14px 18px", textAlign: "right" }}>
                  <Link
                    to={`/officer/tenders/${t.id}/bidders`}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 6,
                      background: C.navy,
                      color: "#ffffff",
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: "none"
                    }}
                  >
                    Open Evaluation →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerTenders;
