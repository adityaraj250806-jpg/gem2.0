import React, { useState } from "react";
import { DocumentItem } from "../../data/documents";
import { C, F } from "../../tokens";
import { DEMO_DOCUMENTS, downloadDemoPdf, getNonBlacklistingAffidavitText } from "../../utils/demoDocuments";

interface DocumentModalProps {
  doc: DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ doc, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!doc) return null;

  const content = doc.content || {};

  const handleDownloadFile = () => {
    // Check if matched in DEMO_DOCUMENTS
    const match = DEMO_DOCUMENTS.find(d => d.id === doc.id || d.fileName === doc.fileName);
    if (match) {
      downloadDemoPdf(match);
    } else {
      // Direct link fallback
      const link = document.createElement("a");
      link.href = `/demo-documents/${doc.fileName || "document.pdf"}`;
      link.download = doc.fileName || "Statutory_Document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyAffidavit = () => {
    const text = getNonBlacklistingAffidavitText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(15, 23, 42, 0.7)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: F.sans
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 780,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          display: "flex",
          flexDirection: "column",
          maxHeight: "92vh",
          overflow: "hidden",
          border: `1px solid ${C.border}`
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc"
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.ink, display: "flex", alignItems: "center", gap: 8 }}>
              <span>📄</span>
              <span>{doc.title}</span>
            </div>
            <div style={{ fontSize: 12, color: C.inkFaint, marginTop: 2 }}>
              {doc.fileName} • {doc.fileSize} • Category: <strong style={{ color: C.navy }}>{doc.category || "Statutory Compliance"}</strong>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={handleDownloadFile}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                background: "#ffffff",
                color: C.navy,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5
              }}
              title="Download official PDF copy to your computer"
            >
              <span>📥</span> Download PDF
            </button>

            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: C.inkMuted,
                cursor: "pointer",
                padding: 4,
                lineHeight: 1
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px", overflowY: "auto" }}>
          {doc.fileDataUrl && (
            <div style={{ marginBottom: 20, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, background: "#f8fafc" }}>
              <div style={{ padding: "10px 16px", background: "#f1f5f9", fontSize: 12, fontWeight: 700, color: C.navy, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>📁 Attached Document File: {doc.fileName}</span>
                <span style={{ fontSize: 11, color: C.emerald, fontWeight: 700 }}>● Active Bidder Attachment</span>
              </div>
              <div style={{ padding: 12, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 180, background: "#ffffff" }}>
                {doc.fileDataUrl.startsWith("data:image/") ? (
                  <img src={doc.fileDataUrl} alt={doc.fileName} style={{ maxWidth: "100%", maxHeight: 420, objectFit: "contain", borderRadius: 6 }} />
                ) : doc.fileDataUrl.startsWith("data:application/pdf") ? (
                  <iframe src={doc.fileDataUrl} title={doc.fileName} style={{ width: "100%", height: 420, border: "none" }} />
                ) : (
                  <div style={{ textAlign: "center", padding: 24, color: C.inkMuted }}>
                    <span style={{ fontSize: 36 }}>📄</span>
                    <div style={{ fontWeight: 700, marginTop: 8, color: C.ink }}>{doc.fileName}</div>
                    <div style={{ fontSize: 12, color: C.inkFaint }}>Attached from Local File System ({doc.fileSize})</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 10. NON-BLACKLISTING & INTEGRITY UNDERTAKING (STAMP PAPER AFFIDAVIT) */}
          {(doc.id === "doc-undertaking" || doc.fileName?.includes("Blacklisting") || doc.fileName?.includes("Undertaking")) && (
            <div style={{ border: "2px solid #b45309", borderRadius: 10, overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(180,83,9,0.12)" }}>
              {/* e-Stamp Paper Header Banner */}
              <div style={{ background: "linear-gradient(135deg, #78350f 0%, #b45309 50%, #92400e 100%)", color: "#ffffff", padding: "16px 20px", textAlign: "center", borderBottom: "3px solid #f59e0b" }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.9, fontWeight: 700 }}>
                  GOVERNMENT OF INDIA • NON-JUDICIAL e-STAMP CERTIFICATE
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 0.5, margin: "4px 0" }}>
                  e-STAMP DUTY: ₹100/- (ONE HUNDRED RUPEES)
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 12, background: "rgba(0,0,0,0.25)", display: "inline-block", padding: "3px 12px", borderRadius: 4, marginTop: 2 }}>
                  Certificate No: {content.stampSerialNumber || "IN-DL10928471928475K"}
                </div>
              </div>

              {/* Certificate Particulars Table */}
              <div style={{ background: "#fffbeb", padding: "14px 18px", borderBottom: "1px solid #fde68a", fontSize: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div><strong>Purchased By:</strong> {content.legalName || content.deponentName || "APPLICANT ENTITY"}</div>
                <div><strong>Execution Date:</strong> {content.notarizedDate || "28/08/2026"}</div>
                <div><strong>Description of Doc:</strong> Article 4 Affidavit / Undertaking</div>
                <div><strong>Consideration Price:</strong> ₹100/- (Stamp Duty Paid)</div>
                <div style={{ gridColumn: "span 2" }}>
                  <strong>Statutory Clause:</strong> <span style={{ color: "#b45309", fontWeight: 700 }}>Rule 151 of General Financial Rules (GFR) 2017 & GeM Incident Management Policy</span>
                </div>
              </div>

              {/* Sworn Affidavit Text */}
              <div style={{ padding: "20px", background: "#fafafa" }}>
                <div style={{ textAlign: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, letterSpacing: 0.5 }}>
                    AFFIDAVIT & SOLEMN UNDERTAKING
                  </div>
                  <div style={{ fontSize: 11.5, color: C.inkFaint }}>
                    Before the Tender Inviting Authority • CPCL / Government e-Marketplace (GeM)
                  </div>
                </div>

                <div style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ margin: 0 }}>
                    I, <strong>{content.signatoryName || "Authorized Signatory"}</strong>, {content.signatoryDesignation || "Managing Director / Authorized Partner"} of <strong>M/s {content.legalName || content.deponentName || "BIDDER ENTITY"}</strong>, {content.address || "Registered Address"}, do hereby solemnly swear and state on oath:
                  </p>

                  <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: C.navy, marginBottom: 4 }}>
                      1. Status of Non-Debarment & Non-Blacklisting:
                    </div>
                    <div>
                      {content.solemnAffirmation || `We hereby solemnly affirm and state on oath that M/s ${content.legalName || "our firm"}, its directors, partners, and key managerial personnel have never been blacklisted, debarred, suspended, or put on holiday list by GeM, Ministry of Petroleum & Natural Gas, CPCL, any Central/State Government Ministry, PSU, or multilateral funding agency. We also confirm full compliance with the Integrity Pact without any conflict of interest.`}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}>
                      <strong>2. GFR Rule 151 Compliance:</strong>
                      <div style={{ color: C.emerald, fontWeight: 700, marginTop: 2 }}>✓ Fully Compliant (No debarment orders)</div>
                    </div>
                    <div style={{ background: "#ffffff", padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12 }}>
                      <strong>3. Insolvency / Bankruptcy (IBC):</strong>
                      <div style={{ color: C.emerald, fontWeight: 700, marginTop: 2 }}>✓ Nil / Fully Solvent Operating Concern</div>
                    </div>
                  </div>
                </div>

                {/* Notary Seal & Signatures Block */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px dashed #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>DEPONENT / AUTHORIZED SIGNATORY</div>
                    <div style={{ fontFamily: "cursive", fontSize: 18, color: C.navy, margin: "6px 0 2px" }}>{content.signatoryName || "Authorized Signatory"}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{content.signatoryName || "Authorized Signatory"}</div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>{content.signatoryDesignation || "Director / Authorized Partner"}, {content.legalName || "Bidder Entity"}</div>
                    <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 2 }}>{content.signatoryId || "Corporate Seal Affixed"}</div>
                  </div>

                  {/* Red Notary Stamp */}
                  <div style={{ width: 130, height: 130, borderRadius: "50%", border: "2.5px solid #dc2626", color: "#dc2626", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 6, transform: "rotate(-6deg)", background: "rgba(220,38,38,0.03)" }}>
                    <div style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>{content.notaryName || "R. SHANMUGAM"}</div>
                    <div style={{ fontSize: 7, fontWeight: 700, margin: "2px 0" }}>ADVOCATE & NOTARY</div>
                    <div style={{ fontSize: 8, fontWeight: 900 }}>GOVT. OF INDIA</div>
                    <div style={{ fontSize: 7 }}>{content.notaryRegNo || "REG. NO. 4412/2014"}</div>
                    <div style={{ fontSize: 8, fontWeight: 700, marginTop: 2 }}>{content.notaryLocation || "CHENNAI - INDIA"}</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>ATTESTED & REGISTERED BY</div>
                    <div style={{ fontFamily: "cursive", fontSize: 18, color: "#dc2626", margin: "6px 0 2px" }}>{content.notaryName || "Notary Advocate"}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{content.notaryAdvocate || content.notaryName || "R. Shanmugam, B.Sc., B.L."}</div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>Notarial Register Vol. IX, Entry: 1428/2026</div>
                    <div style={{ fontSize: 10, color: C.emerald, fontWeight: 700, marginTop: 2 }}>● Valid through {content.notaryValidity || "14-06-2029"}</div>
                  </div>
                </div>

                <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", padding: 10, borderRadius: 6, marginTop: 16, fontSize: 12, color: "#065f46", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                  <span>✓ <strong>Cross-System Verification:</strong> Matched with CPPP Debarment Registry & GeM Incident System.</span>
                  <button
                    onClick={handleCopyAffidavit}
                    style={{
                      background: "#059669",
                      color: "#ffffff",
                      border: "none",
                      padding: "4px 10px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    {copied ? "✓ Copied to Clipboard!" : "📋 Copy Affidavit Text"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 1. AUTHENTIC FORM GST REG-06 (Matches Official CBIC / GST Portal Registration Certificate) */}
          {(doc.id === "doc-gst" || doc.fileName?.toLowerCase().includes("gst") || doc.title?.toLowerCase().includes("gst")) && (
            <div style={{ background: "#ffffff", border: "1.5px solid #0f172a", borderRadius: 4, padding: "24px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", color: "#000000", fontFamily: "Arial, sans-serif" }}>
              {/* Government Header */}
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 26, lineHeight: 1 }}>🏛️</div>
                <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: 0.5 }}>सत्यमेव जयते</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>Government of India</div>
                <div style={{ fontSize: 15, fontWeight: 800, margin: "3px 0" }}>Form GST REG-06</div>
                <div style={{ fontSize: 11, fontStyle: "italic", marginBottom: 6 }}>[See Rule 10(1)]</div>
                <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 0.5 }}>Registration Certificate</div>
              </div>

              {/* Registration Number Row */}
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                Registration Number : <span style={{ fontFamily: F.mono, letterSpacing: 0.5 }}>{content.registrationNumber || "GSTIN"}</span>
              </div>

              {/* Official 9-Row Government Table */}
              <div style={{ border: "1.5px solid #000000", fontSize: 12 }}>
                {/* 1. Legal Name */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>1.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Legal Name</div>
                  <div style={{ padding: "6px 8px", textTransform: "uppercase", fontWeight: 600 }}>{content.legalName || "ENTERPRISE LEGAL NAME"}</div>
                </div>

                {/* 2. Trade Name */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>2.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Trade Name, if any</div>
                  <div style={{ padding: "6px 8px", textTransform: "uppercase", fontWeight: 600 }}>{content.tradeName || content.legalName || "TRADE NAME"}</div>
                </div>

                {/* 3. Constitution of Business */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>3.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Constitution of Business</div>
                  <div style={{ padding: "6px 8px" }}>{content.constitutionOfBusiness || "Company"}</div>
                </div>

                {/* 4. Address */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>4.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Address of Principal Place of Business</div>
                  <div style={{ padding: "6px 8px" }}>{content.principalAddress || content.address || "Principal Place of Business"}</div>
                </div>

                {/* 5. Date of Liability */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>5.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Date of Liability</div>
                  <div style={{ padding: "6px 8px" }}>{content.dateOfLiability || "01/07/2017"}</div>
                </div>

                {/* 6. Period of Validity */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 60px 110px 40px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>6.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Period of Validity</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000" }}>From</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000" }}>{content.dateOfLiability || "01/07/2017"}</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000" }}>To</div>
                  <div style={{ padding: "6px 8px" }}>NA</div>
                </div>

                {/* 7. Type of Registration + QR Code */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr 120px", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>7.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Type of Registration</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000" }}>{content.typeOfTaxpayer || "Regular"}</div>
                  {/* QR Code */}
                  <div style={{ padding: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 80, height: 80, background: "#000000", padding: 3, borderRadius: 2, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2 }}>
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} style={{ background: [0, 1, 3, 4, 5, 8, 12, 16, 20, 21, 23, 24].includes(i) ? "#ffffff" : "#000000" }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 8. Approving Authority */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>8.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Particulars of Approving Authority</div>
                  <div style={{ padding: "6px 8px" }}>{content.approvingState || "State GST Authority"}</div>
                </div>

                {/* Signature Section */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr", borderBottom: "1px solid #000000", minHeight: 70 }}>
                  <div style={{ padding: "8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Signature</div>
                  <div style={{ padding: "10px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fef08a", border: "2px solid #ca8a04", color: "#854d0e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>?</div>
                    <div style={{ fontSize: 10.5, lineHeight: 1.3, color: "#1e293b" }}>
                      <div style={{ fontWeight: 800 }}>Signature Validated</div>
                      <div>Digitally signed by DS GOODS AND SERVICES TAX NETWORK 1</div>
                      <div>Date: {content.dscTimestamp || "2017.08.28 14:15:32 IST"}</div>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Name</div>
                  <div style={{ padding: "6px 8px" }}>{content.officerName || "Superintendent of GST"}</div>
                </div>

                {/* Designation */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Designation</div>
                  <div style={{ padding: "6px 8px" }}>{content.officerDesignation || "GST Officer"}</div>
                </div>

                {/* Jurisdictional Office */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Jurisdictional Office</div>
                  <div style={{ padding: "6px 8px" }}>{content.jurisdiction || "Ward / Circle"}</div>
                </div>

                {/* 9. Date of issue */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>9. Date of issue of Certificate</div>
                  <div style={{ padding: "6px 8px" }}>{content.issueDate || "28/08/2017"}</div>
                </div>
              </div>

              {/* Note footer */}
              <div style={{ marginTop: 10, fontSize: 11, fontStyle: "italic", color: "#334155" }}>
                Note: The registration certificate is required to be prominently displayed at all places of business in the State.
              </div>
            </div>
          )}

          {/* 2. AUTHENTIC e-PAN CARD DESIGN (Matches Official NSDL / Income Tax Dept Format) */}
          {doc.id === "doc-pan" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Official Gazette Badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 16px", borderRadius: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#166534", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>✓</span> Central Board of Direct Taxes (CBDT) • Verified Permanent Account Number
                </span>
                <span style={{ fontSize: 11, fontFamily: F.mono, color: "#15803d", fontWeight: 800 }}>
                  PAN: {content.panNumber || "AABCA1234F"}
                </span>
              </div>

              {/* Realistic Two-Sided PAN Card Container */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 16,
                  background: "#e2e8f0",
                  padding: 16,
                  borderRadius: 14,
                  border: "1.5px dashed #94a3b8"
                }}
              >
                {/* ─── FRONT SIDE OF PAN CARD ─── */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 70%, #dbeafe 100%)",
                    borderRadius: 12,
                    padding: "16px 18px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.7)",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid #93c5fd",
                    minHeight: 230,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  {/* Subtle Security Guilloche Pattern Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.08,
                      pointerEvents: "none",
                      backgroundImage: "radial-gradient(#1e3a8a 1px, transparent 1px)",
                      backgroundSize: "8px 8px"
                    }}
                  />

                  {/* Top Header */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      {/* Left: Department */}
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#831843", fontFamily: "serif", letterSpacing: "0.02em" }}>
                          आयकर विभाग
                        </div>
                        <div style={{ fontSize: 9.5, fontWeight: 900, color: "#831843", fontFamily: "serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                          INCOME TAX DEPARTMENT
                        </div>
                      </div>

                      {/* Center: Ashok Stambh Emblem */}
                      <div style={{ textAlign: "center", margin: "0 8px" }}>
                        <div style={{ fontSize: 22, color: "#1e3a8a", lineHeight: 1 }}>🏛️</div>
                        <div style={{ fontSize: 7, fontWeight: 800, color: "#1e3a8a", letterSpacing: 0.5 }}>सत्यमेव जयते</div>
                      </div>

                      {/* Right: Government */}
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, fontWeight: 900, color: "#831843", fontFamily: "serif", letterSpacing: "0.02em" }}>
                          भारत सरकार
                        </div>
                        <div style={{ fontSize: 9.5, fontWeight: 900, color: "#831843", fontFamily: "serif", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                          GOVT. OF INDIA
                        </div>
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div style={{ textAlign: "center", marginTop: 4 }}>
                      <div style={{ fontSize: 9.5, fontWeight: 800, color: "#1e3a8a" }}>
                        ई-स्थायी लेखा संख्या कार्ड
                      </div>
                      <div style={{ fontSize: 8, fontWeight: 700, color: "#1e40af", letterSpacing: 0.3 }}>
                        e-Permanent Account Number Card
                      </div>
                    </div>
                  </div>

                  {/* Middle Row: QR Code, Permanent Account Number, Hologram */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 0 6px" }}>
                    {/* QR Code */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: "#ffffff",
                        borderRadius: 4,
                        border: "1px solid #cbd5e1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 26,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                      }}
                      title="Digitally Encrypted CBDT QR Code"
                    >
                      📱
                    </div>

                    {/* Prominent PAN Number */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 8.5, fontWeight: 800, color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Permanent Account Number
                      </div>
                      <div
                        style={{
                          fontSize: 19,
                          fontWeight: 900,
                          fontFamily: F.mono,
                          color: "#0f172a",
                          letterSpacing: "0.12em",
                          textShadow: "0 1px 0 rgba(255,255,255,0.8)"
                        }}
                      >
                        {content.panNumber || "AABCA1234F"}
                      </div>
                    </div>

                    {/* Hologram */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 4,
                        background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 25%, #f8fafc 50%, #94a3b8 75%, #e2e8f0 100%)",
                        border: "1px solid #94a3b8",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                        opacity: 0.95
                      }}
                      title="Authentic Optical Variable Security Hologram"
                    >
                      <div style={{ fontSize: 6.5, fontWeight: 900, color: "#64748b", letterSpacing: 0.8 }}>HOLO</div>
                      <div style={{ fontSize: 13 }}>🛡️</div>
                      <div style={{ fontSize: 6.5, fontWeight: 900, color: "#64748b", letterSpacing: 0.8 }}>GRAM</div>
                    </div>
                  </div>

                  {/* Bottom Row: Name/DOB details, Signature box, Photo box */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 10 }}>
                    {/* Left: Entity Name & Father's Name */}
                    <div style={{ flex: 1, fontSize: 10.5, lineHeight: 1.35 }}>
                      <div>
                        <div style={{ fontSize: 8, color: "#475569", fontWeight: 700 }}>नाम / Name</div>
                        <div style={{ fontWeight: 900, color: "#0f172a", textTransform: "uppercase", letterSpacing: 0.2 }}>
                          {content.name || content.legalName || "TAX PAYER NAME"}
                        </div>
                      </div>

                      <div style={{ marginTop: 4 }}>
                        <div style={{ fontSize: 8, color: "#475569", fontWeight: 700 }}>पिता का नाम / Father's Name</div>
                        <div style={{ fontWeight: 800, color: "#1e293b", textTransform: "uppercase" }}>
                          {content.fathersName || "N/A (CORPORATE ENTITY)"}
                        </div>
                      </div>

                      <div style={{ marginTop: 4 }}>
                        <div style={{ fontSize: 8, color: "#475569", fontWeight: 700 }}>जन्म की तारीख / Date of Birth / Inc.</div>
                        <div style={{ fontWeight: 800, color: "#1e293b", fontFamily: F.mono }}>
                          {content.incorporationDate || "01/01/2010"}
                        </div>
                      </div>
                    </div>

                    {/* Center-Right: Signature Box */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: 80,
                          height: 28,
                          background: "rgba(255,255,255,0.85)",
                          borderRadius: 4,
                          border: "1px solid #94a3b8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "cursive",
                          fontSize: 13,
                          color: "#1e3a8a"
                        }}
                      >
                        {content.signatoryName || content.name || "Authorized Signatory"}
                      </div>
                      <div style={{ fontSize: 7, color: "#475569", fontWeight: 700, marginTop: 2 }}>
                        हस्ताक्षर / Signature
                      </div>
                    </div>

                    {/* Right: Photo Frame */}
                    <div
                      style={{
                        width: 58,
                        height: 70,
                        background: "#ffffff",
                        borderRadius: 4,
                        border: "1.5px solid #64748b",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        flexShrink: 0
                      }}
                    >
                      <span style={{ fontSize: 32 }}>👤</span>
                      <span style={{ fontSize: 6.5, color: "#64748b", fontWeight: 700 }}>PHOTO</span>
                    </div>
                  </div>
                </div>

                {/* ─── BACK SIDE OF PAN CARD ─── */}
                <div
                  style={{
                    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 30%, #93c5fd 70%, #dbeafe 100%)",
                    borderRadius: 12,
                    padding: "16px 18px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.7)",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid #93c5fd",
                    minHeight: 230,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 900, color: "#0f172a", lineHeight: 1.35 }}>
                      इस कार्ड के खोने/पाने पर कृपया सूचित करें/लौटाएं:
                    </div>
                    <div style={{ fontSize: 8.5, color: "#1e293b", marginTop: 2, lineHeight: 1.3 }}>
                      <strong>आयकर पैन सेवा इकाई, एन एस डी एल</strong><br />
                      5 वीं मंजिल, मंत्री स्टर्लिंग, प्लॉट नं. 341, सर्वे नं. 997/8,<br />
                      मॉडल कॉलोनी, दीप बंगला चौक के पास, पुणे - 411 016.
                    </div>

                    <div style={{ borderTop: "1px dashed rgba(30,58,138,0.3)", margin: "8px 0" }} />

                    <div style={{ fontSize: 9.5, fontWeight: 900, color: "#0f172a", lineHeight: 1.35, fontStyle: "italic" }}>
                      If this card is lost / someone's lost card is found, please inform / return to :
                    </div>
                    <div style={{ fontSize: 8.5, color: "#1e293b", marginTop: 2, lineHeight: 1.3 }}>
                      <strong>Income Tax PAN Services Unit, NSDL</strong><br />
                      5th Floor, Mantri Sterling, Plot No. 341, Survey No. 997/8,<br />
                      Model Colony, Near Deep Bungalow Chowk, Pune - 411 016.
                    </div>
                  </div>

                  {/* Contact & Verification Footer */}
                  <div style={{ background: "rgba(255,255,255,0.7)", padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.9)", fontSize: 8.5, color: "#1e3a8a", lineHeight: 1.4 }}>
                    <div><strong>Tel:</strong> 91-20-2721 8080, <strong>Fax:</strong> 91-20-2721 8081</div>
                    <div><strong>e-mail:</strong> tininfo@nsdl.co.in • <strong>Web:</strong> www.incometax.gov.in</div>
                    <div style={{ marginTop: 2, fontSize: 7.5, color: "#059669", fontWeight: 800 }}>
                      ✓ Authenticated Corporate Permanent Account Number under Section 139A of IT Act 1961
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Verification Table */}
              <div style={{ background: "#ffffff", padding: "14px 18px", borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 12 }}>
                <div style={{ fontWeight: 800, color: C.navy, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>📋</span> Extracted PAN Card Parameters (Direct CBDT/ITD Match):
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
                  <div><strong>PAN Number:</strong> <span style={{ fontFamily: F.mono, color: C.navy, fontWeight: 700 }}>{content.panNumber || "PAN"}</span></div>
                  <div><strong>Entity Legal Name:</strong> {content.name || content.legalName || "TAX PAYER NAME"}</div>
                  <div><strong>Date of Incorporation:</strong> {content.incorporationDate || "01/01/2010"}</div>
                  <div><strong>Issuing Authority:</strong> {content.issuingAuthority || "Income Tax Department, Government of India"}</div>
                  <div style={{ gridColumn: "span 2", color: C.emerald, fontWeight: 700 }}>
                    ✓ Corporate CIN & MCA Database Cross-Check: {content.cin ? `Verified & Matched (${content.cin})` : "Verified & Active on MCA Registry"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. AUTHENTIC UDYAM REGISTRATION CERTIFICATE (Matches Ministry of MSME Format) */}
          {(doc.id === "doc-udyam" || doc.fileName?.toLowerCase().includes("udyam") || doc.title?.toLowerCase().includes("udyam")) && (
            <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 4, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontFamily: "Arial, sans-serif", color: "#0f172a" }}>
              {/* Deep Navy/Purple Textured Header Banner */}
              <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #1e1b4b 100%)", color: "#ffffff", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Left: Ashok Stambh Emblem */}
                <div style={{ textAlign: "center", minWidth: 60 }}>
                  <div style={{ fontSize: 24, lineHeight: 1 }}>🏛️</div>
                  <div style={{ fontSize: 7, fontWeight: 800, letterSpacing: 0.5, marginTop: 2 }}>सत्यमेव जयते</div>
                </div>

                {/* Center: Ministry Header */}
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, fontFamily: "serif" }}>भारत सरकार</div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>Government of India</div>
                  <div style={{ fontSize: 11, fontWeight: 800, fontFamily: "serif" }}>सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय</div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.2 }}>Ministry of Micro, Small and Medium Enterprises</div>
                </div>

                {/* Right: MSME Logo */}
                <div style={{ textAlign: "center", minWidth: 90, borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: 2, color: "#93c5fd" }}>MSME</div>
                  <div style={{ fontSize: 6.5, lineHeight: 1.1, opacity: 0.9 }}>सूक्ष्म, लघु एवं मध्यम उद्यम<br />MICRO, SMALL & MEDIUM ENTERPRISES</div>
                </div>
              </div>

              <div style={{ padding: "20px 24px" }}>
                {/* Title */}
                <div style={{ textAlign: "center", fontSize: 16, fontWeight: 900, letterSpacing: 0.5, color: "#0f172a", marginBottom: 16, borderBottom: "1px solid #e2e8f0", paddingBottom: 8 }}>
                  UDYAM REGISTRATION CERTIFICATE
                </div>

                {/* Details Grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 11.5 }}>
                  {/* Row 1: Udyam Reg Number */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>UDYAM REGISTRATION NUMBER</div>
                    <div style={{ fontFamily: F.mono, fontWeight: 800, color: "#1e3a8a", fontSize: 13 }}>{content.udyamNumber || "UDYAM-TN-02-0045892"}</div>
                  </div>

                  {/* Row 2: Name of Enterprise */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>NAME OF ENTERPRISE</div>
                    <div style={{ fontWeight: 800, textTransform: "uppercase", fontSize: 12.5 }}>{content.enterpriseName || content.legalName || "ENTERPRISE NAME"}</div>
                  </div>

                  {/* Row 3: Type of Enterprise Table */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "flex-start" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase", paddingTop: 4 }}>TYPE OF ENTERPRISE *</div>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #cbd5e1", fontSize: 11 }}>
                      <thead>
                        <tr style={{ background: "#dbeafe", color: "#1e3a8a", fontWeight: 700 }}>
                          <th style={{ border: "1px solid #cbd5e1", padding: "4px 8px", width: 45 }}>S.No.</th>
                          <th style={{ border: "1px solid #cbd5e1", padding: "4px 8px" }}>Classification Year</th>
                          <th style={{ border: "1px solid #cbd5e1", padding: "4px 8px" }}>Enterprise Type</th>
                          <th style={{ border: "1px solid #cbd5e1", padding: "4px 8px" }}>Classification Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ textAlign: "center", background: "#ffffff" }}>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px" }}>1</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px" }}>{content.classificationYear || "2024-25"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px", fontWeight: 700, color: "#15803d" }}>{content.classificationType || "Small"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px" }}>{content.classificationDate || "15/09/2020"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Row 4: Major Activity Banner */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>MAJOR ACTIVITY</div>
                    <div style={{ background: "#15803d", color: "#ffffff", fontWeight: 900, textAlign: "center", padding: "6px 12px", borderRadius: 3, letterSpacing: 2, fontSize: 13, textTransform: "uppercase" }}>
                      {content.majorActivityBanner || "MANUFACTURING"}
                    </div>
                  </div>

                  {/* Row 5: Social Category */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>SOCIAL CATEGORY OF ENTREPRENEUR</div>
                    <div style={{ fontWeight: 800, textAlign: "center" }}>{content.socialCategory || "GENERAL"}</div>
                  </div>

                  {/* Row 6: Name of Unit(s) */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "flex-start" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase", paddingTop: 4 }}>NAME OF UNIT(S)</div>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #cbd5e1", fontSize: 11 }}>
                      <thead>
                        <tr style={{ background: "#f1f5f9" }}>
                          <th style={{ border: "1px solid #cbd5e1", padding: "3px 8px", width: 45 }}>S.No.</th>
                          <th style={{ border: "1px solid #cbd5e1", padding: "3px 8px", textAlign: "left" }}>Name of Unit(s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px", textAlign: "center" }}>1</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px", fontWeight: 700 }}>{content.enterpriseName || content.legalName || "ENTERPRISE UNIT"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Row 7: Official Address Table */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "flex-start" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase", paddingTop: 4 }}>OFFICIAL ADDRESS OF ENTERPRISE</div>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #cbd5e1", fontSize: 10.5 }}>
                      <tbody>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, width: "25%", background: "#f8fafc" }}>Flat/Door/Block No.</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", width: "25%" }}>{content.flatDoorBlock || "Plot No. 14"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, width: "25%", background: "#f8fafc" }}>Name of Premises/Building</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", width: "25%" }}>{content.premisesBuilding || "Industrial Estate"}</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Village/Town</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.villageTown || "Industrial Phase"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Block</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.block || "Sector 2"}</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Road/Street/Lane</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.roadStreetLane || "Main Road"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>City</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.city || "CITY"}</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>State</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700 }}>{content.state || "STATE"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>District</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.district || "DISTRICT"}</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Mobile</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.mobile || "9840123456"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Email:</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontFamily: F.mono, fontSize: 10 }}>{content.email || "tenders@enterprise.com"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Row 8: Incorporation Date */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>DATE OF INCORPORATION / REGISTRATION OF ENTERPRISE</div>
                    <div style={{ fontWeight: 700, textAlign: "center" }}>{content.dateOfIncorporation || "14/05/2004"}</div>
                  </div>

                  {/* Row 9: Commencement Date */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>DATE OF COMMENCEMENT OF PRODUCTION/BUSINESS</div>
                    <div style={{ fontWeight: 700, textAlign: "center" }}>{content.dateOfCommencement || "01/08/2004"}</div>
                  </div>

                  {/* Row 10: NIC Code Table */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "flex-start" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase", paddingTop: 4 }}>NATIONAL INDUSTRY CLASSIFICATION CODE(S)</div>
                    <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #cbd5e1", fontSize: 10 }}>
                      <thead>
                        <tr style={{ background: "#f1f5f9" }}>
                          <th style={{ border: "1px solid #cbd5e1", padding: "3px 4px", width: 35 }}>S.No.</th>
                          <th style={{ border: "1px solid #cbd5e1", padding: "3px 6px" }}>NIC 2 Digit</th>
                          <th style={{ border: "1px solid #cbd5e1", padding: "3px 6px" }}>NIC 4 Digit</th>
                          <th style={{ border: "1px solid #cbd5e1", padding: "3px 6px" }}>NIC 5 Digit</th>
                          <th style={{ border: "1px solid #cbd5e1", padding: "3px 6px" }}>Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px", textAlign: "center" }}>1</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>28 - Manufacture of machinery and equipment</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>2813 - Manufacture of other pumps, compressors, taps and valves</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>28132 - Manufacture of industrial valves and pipe fittings</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, color: "#15803d" }}>Manufacturing</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px", textAlign: "center" }}>2</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>24 - Manufacture of basic metals</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>2431 - Casting of iron and steel</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>24311 - Casting of steel valves and pressure containment items</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, color: "#15803d" }}>Manufacturing</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Row 11: Date of Udyam Registration */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>DATE OF UDYAM REGISTRATION</div>
                    <div style={{ fontWeight: 800, textAlign: "center", color: "#1e3a8a" }}>{content.dateOfUdyamRegistration || "12/06/2021"}</div>
                  </div>
                </div>

                {/* Footnote & Portal URL */}
                <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px solid #e2e8f0", fontSize: 9.5, color: "#475569" }}>
                  <div>* In case of graduation (upward/reverse) of status of an enterprise, the benefit of the Government Schemes will be availed as per the provisions of Notification No. S.O. 2119(E) dated 26.06.2020 issued by the M/o MSME.</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, color: "#64748b", fontFamily: F.mono, fontSize: 8.5 }}>
                    <span>https://udyamregistration.gov.in/Udyam_User/Udyam_PrintApplication.aspx</span>
                    <span>Page 1/4</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. AUTHENTIC ITR-V ACKNOWLEDGEMENT (Matches Income Tax Department Format) */}
          {(doc.id === "doc-itr" || doc.fileName?.toLowerCase().includes("itr") || doc.title?.toLowerCase().includes("itr")) && (
            <div style={{ background: "#ffffff", border: "1.5px solid #000000", padding: "20px 24px", color: "#000000", fontFamily: "Arial, sans-serif", fontSize: 11, position: "relative" }}>
              {/* Background Watermark */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  opacity: 0.06,
                  zIndex: 1
                }}
              >
                <div style={{ width: 260, height: 260, borderRadius: "50%", border: "10px solid #000000", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <div style={{ fontSize: 56 }}>🏛️</div>
                  <div style={{ fontSize: 13, fontWeight: 900, marginTop: 6 }}>आयकर विभाग</div>
                  <div style={{ fontSize: 11, fontWeight: 900 }}>INCOME TAX DEPARTMENT</div>
                </div>
              </div>

              {/* Header Box */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 160px", border: "1.5px solid #000000", marginBottom: 8, position: "relative", zIndex: 2 }}>
                <div style={{ padding: "10px 14px", borderRight: "1.5px solid #000000" }}>
                  <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: 0.5 }}>INDIAN INCOME TAX RETURN ACKNOWLEDGEMENT</div>
                  <div style={{ fontSize: 9.5, fontStyle: "italic", marginTop: 2 }}>
                    [Where the data of the Return of Income in Form ITR-1 (SAHAJ), ITR-2, ITR-3, ITR-4(SUGAM), ITR-5, ITR-6, ITR-7 filed and verified]
                  </div>
                  <div style={{ fontSize: 9, fontStyle: "italic", marginTop: 2 }}>
                    (Please see Rule 12 of the Income-tax Rules, 1962)
                  </div>
                </div>
                <div style={{ padding: "10px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", background: "#f8fafc" }}>
                  <div style={{ fontSize: 10, fontWeight: 700 }}>Assessment Year</div>
                  <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 0.5 }}>{content.assessmentYear || "2025-26"}</div>
                </div>
              </div>

              {/* Taxpayer Details Table */}
              <div style={{ border: "1.5px solid #000000", borderBottom: "none", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", borderBottom: "1px solid #000000", padding: "4px 8px" }}>
                  <span style={{ fontWeight: 700 }}>PAN</span>
                  <span style={{ fontFamily: F.mono, fontWeight: 700 }}>{content.panNumber || "PAN"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", borderBottom: "1px solid #000000", padding: "4px 8px" }}>
                  <span style={{ fontWeight: 700 }}>Name</span>
                  <span style={{ textTransform: "uppercase", fontWeight: 700 }}>{content.name || content.legalName || "TAXPAYER NAME"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", borderBottom: "1px solid #000000", padding: "4px 8px" }}>
                  <span style={{ fontWeight: 700 }}>Address</span>
                  <span>{content.address || "Taxpayer Registered Address"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 140px 140px", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Status</div>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000" }}>{content.status || "Domestic Company"}</div>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Form Number</div>
                  <div style={{ padding: "4px 8px", fontWeight: 700 }}>{content.formType || "ITR-6"}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 200px 140px", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Filed u/s</div>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000" }}>139(1)-On or before due date</div>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>e-Filing Acknowledgement Number</div>
                  <div style={{ padding: "4px 8px", fontFamily: F.mono, fontWeight: 700 }}>{content.acknowledgementNo || "849201948192039"}</div>
                </div>
              </div>

              {/* Financial Computations Grid */}
              <div style={{ border: "1.5px solid #000000", position: "relative", zIndex: 2 }}>
                {/* Section 1: Taxable Income and Tax Details */}
                <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 35px 120px" }}>
                  <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", textAlign: "center", padding: 6, fontWeight: 800, fontSize: 9.5, borderRight: "1px solid #000000", gridRow: "span 9", background: "#f8fafc" }}>
                    Taxable Income and Tax details
                  </div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Current Year business loss, if any</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>1</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>{content.businessLoss || "0"}</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", fontWeight: 700 }}>Total Income</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}></div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono, fontWeight: 700 }}>{content.totalIncome ? Number(content.totalIncome).toLocaleString("en-IN") : "48,67,38,460"}</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Book Profit under MAT, where applicable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>2</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>0</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Adjusted Total Income under AMT, where applicable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>3</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>{content.totalIncome ? Number(content.totalIncome).toLocaleString("en-IN") : "48,67,38,460"}</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Net tax payable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>4</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>0</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Interest and Fee Payable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>5</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>0</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Total tax, interest and Fee payable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>6</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>0</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", fontWeight: 700 }}>Taxes Paid</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>7</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono, fontWeight: 700 }}>{content.taxPaid ? Number(content.taxPaid).toLocaleString("en-IN") : "1,22,48,500"}</div>

                  <div style={{ padding: "3px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>(+)Tax Payable / (-)Refundable (6-7)</div>
                  <div style={{ padding: "3px 4px", borderRight: "1px solid #000000", textAlign: "center" }}>8</div>
                  <div style={{ padding: "3px 8px", textAlign: "right", fontFamily: F.mono, fontWeight: 700, color: "#15803d" }}>-0.00</div>
                </div>

                {/* Section 2: Dividend Distribution Tax details */}
                <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 35px 120px", borderTop: "1px solid #000000" }}>
                  <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", textAlign: "center", padding: 4, fontWeight: 800, fontSize: 8.5, borderRight: "1px solid #000000", gridRow: "span 3", background: "#f8fafc" }}>
                    Dividend Tax
                  </div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Dividend Tax Payable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>9</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>0</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Total Dividend tax and interest payable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>11</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>0</div>

                  <div style={{ padding: "3px 8px", borderRight: "1px solid #000000" }}>(+)Tax Payable / (-)Refundable (11-12)</div>
                  <div style={{ padding: "3px 4px", borderRight: "1px solid #000000", textAlign: "center" }}>13</div>
                  <div style={{ padding: "3px 8px", textAlign: "right", fontFamily: F.mono }}>0</div>
                </div>
              </div>

              {/* DSC Electronic Signature Footer */}
              <div style={{ marginTop: 12, borderTop: "1px solid #000000", paddingTop: 10, fontSize: 10, lineHeight: 1.5, position: "relative", zIndex: 2 }}>
                <div>Income Tax Return submitted electronically on <strong>{content.filingTimestamp || "28-07-2025 15:25:22"}</strong> from IP address <strong>{content.ipAddress || "103.24.188.42"}</strong> and verified by <strong>{content.signatoryName || content.name || content.legalName || "Authorized Signatory"}</strong> having PAN <strong>{content.panNumber || "PAN"}</strong> on <strong>{content.filingTimestamp || "28-07-2025 15:25:22"}</strong> from IP address <strong>{content.ipAddress || "103.24.188.42"}</strong> using <strong>Digital Signature Certificate (DSC)</strong>.</div>
                <div style={{ marginTop: 4 }}>DSC details: <strong>SHA-256 Validated • Cert No: DS2025-91823901 • Authorized CA: eMudhra / Capricorn CA</strong></div>
              </div>
            </div>
          )}

          {/* 5. AUTHENTIC EPFO CODE NUMBER INTIMATION (Matches Ministry of Labour & Employment Format) */}
          {(doc.id === "doc-epfo" || doc.fileName?.toLowerCase().includes("epfo") || doc.title?.toLowerCase().includes("epfo")) && (
            <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 4, padding: "26px 32px", color: "#000000", fontFamily: "Arial, sans-serif", fontSize: 12, lineHeight: 1.5, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              {/* Official Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                {/* Round Blue EPFO Emblem */}
                <div style={{ width: 62, height: 62, borderRadius: "50%", border: "2.5px solid #0369a1", color: "#0369a1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 22, lineHeight: 1 }}>⚙️</div>
                  <div style={{ fontSize: 6.5, fontWeight: 900, marginTop: 1 }}>EPFO</div>
                </div>

                {/* Title & Statutory text */}
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: 0.5 }}>EMPLOYEES' PROVIDENT FUND</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>(A statutory Body under the Ministry of Labour and Employment)</div>
                  <div style={{ fontSize: 11, color: "#0284c7", textDecoration: "underline", fontWeight: 600 }}>www.epfindia.gov.in</div>
                </div>
              </div>

              <div style={{ borderBottom: "1.5px solid #000000", marginBottom: 14 }} />

              {/* Title */}
              <div style={{ textAlign: "center", fontSize: 14, fontWeight: 900, letterSpacing: 0.5, marginBottom: 14 }}>
                PROVIDENT FUND CODE NUMBER INTIMATION
              </div>

              {/* Ref No & Date */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontWeight: 700 }}>
                <div>No : <span style={{ fontFamily: F.mono }}>{content.refNo || "DL/CPM/0029103/000/18293"}</span></div>
                <div>Date : {content.intimationDate || "17/08/2023"}</div>
              </div>

              {/* Addressee */}
              <div style={{ marginBottom: 14, lineHeight: 1.4 }}>
                <div style={{ fontWeight: 700 }}>To</div>
                <div style={{ fontWeight: 800, textTransform: "uppercase" }}>{content.establishmentName || content.legalName || "M/S ESTABLISHMENT"}</div>
                <div>{content.designation || "Managing Director / Partner"}</div>
                <div>{content.address || "Registered Office Address"}</div>
              </div>

              {/* Subject */}
              <div style={{ background: "#f8fafc", padding: "6px 10px", border: "1px solid #e2e8f0", fontWeight: 700, marginBottom: 12, fontSize: 11.5 }}>
                Sub: Allotment of Code Number to establishment M/s {content.establishmentName || content.legalName || "Establishment"} under Employees' Provident Fund and Miscellaneous Provisions Act, 1952-regarding.
              </div>

              {/* Body text */}
              <div style={{ marginBottom: 10 }}>
                <strong>Sir/Madam ,</strong>
                <p style={{ margin: "6px 0" }}>
                  Based on the information submitted online by you, your establishment is registered with Employees' Provident Fund Organisation with the following code number :
                </p>
              </div>

              {/* Code Number Highlight */}
              <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "8px 14px", borderRadius: 4, display: "inline-block", marginBottom: 12 }}>
                <strong>Code Number : </strong>
                <span style={{ fontFamily: F.mono, fontWeight: 900, color: "#1e3a8a", fontSize: 14 }}>{content.establishmentCode || "TN/MAS/0048291"}</span>
              </div>

              {/* 7 Points of Declarations */}
              <div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>This code number is allotted based on the following declarations by you:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8, fontSize: 11.5 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>1. Name of Establishment</span><span>:</span><strong style={{ textTransform: "uppercase" }}>{content.establishmentName || content.legalName || "ESTABLISHMENT"}</strong>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>2. PAN of Establishment</span><span>:</span><span style={{ fontFamily: F.mono, fontWeight: 700 }}>{content.panNumber || "PAN"}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>3. Date on which employment strength crossed 19</span><span>:</span><strong>{content.coverageDate || "01/08/2020"}</strong>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>4. Section under which</span><span>:</span><span style={{ fontFamily: F.mono }}>0001(3)(b)</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>5. Primary Activity</span><span>:</span><strong style={{ color: "#1e3a8a" }}>{content.primaryActivity || "MANUFACTURE OF INDUSTRIAL VALVES AND FLOW EQUIPMENT"}</strong>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>6. Ownership Type</span><span>:</span><strong>{content.ownershipType || "Private Limited Company"}</strong>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>7. The address proof of the establishment is</span><span>:</span>
                    <span style={{ border: "1px solid #94a3b8", padding: "1px 6px", display: "inline-block" }}>Any license/certificate/number issued by any Govt.</span>
                  </div>
                </div>
              </div>

              {/* Footer signature */}
              <div style={{ marginTop: 24, textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#64748b" }}>Digitally Generated & Authenticated</div>
                <div style={{ fontWeight: 800, marginTop: 4 }}>Assistant Provident Fund Commissioner</div>
                <div style={{ fontSize: 11, color: "#334155" }}>{content.regionalOffice || "Regional Office, Ministry of Labour & Employment"}</div>
                <div style={{ fontSize: 10, color: "#15803d", fontWeight: 700, marginTop: 2 }}>✓ Active ECR Return Compliance Verified</div>
              </div>
            </div>
          )}

          {/* 6. AUTHENTIC ESIC REGISTRATION LETTER (Form C-11, ESIC Act 1948) */}
          {(doc.id === "doc-esic" || doc.fileName?.toLowerCase().includes("esic") || doc.title?.toLowerCase().includes("esic")) && (
            <div style={{ background: "#ffffff", border: "1.5px solid #cbd5e1", borderRadius: 4, padding: "26px 32px", color: "#000000", fontFamily: "Arial, sans-serif", fontSize: 11.5, lineHeight: 1.45, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              {/* Top Header Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 130px", alignItems: "flex-start", marginBottom: 14 }}>
                {/* Red/Maroon ESIC Emblem */}
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#991b1b", color: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", border: "2px solid #7f1d1d" }}>
                  <div style={{ fontSize: 18 }}>🏛️</div>
                  <div style={{ fontSize: 6.5, fontWeight: 900, letterSpacing: 0.5 }}>ESIC</div>
                </div>

                {/* Center Office Title */}
                <div style={{ textAlign: "center", padding: "0 10px" }}>
                  <div style={{ fontSize: 13, fontWeight: 900 }}>{content.esicOffice || "Regional Office"}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, margin: "2px 0" }}>EMPLOYEES' STATE INSURANCE CORPORATION</div>
                  <div style={{ fontSize: 9.5, color: "#334155" }}>{content.esicOfficeAddress || "Panchdeep Bhavan, Regional Headquarters"}</div>
                </div>

                {/* Right: Form C-11 */}
                <div style={{ textAlign: "right", fontSize: 10, fontWeight: 700 }}>
                  <div>C-11 &nbsp; Regd. with a.d.</div>
                </div>
              </div>

              <div style={{ borderBottom: "1px solid #94a3b8", marginBottom: 12 }} />

              {/* To & Dated */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <div style={{ fontWeight: 700 }}>To</div>
                  <div style={{ fontWeight: 800 }}>M/s {content.legalName || "ENTERPRISE"}</div>
                  <div>{content.address || "Factory / Registered Office"}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 11 }}>
                  Dated : {content.esicDate || "12/08/2023"}
                </div>
              </div>

              {/* Subject */}
              <div style={{ fontWeight: 800, marginBottom: 10, fontSize: 11.5, background: "#f8fafc", padding: "6px 8px", borderLeft: "3px solid #991b1b" }}>
                Subject:- Implementation of the E.S.I. Act, 1948 and Registration of Employees of the Factories and Establishments under Section 1(5) of the Act, as amended.
              </div>

              {content.hasArrearsWarning && (
                <div style={{ background: "#fef2f2", border: "1.5px solid #ef4444", padding: "10px 14px", borderRadius: 6, marginBottom: 12, fontSize: 12, color: "#991b1b" }}>
                  <strong>⚠️ STATUTORY ARREARS NOTICE:</strong> Demand Notice issued under Section 45A of ESI Act 1948 for pending employer contributions.
                </div>
              )}

              <div>Dear Sir(s),</div>

              {/* Numbered Points 1-7 matching the screenshot */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 6, fontSize: 10.5, color: "#1e293b", textAlign: "justify" }}>
                <div>
                  <strong>1.</strong> It is informed that under section 1(3) of the esi. act, 1948 is applicable to all factories/establishments covered under the act within the area where your factory/establishment is situated.
                </div>
                <div>
                  <strong>2.</strong> It is further informed that the appropriate government has extended the provisions of the act to other establishments under section 1(5) of the act in this area.
                </div>
                <div>
                  <strong>3.</strong> Under section 2 a of the act such a factory/establishment is required to register itself under the act and chapter iv thereof casts a responsibility on the principal employer thereof to get his employees registered and pay contributions in respect of these employees covered under the act.
                </div>
                <div>
                  <strong>4.</strong> On the basis of the particulars in respect of your factory/establishment submitted by you, the report of the inspection conducted by the Social Security Officer, your establishment falls within the purview of Section 1(5) of the Act with effect from <strong>{content.coverageDate || "12-08-2023"}</strong>.
                </div>
                <div>
                  <strong>5.</strong> It is requested to take immediate steps for registration of your employees by submitting declaration forms online, payment of contribution, maintenance of records etc. from the date of coverage under the act.
                </div>
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "6px 10px", borderRadius: 4 }}>
                  <strong>6.</strong> For the sake of convenience your establishment has been allotted <strong>Employer Code No:</strong>{" "}
                  <span style={{ fontFamily: F.mono, fontWeight: 900, color: "#991b1b", fontSize: 12 }}>
                    {content.employerCode || "52000849200000606"}
                  </span>{" "}
                  which may kindly be used in all communications. The {content.esicBranch || "Local Branch Office"} has been instructed to render necessary assistance.
                </div>
                <div>
                  <strong>7.</strong> A State-wise list of ESI Dispensaries is available on our portal <strong>www.esic.nic.in</strong>. Publicity may be given about the Dispensaries to enable your employees to choose their ESI Dispensaries.
                </div>
              </div>

              {/* Official Sign-off */}
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div style={{ fontSize: 9.5, color: content.hasArrearsWarning ? "#dc2626" : "#15803d", fontWeight: 700 }}>
                  {content.hasArrearsWarning ? "⚠ Compliance Alert: Outstanding Notice on Portal" : "✓ Authenticated under ESI (General) Regulations 1950 • Contribution Active"}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10 }}>Yours faithfully,</div>
                  <div style={{ fontFamily: "cursive", fontSize: 16, color: "#991b1b", margin: "2px 0" }}>{content.esicOfficer || "K. Srinivasa Rao"}</div>
                  <div style={{ fontWeight: 800, fontSize: 11 }}>For Regional Director</div>
                  <div style={{ fontSize: 10, color: "#475569" }}>Employees' State Insurance Corporation</div>
                </div>
              </div>
            </div>
          )}

          {/* 7. AUTHENTIC MAKE IN INDIA SELF-DECLARATION ON COMPANY LETTERHEAD (PPO 2017) */}
          {(doc.id === "doc-mii" || doc.fileName?.toLowerCase().includes("make_in_india") || doc.title?.toLowerCase().includes("make in india")) && (
            <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontFamily: "Arial, sans-serif" }}>
              {/* Corporate Letterhead Banner */}
              <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)", color: "#ffffff", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "3px solid #f59e0b" }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 0.5 }}>{content.legalName || "BIDDER COMPANY"}</div>
                  <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>{content.businessLine || "High Pressure Fluid Valves & Engineering Systems • ISO 9001:2015 Certified"}</div>
                  <div style={{ fontSize: 9.5, opacity: 0.75, marginTop: 1, fontFamily: F.mono }}>{content.cin ? `CIN: ${content.cin} • ` : ""}GSTIN: {content.gstin || content.registrationNumber || "GSTIN"}</div>
                </div>
                <div style={{ textAlign: "right", fontSize: 9.5, opacity: 0.85, lineHeight: 1.3 }}>
                  <div>{content.address || "Registered Factory Works"}</div>
                  <div>{content.email || "tenders@company.com"} • {content.website || "www.company.com"}</div>
                </div>
              </div>

              <div style={{ padding: "22px 28px", color: "#0f172a", fontSize: 11.5, lineHeight: 1.5 }}>
                {/* Reference & Date */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, borderBottom: "1px solid #e2e8f0", paddingBottom: 8, fontSize: 11 }}>
                  <div><strong>Ref No:</strong> <span style={{ fontFamily: F.mono }}>{content.refNo || "MII/DECL/2026/01"}</span></div>
                  <div><strong>Date:</strong> {content.declarationDate || "28th August 2026"}</div>
                </div>

                {/* Addressee */}
                <div style={{ marginBottom: 12, lineHeight: 1.35 }}>
                  <div><strong>To,</strong></div>
                  <div>The Tender Inviting Authority / General Manager (Materials & Contracts)</div>
                  <div>Chennai Petroleum Corporation Limited (CPCL) / GeM Portal</div>
                  <div>Manali Refinery, Chennai - 600068, Tamil Nadu</div>
                </div>

                {/* Subject */}
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: "8px 12px", borderRadius: 4, fontWeight: 800, color: "#92400e", marginBottom: 14, fontSize: 12 }}>
                  Subject: Self-Declaration Certificate of Local Content under Public Procurement (Preference to Make in India) Order 2017 (PPO-2017) against Tender Ref: {content.tenderRef || "CPCL/2026/TE/045"}
                </div>

                <p style={{ margin: "0 0 10px" }}>
                  Dear Sir/Madam,
                </p>

                <p style={{ margin: "0 0 12px", textAlign: "justify" }}>
                  In terms of Public Procurement (Preference to Make in India) Order 2017 notified by Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce and Industry, Government of India vide Order No. P-45021/2/2017-PP (BE-II) dated 16th September 2020, we hereby formally declare and certify on our official letterhead:
                </p>

                {/* Golden Highlight Box */}
                <div style={{ background: Number(content.localContentPercentage || 75) >= 50 ? "#f0fdf4" : "#fff7ed", border: `2px solid ${Number(content.localContentPercentage || 75) >= 50 ? "#22c55e" : "#f97316"}`, borderRadius: 6, padding: "12px 18px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 10.5, color: Number(content.localContentPercentage || 75) >= 50 ? "#166534" : "#9a3412", fontWeight: 700, textTransform: "uppercase" }}>Percentage of Domestic Local Content Offered:</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: Number(content.localContentPercentage || 75) >= 50 ? "#15803d" : "#c2410c" }}>{content.localContentPercentage || "75.00"}% (LOCAL VALUE ADDITION)</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ background: Number(content.localContentPercentage || 75) >= 50 ? "#15803d" : "#c2410c", color: "#ffffff", padding: "4px 12px", borderRadius: 4, fontWeight: 800, fontSize: 12 }}>
                      {content.supplierClass || (Number(content.localContentPercentage || 75) >= 50 ? "CLASS-I LOCAL SUPPLIER" : "CLASS-II LOCAL SUPPLIER")}
                    </div>
                    <div style={{ fontSize: 10, color: Number(content.localContentPercentage || 75) >= 50 ? "#166534" : "#9a3412", marginTop: 3 }}>
                      {Number(content.localContentPercentage || 75) >= 50 ? "Local Content ≥ 50% Threshold Met" : "Local Content < 50% (Fails Tender Requirement)"}
                    </div>
                  </div>
                </div>

                {/* Breakdown Table */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>1. Itemized Domestic Local Content Breakdown:</div>
                  <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #cbd5e1", fontSize: 11 }}>
                    <thead>
                      <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                        <th style={{ border: "1px solid #cbd5e1", padding: "5px 8px", width: 45 }}>S.No.</th>
                        <th style={{ border: "1px solid #cbd5e1", padding: "5px 8px" }}>Component Description</th>
                        <th style={{ border: "1px solid #cbd5e1", padding: "5px 8px", width: 85, textAlign: "center" }}>% Value</th>
                        <th style={{ border: "1px solid #cbd5e1", padding: "5px 8px" }}>Facility Location of Local Value Addition</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px", textAlign: "center" }}>1</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px" }}>Valve Casting Body (ASTM A216 WCB Cast Carbon Steel)</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px", textAlign: "center", fontWeight: 700 }}>35.00%</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px" }}>Foundry Facility, {content.city || "Factory Unit"}</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px", textAlign: "center" }}>2</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px" }}>Precision CNC Machining, Stems, Bonnet, Flanges & Seat Rings</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px", textAlign: "center", fontWeight: 700 }}>22.50%</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px" }}>Plant Unit-1, Heavy Engineering Works</td>
                      </tr>
                      <tr>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px", textAlign: "center" }}>3</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px" }}>Final Assembly, Hydrostatic Testing, QA & Epoxy Coating</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px", textAlign: "center", fontWeight: 700 }}>{((Number(content.localContentPercentage || 75) - 57.5) > 0 ? (Number(content.localContentPercentage || 75) - 57.5).toFixed(2) : "17.50")}%</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "5px 8px" }}>Factory Works, {content.city || "Manufacturing Complex"}</td>
                      </tr>
                      <tr style={{ background: "#f1f5f9", fontWeight: 900 }}>
                        <td colSpan={2} style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "right" }}>Total Domestic Value Addition:</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", color: Number(content.localContentPercentage || 75) >= 50 ? "#15803d" : "#c2410c", fontSize: 12 }}>{content.localContentPercentage || "75.00"}%</td>
                        <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>{Number(content.localContentPercentage || 75) >= 50 ? "Compliant with DPIIT PPO-2017 Class-I" : "Fails Class-I Local Preference Criterion"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Factory Location & GFR Rule 175 Legal Notice */}
                <div style={{ background: "#f8fafc", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 4, marginBottom: 14, fontSize: 10.5, color: "#334155" }}>
                  <strong>2. Address of Manufacturing Plant where Local Value Addition is made:</strong><br />
                  {content.manufacturingPlantAddress || content.address || "Registered Factory Works"}.<br />
                  <span style={{ color: "#b91c1c", marginTop: 4, display: "inline-block" }}>
                    * We understand that false declarations will be in breach of the Code of Integrity under Rule 175(1)(i)(h) of the GFR 2017 for which debarment up to two years under Rule 151(iii) will apply.
                  </span>
                </div>

                {/* Signature & Seal Block */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 18, paddingTop: 10, borderTop: "1px solid #e2e8f0" }}>
                  {/* Corporate Blue Seal */}
                  <div style={{ width: 95, height: 95, borderRadius: "50%", border: "2px dashed #1e3a8a", color: "#1e3a8a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 4, transform: "rotate(-5deg)", fontSize: 8, fontWeight: 800 }}>
                    <div style={{ textTransform: "uppercase" }}>{content.legalName?.split(" ")[0] || "CORP"}</div>
                    <div style={{ fontSize: 6.5, fontWeight: 700, margin: "2px 0" }}>OFFICIAL</div>
                    <div>★ VERIFIED ★</div>
                    <div style={{ fontSize: 6.5, marginTop: 2 }}>CORP SEAL</div>
                  </div>

                  {/* Authorized Signatory */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#475569" }}>For <strong>{content.legalName || "Bidder Company"}</strong></div>
                    <div style={{ fontFamily: "cursive", fontSize: 20, color: "#1e3a8a", margin: "4px 0" }}>{content.signatoryName || "Authorized Signatory"}</div>
                    <div style={{ fontWeight: 800, fontSize: 12 }}>{content.signatoryName || "Authorized Signatory"}</div>
                    <div style={{ fontSize: 10.5, color: "#334155" }}>{content.signatoryDesignation || "Managing Director / Authorized Signatory"}</div>
                    <div style={{ fontSize: 9.5, color: "#64748b", fontFamily: F.mono }}>{content.signatoryId || "Corporate Seal Affixed"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. AUTHENTIC AUDITED BALANCE SHEET (Matches CA Audited Format) */}
          {(doc.id === "doc-balance-sheet" || doc.fileName?.toLowerCase().includes("balance") || doc.title?.toLowerCase().includes("balance")) && (
            <div style={{ background: "#fcfbfa", border: "1.5px solid #334155", borderRadius: 4, padding: "24px", color: "#000000", fontFamily: "Arial, sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
              {/* Company Header */}
              <div style={{ textAlign: "center", borderBottom: "2px solid #000000", paddingBottom: 10, marginBottom: 14 }}>
                <div style={{ fontSize: 15, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {content.enterpriseName || content.legalName || "BIDDER ENTERPRISE"}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, margin: "2px 0", textTransform: "uppercase" }}>
                  {content.address || "REGISTERED BUSINESS OFFICE ADDRESS"}
                </div>
                <div style={{ fontSize: 12, fontWeight: 900, textDecoration: "underline", marginTop: 4 }}>
                  {content.balanceSheetDate || "AUDITED BALANCE SHEET AS AT 31.03.2025"}
                </div>
              </div>

              {/* Main Two-Column Balanced Table */}
              <div style={{ border: "1.5px solid #000000", fontSize: 10.5 }}>
                {/* Header Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 85px 95px 1fr 85px 95px", background: "#f1f5f9", borderBottom: "1.5px solid #000000", fontWeight: 800, textAlign: "center" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000" }}>Liabilities</div>
                  <div style={{ padding: "6px 4px", borderRight: "1px solid #000000" }}>Amount (Rs.)</div>
                  <div style={{ padding: "6px 4px", borderRight: "1.5px solid #000000" }}>Amount (Rs.)</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000" }}>Assets</div>
                  <div style={{ padding: "6px 4px", borderRight: "1px solid #000000" }}>Amount (Rs.)</div>
                  <div style={{ padding: "6px 4px" }}>Amount (Rs.)</div>
                </div>

                {/* Row 1: Capital Account vs Fixed Assets */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 85px 95px 1fr 85px 95px", borderBottom: "1px solid #cbd5e1" }}>
                  {/* Liabilities Left */}
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>
                    <div>Capital Account</div>
                    <div style={{ paddingLeft: 8, fontStyle: "italic", fontWeight: 400 }}>Addition :-</div>
                    <div style={{ paddingLeft: 8, fontStyle: "italic", fontWeight: 400 }}>Add: Net Profit</div>
                    <div style={{ textAlign: "right", fontWeight: 700 }}>Total</div>
                    <div style={{ paddingLeft: 8, fontStyle: "italic", fontWeight: 400 }}>Less: Drawings</div>
                  </div>
                  <div style={{ padding: "4px", borderRight: "1px solid #000000", textAlign: "right", fontFamily: F.mono, fontSize: 10 }}>
                    <div>{content.capitalAmount || "4816233.00"}</div>
                    <div>{content.netProfit || "3300387.00"}</div>
                    <div>2482579.05</div>
                    <div style={{ borderTop: "1px solid #000000", fontWeight: 700 }}>10599199.05</div>
                    <div>1445841.00</div>
                  </div>
                  <div style={{ padding: "4px", borderRight: "1.5px solid #000000", textAlign: "right", fontFamily: F.mono, fontWeight: 700, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                    9153358.05
                  </div>

                  {/* Assets Right */}
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000" }}>
                    <div style={{ fontWeight: 700 }}>Fixed Assets</div>
                    <div style={{ paddingLeft: 6 }}>Air Conditioner</div>
                    <div style={{ paddingLeft: 6 }}>Vehicles / Transport</div>
                    <div style={{ paddingLeft: 6 }}>IT / Computer Systems</div>
                    <div style={{ paddingLeft: 6 }}>Furniture & Fixtures</div>
                    <div style={{ paddingLeft: 6, fontWeight: 600 }}>Plant & Machinery</div>
                  </div>
                  <div style={{ padding: "4px", borderRight: "1px solid #000000", textAlign: "right", fontFamily: F.mono, fontSize: 10 }}>
                    <div>&nbsp;</div>
                    <div>32378.47</div>
                    <div>1211918.86</div>
                    <div>280410.67</div>
                    <div>95490.37</div>
                    <div>3962614.96</div>
                  </div>
                  <div style={{ padding: "4px", textAlign: "right", fontFamily: F.mono, fontWeight: 700, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                    5632733.79
                  </div>
                </div>

                {/* Row 2: Loans & Current Liabilities vs Current Assets */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 85px 95px 1fr 85px 95px", borderBottom: "1.5px solid #000000" }}>
                  {/* Liabilities Left */}
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000" }}>
                    <div style={{ fontWeight: 700 }}>Loans (Liability)</div>
                    <div style={{ paddingLeft: 6 }}>Unsecured Loans</div>
                    <div style={{ fontWeight: 700, marginTop: 4 }}>Current Liabilities</div>
                    <div style={{ paddingLeft: 6 }}>Sundry Creditors</div>
                    <div style={{ paddingLeft: 6 }}>Advance Recd From Customer</div>
                    <div style={{ paddingLeft: 6 }}>Tds / Salary / Wages Payable</div>
                  </div>
                  <div style={{ padding: "4px", borderRight: "1px solid #000000", textAlign: "right", fontFamily: F.mono, fontSize: 10 }}>
                    <div>&nbsp;</div>
                    <div>24739542.21</div>
                    <div>&nbsp;</div>
                    <div>10944048.66</div>
                    <div>2314248.00</div>
                    <div>1522649.00</div>
                  </div>
                  <div style={{ padding: "4px", borderRight: "1.5px solid #000000", textAlign: "right", fontFamily: F.mono, fontWeight: 700 }}>
                    <div style={{ marginTop: 14 }}>24739542.21</div>
                    <div style={{ marginTop: 36 }}>14780945.66</div>
                  </div>

                  {/* Assets Right */}
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000" }}>
                    <div style={{ fontWeight: 700 }}>Current Assets</div>
                    <div style={{ paddingLeft: 6 }}>Closing Stock</div>
                    <div style={{ paddingLeft: 6 }}>Loans & Advances (Asset)</div>
                    <div style={{ paddingLeft: 6, fontWeight: 600 }}>Sundry Debtors</div>
                    <div style={{ paddingLeft: 6 }}>Bank Accounts & Cash</div>
                    <div style={{ paddingLeft: 6 }}>Gst / Tcs / Tds Receivable</div>
                  </div>
                  <div style={{ padding: "4px", borderRight: "1px solid #000000", textAlign: "right", fontFamily: F.mono, fontSize: 10 }}>
                    <div>&nbsp;</div>
                    <div>12657800.00</div>
                    <div>8353590.00</div>
                    <div>18025842.61</div>
                    <div>2406687.05</div>
                    <div>1597192.56</div>
                  </div>
                  <div style={{ padding: "4px", textAlign: "right", fontFamily: F.mono, fontWeight: 700, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                    43041112.22
                  </div>
                </div>

                {/* Row 3: Total Row (Matches on Both Sides) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 85px 95px 1fr 85px 95px", background: "#f8fafc", fontWeight: 900 }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", textTransform: "uppercase" }}>Total</div>
                  <div style={{ padding: "6px 4px", borderRight: "1px solid #000000" }}></div>
                  <div style={{ padding: "6px 4px", borderRight: "1.5px solid #000000", textAlign: "right", fontFamily: F.mono, fontSize: 11 }}>{content.totalBalance || "48673846.00"}</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", textTransform: "uppercase" }}>Total</div>
                  <div style={{ padding: "6px 4px", borderRight: "1px solid #000000" }}></div>
                  <div style={{ padding: "6px 4px", textAlign: "right", fontFamily: F.mono, fontSize: 11 }}>{content.totalBalance || "48673846.00"}</div>
                </div>
              </div>

              {/* Proprietor & CA Attestation Section */}
              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "flex-start" }}>
                {/* Left: Place & Note */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>DATE: {content.auditDate || "28/08/2025"}</div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>PLACE: {content.auditPlace || "CHENNAI / MUMBAI"}</div>
                  <div style={{ fontSize: 10, fontStyle: "italic", marginTop: 8, color: "#334155" }}>
                    "Audited in accordance with the Standards on Auditing (SAs) issued by ICAI and Companies Act 2013."
                  </div>
                </div>

                {/* Right: Proprietor Signature */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11 }}>For, {content.enterpriseName || content.legalName || "Bidder Enterprise"}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, margin: "4px 0" }}>For {content.enterpriseName || content.legalName || "Bidder Enterprise"}</div>
                  <div style={{ fontFamily: "cursive", fontSize: 20, color: "#1e3a8a", transform: "rotate(-3deg)", display: "inline-block", margin: "4px 0" }}>
                    {content.signatoryName || "Authorized Signatory"}
                  </div>
                </div>
              </div>

              {/* Chartered Accountant Box with Blue Stamp */}
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1.5px dashed #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>For {content.caFirm || "AMKN & CO"}</div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>Chartered Accountants ({content.caFrn || "FRN: 032712C"})</div>
                  <div style={{ fontFamily: "cursive", fontSize: 18, color: "#1d4ed8", margin: "4px 0" }}>{content.caPartner || "CA Nitin Kaushik"}</div>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>{content.caPartner || "CA NITIN KAUSHIK (Partner)"}</div>
                  <div style={{ fontSize: 10, color: "#334155" }}>{content.caMembershipNo || "M.NO- 558996"}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: content.caUdin?.includes("AAAA") ? "#dc2626" : "#15803d", fontFamily: F.mono, marginTop: 2 }}>
                    UDIN- {content.caUdin || "25558996BGSVMJ2721"} {content.caUdin?.includes("AAAA") && "⚠️ [INVALID / UNVERIFIED]"}
                  </div>
                </div>

                {/* Round Blue CA Seal */}
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: `2.5px solid ${content.caUdin?.includes("AAAA") ? "#dc2626" : "#1d4ed8"}`,
                    color: content.caUdin?.includes("AAAA") ? "#dc2626" : "#1d4ed8",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: 6,
                    transform: "rotate(-8deg)",
                    background: "rgba(29,78,216,0.03)"
                  }}
                >
                  <div style={{ fontSize: 7.5, fontWeight: 900, textTransform: "uppercase" }}>{content.caFirmName || content.caFirm?.split(",")[0] || "CA AUDITOR"}</div>
                  <div style={{ fontSize: 6.5, fontWeight: 800 }}>{content.caFrn || "FRN: 032712C"}</div>
                  <div style={{ fontSize: 8, fontWeight: 900, margin: "2px 0" }}>{content.caCity || "INDIA"}</div>
                  <div style={{ fontSize: 6, fontWeight: 700, textTransform: "uppercase" }}>Chartered Accountants</div>
                </div>
              </div>
            </div>
          )}

          {/* 8. AUTHENTIC TECHNICAL BOQ & SPECIFICATION COMPLIANCE DATASHEET */}
          {(doc.id === "doc-boq" || doc.fileName?.toLowerCase().includes("boq") || doc.title?.toLowerCase().includes("boq")) && (
            <div style={{ background: "#ffffff", border: "1px solid #334155", borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontFamily: "Arial, sans-serif" }}>
              {/* Technical Header */}
              <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", color: "#ffffff", padding: "16px 22px", borderBottom: "3px solid #38bdf8" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: 0.5 }}>{content.bidderName ? `${content.bidderName.toUpperCase()} — SCHEDULE OF TECHNICAL BOQ` : "SCHEDULE OF BILL OF QUANTITIES & TECHNICAL COMPLIANCE"}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Tender Ref: {content.tenderRef || "CPCL/2026/TE/045"} • High Pressure Heavy Flow Cryogenic Valves</div>
                  </div>
                  <div style={{ textAlign: "right", fontFamily: F.mono, fontSize: 11, background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 4 }}>
                    API Spec 6D / ASME B16.34
                  </div>
                </div>
              </div>

              <div style={{ padding: "20px 24px" }}>
                {/* 6 Evaluated Technical Parameters Table */}
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #cbd5e1", fontSize: 11, marginBottom: 14 }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", fontWeight: 800, textAlign: "left" }}>
                      <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", width: 45 }}>Item</th>
                      <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Tender Specification Requirement</th>
                      <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Bidder Offered Technical Datasheet</th>
                      <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", width: 110, textAlign: "center" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", fontWeight: 700 }}>1.1</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>API 6D Trunnion Mounted Ball Valves, Full Bore, ASME Class 600/900</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Model VF-600T, Full Bore, 8" to 24", API 6D Monogram Licensed</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", color: "#15803d", fontWeight: 800 }}>COMPLIANT ✓</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", fontWeight: 700 }}>1.2</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Body Metallurgy: Cast Carbon Steel ASTM A216 Gr. WCB (NACE MR0175)</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>ASTM A216 WCB Domestic Melt & Pour, Sour Gas NACE Certified</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", color: "#15803d", fontWeight: 800 }}>COMPLIANT ✓</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", fontWeight: 700 }}>1.3</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Cryogenic Extended Bonnet (-196°C Service) with ISO 15848-1 Class A</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Extended Stem 300mm with Double PEEK Seals, Class A Helium Tested</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", color: "#15803d", fontWeight: 800 }}>COMPLIANT ✓</td>
                    </tr>
                    <tr style={{ background: content.hasImportedAnomaly ? "#fff1f2" : "#ffffff" }}>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", fontWeight: 700 }}>14.2</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Emergency Shutdown Electro-Hydraulic Actuator Pump Sub-assembly</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>{content.actuatorOrigin || "Indigenous Domestic Electro-Hydraulic Actuator (Class-I Compliant)"}</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", color: content.hasImportedAnomaly ? "#be123c" : "#15803d", fontWeight: 800 }}>
                        {content.hasImportedAnomaly ? "IMPORT CONTENT ⚠️" : "COMPLIANT ✓"}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", fontWeight: 700 }}>1.4</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Fire-Safe Testing Certification under API 607 / ISO 10497</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Third-party Certificate No: TUV-FS-2025-9014 (Valid through 2029)</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", color: "#15803d", fontWeight: 800 }}>COMPLIANT ✓</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", fontWeight: 700 }}>1.5</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>Hydrostatic Shell Pressure Test: 1.5x Design Rating (API 598)</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px" }}>100% Hydrostatic Factory Tested at 2225 PSI, Zero Leakage Recorded</td>
                      <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "center", color: "#15803d", fontWeight: 800 }}>COMPLIANT ✓</td>
                    </tr>
                  </tbody>
                </table>

                {/* Quality Engineer Sign-off */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e2e8f0", paddingTop: 12 }}>
                  <div style={{ fontSize: 11, color: "#475569" }}>
                    <div><strong>Test Laboratory:</strong> {content.testLab || "NABL Accredited Laboratory"}</div>
                    <div><strong>Monogram License:</strong> API 6D Verified (Valid)</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "cursive", fontSize: 16, color: "#1e3a8a" }}>{content.qaEngineer || "Lead QA Engineer"}</div>
                    <div style={{ fontSize: 11, fontWeight: 800 }}>{content.qaEngineer || "Quality Assurance Lead"}</div>
                    <div style={{ fontSize: 10, color: "#475569" }}>Chief Technical Officer / QA Incharge</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. AUTHENTIC MANUFACTURER AUTHORIZATION FORM (MAF) ON OEM LETTERHEAD */}
          {(doc.id === "doc-oem" || doc.fileName?.toLowerCase().includes("oem") || doc.title?.toLowerCase().includes("oem") || doc.fileName?.toLowerCase().includes("maf")) && (
            <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontFamily: "Arial, sans-serif" }}>
              {/* OEM Top Banner */}
              <div style={{ background: "linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)", color: "#ffffff", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "3px solid #6366f1" }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: 0.5 }}>{content.oemName || "ORIGINAL EQUIPMENT MANUFACTURER (OEM)"}</div>
                  <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>Original Equipment Manufacturer (OEM) • Industrial Fluid Dynamics Division</div>
                  <div style={{ fontSize: 9.5, opacity: 0.75, fontFamily: F.mono }}>API Spec Q1 / ISO 29001 Certified OEM</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.15)", padding: "4px 10px", borderRadius: 4, textAlign: "center" }}>
                  <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>AUTHENTIC MAF</div>
                  <div style={{ fontSize: 11, fontWeight: 800, fontFamily: F.mono }}>{content.oemRef || "OEM/MAF/2026/045"}</div>
                </div>
              </div>

              <div style={{ padding: "20px 26px", color: "#0f172a", fontSize: 11.5, lineHeight: 1.5 }}>
                <div style={{ textAlign: "center", fontSize: 15, fontWeight: 900, letterSpacing: 0.5, borderBottom: "1px solid #e2e8f0", paddingBottom: 8, marginBottom: 14 }}>
                  MANUFACTURER'S AUTHORIZATION FORM (MAF)
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 11 }}>
                  <div><strong>To:</strong> Chennai Petroleum Corporation Limited (CPCL) / GeM Authority</div>
                  <div><strong>Date:</strong> {content.mafDate || "15th August 2026"}</div>
                </div>

                <p style={{ margin: "0 0 10px", textAlign: "justify" }}>
                  WHEREAS, We, <strong>M/s {content.oemName || "OEM MANUFACTURER"}</strong>, who are official and established original manufacturers of high-pressure API 6D industrial valves, having manufacturing facilities at {content.oemAddress || "Registered Manufacturing Works"};
                </p>

                <div style={{ background: "#e0e7ff", borderLeft: "4px solid #4338ca", padding: "10px 14px", borderRadius: 4, margin: "12px 0", fontWeight: 600 }}>
                  DO HEREBY AUTHORIZE <strong>M/s {content.authorizedBidder || content.legalName || "BIDDER COMPANY"}</strong> to submit a bid, negotiate and conclude the contract with you against Tender Enquiry No: <strong>{content.tenderRef || "CPCL/2026/TE/045"}</strong> for the supply of API 6D Valves manufactured by us.
                </div>

                {/* Warranty Commitment Box */}
                <div style={{ background: "#ecfdf5", border: "1.5px solid #10b981", borderRadius: 6, padding: "12px 16px", marginBottom: 14 }}>
                  <div style={{ fontWeight: 800, color: "#065f46", fontSize: 12, marginBottom: 4 }}>
                    🛡️ Comprehensive Back-to-Back OEM Warranty Commitment:
                  </div>
                  <div style={{ fontSize: 11, color: "#047857" }}>
                    We hereby extend our full <strong>{content.warrantyPeriod || "36 (Thirty-Six) Months On-Site PSU Warranty"}</strong> for the goods offered by the above bidder. We further guarantee continuous availability of genuine spare parts and technical service support for a minimum period of <strong>10 (Ten) Years</strong> from the date of commissioning.
                  </div>
                </div>

                {/* Sign-off */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 16, paddingTop: 10, borderTop: "1px solid #e2e8f0" }}>
                  <div style={{ width: 90, height: 90, borderRadius: "50%", border: "2px solid #4338ca", color: "#4338ca", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 4, transform: "rotate(-6deg)", fontSize: 8, fontWeight: 900 }}>
                    <div>OEM SEAL</div>
                    <div style={{ fontSize: 6.5 }}>{content.oemName?.split(" ")[0] || "OEM"}</div>
                    <div>★ VERIFIED ★</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10.5, color: "#475569" }}>For {content.oemName || "OEM MANUFACTURER"}</div>
                    <div style={{ fontFamily: "cursive", fontSize: 18, color: "#4338ca", margin: "2px 0" }}>{content.oemSignatory || "OEM Vice President"}</div>
                    <div style={{ fontWeight: 800, fontSize: 11.5 }}>{content.oemSignatory || "Authorized Signatory"}</div>
                    <div style={{ fontSize: 10, color: "#334155" }}>{content.oemSignatoryDesignation || "Vice President (PSU Tenders & Contracts)"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generic Fallback for unlisted documents */}
          {!["doc-gst", "doc-pan", "doc-udyam", "doc-mii", "doc-undertaking", "doc-itr", "doc-epfo", "doc-esic", "doc-balance-sheet", "doc-boq", "doc-oem"].includes(doc.id) && (
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
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f8fafc"
          }}
        >
          <div style={{ fontSize: 12, color: C.inkFaint }}>
            GeM Sentinel Statutory Verification Console
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleDownloadFile}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                background: "#ffffff",
                color: C.navy,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}
            >
              <span>📥</span> Download File
            </button>

            <button
              onClick={onClose}
              style={{
                padding: "8px 18px",
                borderRadius: 6,
                border: "none",
                background: C.navy,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer"
              }}
            >
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
