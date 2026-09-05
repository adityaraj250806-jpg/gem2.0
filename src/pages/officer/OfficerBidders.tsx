import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { bidderService } from "../../services/bidderService";
import { tenderService } from "../../services/tenderService";
import { Bidder } from "../../data/bidders";
import { Tender } from "../../data/tenders";
import { C, F, S } from "../../tokens";

export const OfficerBidders: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tenderId = id || "CPCL-2026-TE-045";

  const [tender, setTender] = useState<Tender | null>(null);
  const [bidders, setBidders] = useState<Bidder[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    tenderService.getTenderById(tenderId).then(t => {
      if (t) setTender(t);
      else tenderService.getAllTenders().then(list => setTender(list[0]));
    });

    bidderService.getBiddersByTender(tenderId).then(setBidders);
  }, [tenderId]);

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
    <div style={{ maxWidth: 1200, margin: "0 auto", fontFamily: F.sans }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to="/officer/tenders" style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>← Tenders</Link>
        {" / "}
        <span style={{ color: C.ink }}>{tender?.referenceNumber || tenderId} Bidders</span>
      </div>

      {/* Tender Header Banner */}
      <div style={{ background: "#ffffff", padding: "20px 24px", borderRadius: 12, border: `1px solid ${C.border}`, marginBottom: 24, boxShadow: S.card }}>
        <div style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
          {tender?.referenceNumber}
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: "0 0 6px" }}>{tender?.title}</h1>
        <div style={{ fontSize: 14, color: C.inkMuted, fontWeight: 600 }}>
          {tender?.biddersCount || bidders.length} Bidders Submitted Package
        </div>
      </div>

      {/* Search & Filter */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, background: "#ffffff", padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, boxShadow: S.card }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.inkFaint }}>🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Bidder name, GSTIN, or ID..."
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

      {/* Table */}
      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card, marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: `1px solid ${C.border}`, color: C.inkMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "14px 18px", width: 90 }}>BID</th>
              <th style={{ padding: "14px 18px" }}>BIDDER</th>
              <th style={{ padding: "14px 18px" }}>DOCUMENTS</th>
              <th style={{ padding: "14px 18px" }}>STATUS</th>
              <th style={{ padding: "14px 18px", textAlign: "right", width: 120 }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => {
              const badge = getStatusBadge(b.status);
              return (
                <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "14px 18px", fontFamily: F.mono, fontWeight: 800, color: C.navy }}>
                    {b.bidIdCode || b.id}
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontWeight: 700, color: C.ink, fontSize: 14 }}>{b.bidderName}</div>
                    <div style={{ fontSize: 12, color: C.inkFaint }}>GSTIN: {b.gstin} • Submitted {b.submittedAt}</div>
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700, background: "#f0fdf4", color: C.emerald }}>
                      {b.documentsSubmitted || `${b.documentsCount} / 10`}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px" }}>
                    <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700, background: badge.bg, color: badge.color }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    <Link
                      to={`/officer/bidders/${b.id}/documents`}
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
                      VIEW →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ padding: "14px 18px", background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }}>
        ℹ️ <strong>Evaluation Protocol:</strong> Select a bidder to inspect their statutory document package. AI forensic analysis is on-demand and strictly advisory; it is only executed when initiated by the Procurement Officer.
      </div>
    </div>
  );
};

export default OfficerBidders;
