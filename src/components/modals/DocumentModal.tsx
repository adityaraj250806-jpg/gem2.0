import React from "react";
import { DocumentItem } from "../../data/documents";
import { C, F } from "../../tokens";

interface DocumentModalProps {
  doc: DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ doc, onClose }) => {
  if (!doc) return null;

  const content = doc.content || {};

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: F.sans
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 720,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc"
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>
              📄 {doc.title}
            </div>
            <div style={{ fontSize: 12, color: C.inkFaint }}>{doc.fileName} • {doc.fileSize}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 20,
              color: C.inkMuted,
              cursor: "pointer",
              padding: 4
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", overflowY: "auto" }}>
          {doc.id === "doc-gst" && (
            <div style={{ border: "2px solid #0b3d91", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #0b3d91", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>GOVERNMENT OF INDIA • GOODS AND SERVICES TAX</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: "4px 0" }}>Registration Certificate</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Issued under Section 25 of the Central Goods and Services Tax Act, 2017</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>GSTIN:</strong> <span style={{ fontFamily: F.mono, color: C.navy, fontWeight: 700 }}>{content.registrationNumber}</span></div>
                <div><strong>Legal Name:</strong> {content.legalName}</div>
                <div><strong>Trade Name:</strong> {content.tradeName}</div>
                <div><strong>Date of Liability:</strong> {content.dateOfLiability}</div>
                <div><strong>Validity:</strong> <span style={{ color: C.emerald, fontWeight: 700 }}>{content.validity}</span></div>
                <div><strong>Taxpayer Type:</strong> {content.typeOfTaxpayer}</div>
                <div style={{ gridColumn: "span 2" }}><strong>Jurisdiction:</strong> {content.jurisdiction}</div>
              </div>
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: 10, borderRadius: 6, marginTop: 16, fontSize: 12, color: C.navy }}>
                ✓ <strong>Digital Signature Verification:</strong> Validated via Central Board of Indirect Taxes & Customs (CBIC).
              </div>
            </div>
          )}

          {doc.id === "doc-pan" && (
            <div style={{ border: "2px solid #0284c7", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #0284c7", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>INCOME TAX DEPARTMENT • GOVT. OF INDIA</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#0284c7", margin: "4px 0" }}>Permanent Account Number Card</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Under Section 139A of the Income Tax Act, 1961</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>PAN:</strong> <span style={{ fontFamily: F.mono, color: C.navy, fontWeight: 700 }}>{content.panNumber}</span></div>
                <div><strong>Name:</strong> {content.name}</div>
                <div><strong>Incorporation Date:</strong> {content.incorporationDate}</div>
                <div><strong>Issuing Authority:</strong> {content.issuingAuthority}</div>
              </div>
            </div>
          )}

          {doc.id === "doc-udyam" && (
            <div style={{ border: "2px solid #059669", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #059669", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>MINISTRY OF MICRO, SMALL & MEDIUM ENTERPRISES</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.emerald, margin: "4px 0" }}>UDYAM REGISTRATION CERTIFICATE</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Government of India Enterprise Verification</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>Udyam Number:</strong> <span style={{ fontFamily: F.mono, color: C.emerald, fontWeight: 700 }}>{content.udyamNumber}</span></div>
                <div><strong>Enterprise:</strong> {content.enterpriseName}</div>
                <div><strong>Classification:</strong> {content.classification}</div>
                <div><strong>Turnover:</strong> {content.turnover}</div>
                <div style={{ gridColumn: "span 2" }}><strong>Major Activity:</strong> {content.majorActivity}</div>
              </div>
            </div>
          )}

          {doc.id === "doc-mii" && (
            <div style={{ border: "2px solid #d97706", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #d97706", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>STATUTORY DECLARATION ON COMPANY LETTERHEAD</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.amber, margin: "4px 0" }}>Make in India Local Content Certificate</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Public Procurement Order 2017</div>
              </div>
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: 12, borderRadius: 6, marginBottom: 14, color: "#92400e", fontWeight: 700 }}>
                LOCAL CONTENT CLAIMED: {content.claimedLocalContent} ({content.supplierClassification})
              </div>
              <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.5 }}>{content.statutoryDeclaration}</p>
              <div style={{ fontSize: 13, marginTop: 10 }}><strong>Location:</strong> {content.locationOfValueAddition}</div>
            </div>
          )}

          {!["doc-gst", "doc-pan", "doc-udyam", "doc-mii"].includes(doc.id) && (
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>{doc.title}</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Category: {doc.category}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
                {Object.entries(content).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 8 }}>
                    <strong style={{ textTransform: "capitalize", minWidth: 160 }}>{k.replace(/([A-Z])/g, " $1")}:</strong>
                    <span>{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 24px",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            justifyContent: "flex-end",
            background: "#f8fafc"
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              background: "#ffffff",
              color: C.ink,
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer"
            }}
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
