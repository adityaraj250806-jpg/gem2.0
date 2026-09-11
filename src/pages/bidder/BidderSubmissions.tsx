import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { documentService, SubmittedBid } from "../../services/documentService";
import { bidderService } from "../../services/bidderService";
import { Bidder } from "../../data/bidders";
import { C, F, S } from "../../tokens";

interface EnrichedBid extends SubmittedBid {
  bidderRecord?: Bidder | null;
}

export const BidderSubmissions: React.FC = () => {
  const [bids, setBids] = useState<EnrichedBid[]>([]);
  const [clarificationModalBid, setClarificationModalBid] = useState<EnrichedBid | null>(null);
  const [clarificationText, setClarificationText] = useState("");
  const [submittingClarification, setSubmittingClarification] = useState(false);

  const loadBids = useCallback(async () => {
    const rawList = await documentService.getMyBids();
    const filtered = rawList.filter(
      b =>
        b.bidId !== "BID-001" &&
        b.bidId !== "001" &&
        b.bidId !== "BID-00231" &&
        b.bidId !== "BID-002270" &&
        b.bidId !== "BID-005" &&
        b.bidId !== "005" &&
        !b.bidId?.toLowerCase().includes("kavach") &&
        !b.tenderTitle?.toLowerCase().includes("kavach")
    );
    // Cross-reference with bidderService for live officer decision status
    const enriched: EnrichedBid[] = await Promise.all(
      filtered.map(async bid => {
        const bidderRecord = await bidderService.getBidderById(bid.bidId);
        return { ...bid, bidderRecord };
      })
    );
    setBids(enriched);
  }, []);

  useEffect(() => {
    loadBids();
    // Listen for officer decision events dispatched from OfficerDecisionModal & cross-tab storage events
    const handleUpdate = () => loadBids();
    window.addEventListener("gem_officer_decision_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("gem_officer_decision_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [loadBids]);

  const getLiveStatus = (bid: EnrichedBid): { label: string; bg: string; color: string; border: string } => {
    const decision = bid.bidderRecord?.officerDecision;
    const hasClarificationResponse = !!bid.bidderRecord?.clarificationResponse || bid.status === "CLARIFICATION SUBMITTED";
    if (decision === "QUALIFIED" || bid.status === "TECHNICALLY QUALIFIED" || bid.status === "Qualified") {
      return { label: "TECHNICALLY QUALIFIED", bg: "#f0fdf4", color: "#15803d", border: "#86efac" };
    }
    if (decision === "REJECTED" || bid.status === "DISQUALIFIED" || bid.status === "Disqualified") {
      return { label: "DISQUALIFIED", bg: "#fef2f2", color: "#dc2626", border: "#fca5a5" };
    }
    if (decision === "CLARIFICATION_REQUESTED" || bid.status === "CLARIFICATION REQUIRED" || bid.status === "Clarification Sent") {
      if (hasClarificationResponse) {
        return { label: "CLARIFICATION SUBMITTED", bg: "#f0fdf4", color: "#166534", border: "#86efac" };
      }
      return { label: "CLARIFICATION REQUIRED", bg: "#fffbeb", color: "#b45309", border: "#fcd34d" };
    }
    return { label: bid.status || "UNDER EVALUATION", bg: "#fffbeb", color: C.amber, border: "#fcd34d" };
  };

  const handleSubmitClarification = async () => {
    if (!clarificationText.trim()) return;
    const targetId = clarificationModalBid?.bidderRecord?.id || clarificationModalBid?.bidId || "BID-002";
    setSubmittingClarification(true);
    await bidderService.submitClarificationResponse(
      targetId,
      clarificationText.trim(),
      "Bidder_Technical_Clarification.pdf"
    );
    setSubmittingClarification(false);
    setClarificationModalBid(null);
    setClarificationText("");
    loadBids();
  };

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
          <p style={{ fontSize: 13, color: C.inkMuted, margin: 0 }}>Status synced live with the Officer Evaluation Portal</p>
        </div>
        <Link
          to="/bidder/tenders"
          style={{ padding: "9px 18px", borderRadius: 6, background: C.navy, color: "#ffffff", fontWeight: 700, fontSize: 13, textDecoration: "none" }}
        >
          + Participate in New Tender
        </Link>
      </div>

      <div style={{ background: "#ffffff", borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: S.card }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: `1px solid ${C.border}`, color: C.inkMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "14px 18px" }}>Bid ID</th>
              <th style={{ padding: "14px 18px" }}>Tender Reference &amp; Title</th>
              <th style={{ padding: "14px 18px" }}>Department</th>
              <th style={{ padding: "14px 18px" }}>Submitted On</th>
              <th style={{ padding: "14px 18px" }}>Documents</th>
              <th style={{ padding: "14px 18px" }}>Live Officer Status</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bids.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px 18px", textAlign: "center", color: C.inkFaint }}>
                  No bids submitted yet. <Link to="/bidder/tenders" style={{ color: C.navy, fontWeight: 700 }}>Browse tenders</Link>
                </td>
              </tr>
            ) : bids.map(bid => {
              const liveStatus = getLiveStatus(bid);
              const needsClarification =
                (bid.bidderRecord?.officerDecision === "CLARIFICATION_REQUESTED" ||
                  bid.status === "CLARIFICATION REQUIRED" ||
                  bid.status === "Clarification Sent") &&
                !bid.bidderRecord?.clarificationResponse &&
                bid.status !== "CLARIFICATION SUBMITTED";

              return (
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
                    <span style={{
                      padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700,
                      background: liveStatus.bg, color: liveStatus.color,
                      border: `1px solid ${liveStatus.border}`, display: "inline-block"
                    }}>
                      {liveStatus.label}
                    </span>

                    {/* Officer remarks shown for final decisions */}
                    {bid.bidderRecord?.officerRemarks &&
                      bid.bidderRecord?.officerDecision &&
                      bid.bidderRecord.officerDecision !== "CLARIFICATION_REQUESTED" && (
                        <div style={{ fontSize: 11, color: C.inkMuted, marginTop: 4, maxWidth: 240, lineHeight: 1.4 }}>
                          {bid.bidderRecord.officerRemarks.slice(0, 100)}{bid.bidderRecord.officerRemarks.length > 100 ? "..." : ""}
                        </div>
                      )}

                    {/* Clarification query preview */}
                    {bid.bidderRecord?.officerDecision === "CLARIFICATION_REQUESTED" &&
                      bid.bidderRecord?.officerRemarks && (
                        <div style={{
                          fontSize: 11, color: "#92400e", marginTop: 5, background: "#fffbeb",
                          border: "1px solid #fcd34d", borderRadius: 6, padding: "5px 8px",
                          maxWidth: 280, lineHeight: 1.4
                        }}>
                          <strong>Officer Query:</strong> &quot;{bid.bidderRecord.officerRemarks.slice(0, 80)}{bid.bidderRecord.officerRemarks.length > 80 ? "..." : ""}&quot;
                        </div>
                      )}
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                      <Link
                        to={`/bidder/tenders/${bid.tenderId}/documents`}
                        style={{
                          padding: "6px 14px", borderRadius: 6, border: `1px solid ${C.border}`,
                          background: "#ffffff", color: C.ink, fontSize: 12, fontWeight: 600, textDecoration: "none"
                        }}
                      >
                        View Package
                      </Link>

                      {/* Respond button — only when clarification is pending and not yet replied */}
                      {needsClarification && (
                        <button
                          onClick={() => {
                            setClarificationModalBid(bid);
                            setClarificationText(
                              "Regarding Item 14.2 actuator pump assembly: While the raw casting is German sourced, all precision CNC machining, motor integration, impeller fabrication, and final FAT pressure testing are executed at our Tiruvallur facility. Total domestic value addition is audited at 75.4% per attached Chartered Engineer certificate."
                            );
                          }}
                          style={{
                            padding: "7px 14px", borderRadius: 6, border: "none",
                            background: C.amber, color: "#ffffff", fontSize: 12,
                            fontWeight: 700, cursor: "pointer",
                            boxShadow: "0 2px 6px rgba(217,119,6,0.3)"
                          }}
                        >
                          Respond to Clarification
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Live sync footer note */}
      <div style={{
        marginTop: 16, padding: "10px 16px", background: "#f0f9ff",
        border: "1px solid #bae6fd", borderRadius: 8, fontSize: 12, color: "#0369a1",
        display: "flex", alignItems: "center", gap: 8
      }}>
        <span style={{ fontSize: 14 }}>&#x1F504;</span>
        <span><strong>Live Sync Active:</strong> Status updates automatically when the Officer evaluates your bid, runs AI verification, or issues a clarification request via the Officer Portal.</span>
      </div>

      {/* Clarification Response Modal */}
      {clarificationModalBid && (
        <div
          onClick={() => setClarificationModalBid(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 10000,
            background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, fontFamily: F.sans
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: 620, background: "#ffffff",
              borderRadius: 16, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", overflow: "hidden"
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: "18px 24px", borderBottom: `1px solid ${C.border}`,
              background: "#fffbeb", display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#92400e" }}>
                  Submit Technical Clarification Response
                </div>
                <div style={{ fontSize: 12, color: "#b45309", marginTop: 2 }}>
                  PPO 2017 Clause 9(a) — 48-hour Statutory Window Active
                </div>
              </div>
              <button
                onClick={() => setClarificationModalBid(null)}
                style={{ background: "transparent", border: "none", fontSize: 20, color: C.inkMuted, cursor: "pointer", padding: 4 }}
              >
                &#x2715;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Officer query display */}
              <div style={{ background: "#f8fafc", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.inkFaint, textTransform: "uppercase", marginBottom: 4 }}>
                  TEC Clarification Query (Tender Evaluation Committee):
                </div>
                <div style={{ fontSize: 13, color: C.ink, fontWeight: 600, lineHeight: 1.5 }}>
                  &quot;{clarificationModalBid.bidderRecord?.officerRemarks || "Discrepancy in Make in India local content vs imported technical line items."}&quot;
                </div>
                <div style={{ fontSize: 11, color: C.inkFaint, marginTop: 6 }}>
                  DSC Token: {clarificationModalBid.bidderRecord?.officerDscToken || "DSC-88219-AUTH"} &bull;
                  Audit Ref: {clarificationModalBid.bidderRecord?.officerAuditRef || "AUDIT-TEC-9021"}
                </div>
              </div>

              {/* Response textarea */}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 6 }}>
                  Your Official Technical Response / Clarification:
                </label>
                <textarea
                  value={clarificationText}
                  onChange={e => setClarificationText(e.target.value)}
                  rows={6}
                  style={{
                    width: "100%", padding: "10px 12px",
                    border: `1.5px solid ${C.border}`, borderRadius: 8,
                    fontSize: 13, fontFamily: F.sans, color: C.ink,
                    resize: "vertical", boxSizing: "border-box", lineHeight: 1.6
                  }}
                  placeholder="Provide detailed technical justification with documentary evidence..."
                />
                <div style={{ fontSize: 11, color: C.inkFaint, marginTop: 4 }}>
                  Your response will be transmitted to the TEC and permanently recorded in the GeM audit trail.
                </div>
              </div>

              {/* Attachment auto-link notice */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8, background: "#eff6ff",
                border: "1px solid #bfdbfe", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: C.navy
              }}>
                <span>&#x1F4CE;</span>
                <span><strong>Attachment:</strong> Bidder_Technical_Clarification.pdf will be auto-linked to your response</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "14px 24px", borderTop: `1px solid ${C.border}`,
              display: "flex", justifyContent: "flex-end", gap: 12, background: "#f8fafc"
            }}>
              <button
                onClick={() => setClarificationModalBid(null)}
                disabled={submittingClarification}
                style={{
                  padding: "8px 18px", borderRadius: 6, border: `1px solid ${C.border}`,
                  background: "#ffffff", color: C.ink, fontWeight: 600, fontSize: 13, cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitClarification}
                disabled={submittingClarification || !clarificationText.trim()}
                style={{
                  padding: "8px 22px", borderRadius: 6, border: "none",
                  background: C.amber, color: "#ffffff", fontWeight: 700,
                  fontSize: 13, cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(217,119,6,0.3)"
                }}
              >
                {submittingClarification ? "Submitting..." : "Submit Clarification to TEC"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidderSubmissions;


