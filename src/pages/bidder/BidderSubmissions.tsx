import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { documentService, SubmittedBid } from "../../services/documentService";
import { C, F, S } from "../../tokens";

export const BidderSubmissions: React.FC = () => {
  const [bids, setBids] = useState<SubmittedBid[]>([]);

  useEffect(() => {
    documentService.getMyBids().then(setBids);
  }, []);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", fontFamily: F.sans }}>
      {/* Breadcrumbs */}
      <div style={{ fontSize: 12, color: C.inkFaint, marginBottom: 16 }}>
        <Link to="/bidder/dashboard" style={{ color: C.navy, textDecoration: "none", fontWeight: 600 }}>Home</Link>
        {" / "}
        <span style={{ color: C.ink }}>My Bids</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: "0 0 4px" }}>My Submitted Bids</h1>
          <p style={{ fontSize: 13, color: C.inkMuted, margin: 0 }}>Track status and submission timestamps of your enterprise bids</p>
        </div>
        <Link
          to="/bidder/tenders"
          style={{
            padding: "9px 18px",
            borderRadius: 6,
            background: C.navy,
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none"
          }}
        >
          + Participate in New Tender
        </Link>
      </div>

      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: `1px solid ${C.border}`, color: C.inkMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "14px 18px" }}>Bid ID</th>
              <th style={{ padding: "14px 18px" }}>Tender Reference & Title</th>
              <th style={{ padding: "14px 18px" }}>Department</th>
              <th style={{ padding: "14px 18px" }}>Submitted On</th>
              <th style={{ padding: "14px 18px" }}>Documents</th>
              <th style={{ padding: "14px 18px" }}>Status</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bids.map(bid => (
              <tr key={bid.bidId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 18px", fontFamily: F.mono, fontWeight: 700, color: C.navy }}>
                  {bid.bidId}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ fontWeight: 600, color: C.ink }}>{bid.tenderTitle}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: C.navy }}>{bid.tenderRef}</div>
                </td>
                <td style={{ padding: "14px 18px", color: C.inkMuted }}>{bid.department}</td>
                <td style={{ padding: "14px 18px", fontSize: 12, color: C.inkFaint }}>{bid.submissionDate}</td>
                <td style={{ padding: "14px 18px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, background: "#f1f5f9", color: C.ink }}>
                    {bid.documentsCount || 10} / 10 Uploaded
                  </span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: 12, fontSize: 11, fontWeight: 700, background: "#fffbeb", color: C.amber }}>
                    {bid.status}
                  </span>
                </td>
                <td style={{ padding: "14px 18px", textAlign: "right" }}>
                  <Link
                    to={`/bidder/tenders/${bid.tenderId}/documents`}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 6,
                      border: `1px solid ${C.border}`,
                      background: "#ffffff",
                      color: C.ink,
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none"
                    }}
                  >
                    View Package
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

export default BidderSubmissions;
