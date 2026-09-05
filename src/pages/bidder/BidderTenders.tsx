import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tenderService } from "../../services/tenderService";
import { Tender } from "../../data/tenders";
import { C, F, S } from "../../tokens";

export const BidderTenders: React.FC = () => {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("ALL");

  useEffect(() => {
    tenderService.getAllTenders().then(setTenders);
  }, []);

  const filtered = tenders.filter(t => {
    const q = search.toLowerCase().trim();
    const matchQuery = !q || t.referenceNumber.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.department.toLowerCase().includes(q);
    const matchDept = deptFilter === "ALL" || t.department.includes(deptFilter);
    return matchQuery && matchDept;
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", fontFamily: F.sans }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to="/bidder/dashboard" style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>Home</Link>
        {" / "}
        <span style={{ color: C.ink }}>Public Procurement Tenders</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 4px" }}>Public Procurement Tenders</h1>
          <p style={{ fontSize: 13, color: C.inkMuted, margin: 0 }}>Explore and bid on active Central Public Sector Undertaking tenders</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, background: "#ffffff", padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, boxShadow: S.card }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.inkFaint }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by tender ref, title, or department..."
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

        <select
          value={deptFilter}
          onChange={e => setDeptFilter(e.target.value)}
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
          <option value="ALL">All Departments</option>
          <option value="CPCL">CPCL</option>
          <option value="ONGC">ONGC</option>
          <option value="IOCL">IOCL</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: `1px solid ${C.border}`, color: C.inkMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "14px 18px" }}>Tender Number</th>
              <th style={{ padding: "14px 18px" }}>Title & Scope</th>
              <th style={{ padding: "14px 18px" }}>Department</th>
              <th style={{ padding: "14px 18px" }}>Closing Date</th>
              <th style={{ padding: "14px 18px" }}>EMD (₹)</th>
              <th style={{ padding: "14px 18px" }}>Status</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: 32, color: C.inkFaint }}>
                  No matching tenders found.
                </td>
              </tr>
            ) : (
              filtered.map(t => (
                <tr key={t.id} style={{ borderBottom: `1px solid #f1f5f9` }}>
                  <td style={{ padding: "14px 18px", fontFamily: F.mono, fontWeight: 700, color: C.navy }}>
                    {t.referenceNumber}
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 600, color: C.ink }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>{t.category}</div>
                  </td>
                  <td style={{ padding: "14px 18px", color: C.inkMuted }}>{t.department}</td>
                  <td style={{ padding: "14px 18px", color: C.crimson, fontWeight: 600 }}>{t.closingDate}</td>
                  <td style={{ padding: "14px 18px", fontWeight: 700, color: C.ink }}>{t.emdAmount}</td>
                  <td style={{ padding: "14px 18px" }}>
                    <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700, background: "#f0fdf4", color: C.emerald }}>
                      Active
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    <Link
                      to={`/bidder/tenders/${t.id}`}
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
                      View Tender
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BidderTenders;
