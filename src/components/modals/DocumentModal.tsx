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
                  Certificate No: {content.stampSerialNumber || "IN-TN98234710298374U"}
                </div>
              </div>

              {/* Certificate Particulars Table */}
              <div style={{ background: "#fffbeb", padding: "14px 18px", borderBottom: "1px solid #fde68a", fontSize: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div><strong>Purchased By:</strong> {content.deponentName?.split(",")[1]?.trim() || "ABC ENGINEERING LIMITED"}</div>
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
                    I, <strong>Mr. Rajesh Kumar</strong>, Managing Director of <strong>M/s ABC ENGINEERING LIMITED</strong>, Plot 14-B, Ambattur Industrial Estate, Chennai, do hereby solemnly swear and state on oath:
                  </p>

                  <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                    <div style={{ fontWeight: 700, color: C.navy, marginBottom: 4 }}>
                      1. Status of Non-Debarment & Non-Blacklisting:
                    </div>
                    <div>
                      {content.solemnAffirmation || "We hereby solemnly affirm and state on oath that M/s ABC Engineering Limited, its directors, partners, and key managerial personnel have never been blacklisted, debarred, suspended, or put on holiday list by GeM, Ministry of Petroleum & Natural Gas, CPCL, any Central/State Government Ministry, PSU, or multilateral funding agency. We also confirm full compliance with the Integrity Pact without any conflict of interest."}
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
                    <div style={{ fontFamily: "cursive", fontSize: 18, color: C.navy, margin: "6px 0 2px" }}>Rajesh Kumar</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>Mr. Rajesh Kumar</div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>Managing Director, ABC Engineering Limited</div>
                    <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 2 }}>DIN: 02849102 • Corporate Seal Affixed</div>
                  </div>

                  {/* Red Notary Stamp */}
                  <div style={{ width: 130, height: 130, borderRadius: "50%", border: "2.5px solid #dc2626", color: "#dc2626", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 6, transform: "rotate(-6deg)", background: "rgba(220,38,38,0.03)" }}>
                    <div style={{ fontSize: 8, fontWeight: 800, textTransform: "uppercase" }}>R. SHANMUGAM</div>
                    <div style={{ fontSize: 7, fontWeight: 700, margin: "2px 0" }}>ADVOCATE & NOTARY</div>
                    <div style={{ fontSize: 8, fontWeight: 900 }}>GOVT. OF TAMIL NADU</div>
                    <div style={{ fontSize: 7 }}>REG. NO. 4412/2014</div>
                    <div style={{ fontSize: 8, fontWeight: 700, marginTop: 2 }}>CHENNAI - INDIA</div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>ATTESTED & REGISTERED BY</div>
                    <div style={{ fontFamily: "cursive", fontSize: 18, color: "#dc2626", margin: "6px 0 2px" }}>R. Shanmugam</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{content.notaryAdvocate || "R. Shanmugam, B.Sc., B.L."}</div>
                    <div style={{ fontSize: 11, color: C.inkFaint }}>Notarial Register Vol. IX, Entry: 1428/2026</div>
                    <div style={{ fontSize: 10, color: C.emerald, fontWeight: 700, marginTop: 2 }}>● Valid through 14-06-2029</div>
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
                Registration Number : <span style={{ fontFamily: F.mono, letterSpacing: 0.5 }}>{content.registrationNumber || "37AABCA1234F1Z5"}</span>
              </div>

              {/* Official 9-Row Government Table */}
              <div style={{ border: "1.5px solid #000000", fontSize: 12 }}>
                {/* 1. Legal Name */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>1.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Legal Name</div>
                  <div style={{ padding: "6px 8px", textTransform: "uppercase", fontWeight: 600 }}>{content.legalName || "PRIVATE LIMITED"}</div>
                </div>

                {/* 2. Trade Name */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>2.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Trade Name, if any</div>
                  <div style={{ padding: "6px 8px", textTransform: "uppercase", fontWeight: 600 }}>{content.tradeName || content.legalName || "PRIVATE LIMITED"}</div>
                </div>

                {/* 3. Constitution of Business */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>3.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Constitution of Business</div>
                  <div style={{ padding: "6px 8px" }}>{content.constitutionOfBusiness || "Private Limited Company"}</div>
                </div>

                {/* 4. Address */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>4.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Address of Principal Place of Business</div>
                  <div style={{ padding: "6px 8px" }}>{content.principalAddress || "Plot No. 14-B, Ambattur Industrial Estate, Chennai, Tamil Nadu - 600058"}</div>
                </div>

                {/* 5. Date of Liability */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>5.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Date of Liability</div>
                  <div style={{ padding: "6px 8px" }}>{content.dateOfLiability || "03/02/2018"}</div>
                </div>

                {/* 6. Period of Validity */}
                <div style={{ display: "grid", gridTemplateColumns: "35px 240px 60px 110px 40px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>6.</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Period of Validity</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000" }}>From</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000" }}>{content.dateOfLiability || "03/02/2018"}</div>
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
                  <div style={{ padding: "6px 8px" }}>{content.approvingState || "Andhra Pradesh"}</div>
                </div>

                {/* Signature Section */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr", borderBottom: "1px solid #000000", minHeight: 70 }}>
                  <div style={{ padding: "8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Signature</div>
                  <div style={{ padding: "10px", display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fef08a", border: "2px solid #ca8a04", color: "#854d0e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>?</div>
                    <div style={{ fontSize: 10.5, lineHeight: 1.3, color: "#1e293b" }}>
                      <div style={{ fontWeight: 800 }}>Signature Not Verified</div>
                      <div>Digitally signed by DS GOODS AND SERVICES TAX NETWORK 1</div>
                      <div>Date: 2018.04.11 21:25:12 IST</div>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Name</div>
                  <div style={{ padding: "6px 8px" }}>{content.officerName || "varigonda girija"}</div>
                </div>

                {/* Designation */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Designation</div>
                  <div style={{ padding: "6px 8px" }}>{content.officerDesignation || "GST Officer"}</div>
                </div>

                {/* Jurisdictional Office */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Jurisdictional Office</div>
                  <div style={{ padding: "6px 8px" }}>{content.jurisdiction || "CHITTOOR-I"}</div>
                </div>

                {/* 9. Date of issue */}
                <div style={{ display: "grid", gridTemplateColumns: "275px 1fr" }}>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>9. Date of issue of Certificate</div>
                  <div style={{ padding: "6px 8px" }}>{content.issueDate || "11/04/2018"}</div>
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
                          {content.name || "ABC ENGINEERING LIMITED"}
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
                          {content.incorporationDate || "14/05/2004"}
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
                        Rajesh Kumar
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
                  <div><strong>PAN Number:</strong> <span style={{ fontFamily: F.mono, color: C.navy, fontWeight: 700 }}>{content.panNumber || "AABCA1234F"}</span></div>
                  <div><strong>Entity Legal Name:</strong> {content.name || "ABC ENGINEERING LIMITED"}</div>
                  <div><strong>Date of Incorporation:</strong> {content.incorporationDate || "14/05/2004"}</div>
                  <div><strong>Issuing Authority:</strong> {content.issuingAuthority || "Income Tax Department, Government of India"}</div>
                  <div style={{ gridColumn: "span 2", color: C.emerald, fontWeight: 700 }}>
                    ✓ Corporate CIN & MCA Database Cross-Check: Verified & Matched (CIN: L28120TN2004PLC053210)
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
                    <div style={{ fontFamily: F.mono, fontWeight: 800, color: "#1e3a8a", fontSize: 13 }}>{content.udyamNumber || "UDYAM-KR-03-0278313"}</div>
                  </div>

                  {/* Row 2: Name of Enterprise */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>NAME OF ENTERPRISE</div>
                    <div style={{ fontWeight: 800, textTransform: "uppercase", fontSize: 12.5 }}>{content.enterpriseName || "ABHINAM ENTERPRISES"}</div>
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
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px" }}>{content.classificationYear || "2023-24"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px", fontWeight: 700, color: "#15803d" }}>{content.classificationType || "Micro"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px" }}>{content.classificationDate || "26/06/2023"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Row 4: Major Activity Banner */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>MAJOR ACTIVITY</div>
                    <div style={{ background: "#15803d", color: "#ffffff", fontWeight: 900, textAlign: "center", padding: "6px 12px", borderRadius: 3, letterSpacing: 2, fontSize: 13, textTransform: "uppercase" }}>
                      {content.majorActivityBanner || "SERVICES"}
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
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 8px", fontWeight: 700 }}>{content.enterpriseName || "ABHINAM ENTERPRISES"}</td>
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
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", width: "25%" }}>{content.flatDoorBlock || "NO.60"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, width: "25%", background: "#f8fafc" }}>Name of Premises/Building</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", width: "25%" }}>{content.premisesBuilding || "G3 SAISUCHIN APPARTMENT"}</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Village/Town</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.villageTown || "VASANTHPURA"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Block</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.block || "MARUTHI LAYOUT"}</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Road/Street/Lane</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.roadStreetLane || "BANGALORE"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>City</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.city || "BANGALORE"}</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>State</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700 }}>{content.state || "KARNATAKA"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>District</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.district || "BENGALURU (URBAN) , Pin 560061"}</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Mobile</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>{content.mobile || "9880572411"}</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700, background: "#f8fafc" }}>Email:</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontFamily: F.mono, fontSize: 10 }}>{content.email || "VINAY.ASSOCI@GMAIL.COM"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Row 8: Incorporation Date */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>DATE OF INCORPORATION / REGISTRATION OF ENTERPRISE</div>
                    <div style={{ fontWeight: 700, textAlign: "center" }}>{content.dateOfIncorporation || "15/06/2017"}</div>
                  </div>

                  {/* Row 9: Commencement Date */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>DATE OF COMMENCEMENT OF PRODUCTION/BUSINESS</div>
                    <div style={{ fontWeight: 700, textAlign: "center" }}>{content.dateOfCommencement || "15/06/2017"}</div>
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
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>56 - Food and beverage service activities</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>5621 - Event catering</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>56210 - Event catering</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700 }}>Services</td>
                        </tr>
                        <tr>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px", textAlign: "center" }}>2</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>70 - Activities of head offices; management consultancy activities</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>7020 - Management consultancy activities</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px" }}>70200 - Management consultancy activities</td>
                          <td style={{ border: "1px solid #cbd5e1", padding: "4px 6px", fontWeight: 700 }}>Services</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Row 11: Date of Udyam Registration */}
                  <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", alignItems: "center" }}>
                    <div style={{ fontWeight: 800, textTransform: "uppercase" }}>DATE OF UDYAM REGISTRATION</div>
                    <div style={{ fontWeight: 800, textAlign: "center", color: "#1e3a8a" }}>{content.dateOfUdyamRegistration || "26/06/2023"}</div>
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
                  <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 0.5 }}>{content.assessmentYear || "2020-21"}</div>
                </div>
              </div>

              {/* Taxpayer Details Table */}
              <div style={{ border: "1.5px solid #000000", borderBottom: "none", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", borderBottom: "1px solid #000000", padding: "4px 8px" }}>
                  <span style={{ fontWeight: 700 }}>PAN</span>
                  <span style={{ fontFamily: F.mono, fontWeight: 700 }}>{content.panNumber || "AABCA1234F"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", borderBottom: "1px solid #000000", padding: "4px 8px" }}>
                  <span style={{ fontWeight: 700 }}>Name</span>
                  <span style={{ textTransform: "uppercase", fontWeight: 700 }}>{content.name || "ABHINAM ENTERPRISES"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", borderBottom: "1px solid #000000", padding: "4px 8px" }}>
                  <span style={{ fontWeight: 700 }}>Address</span>
                  <span>{content.address || "NO.60, G3 SAISUCHIN APPARTMENT, VASANTHPURA, BANGALORE - 560061"}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 140px 140px", borderBottom: "1px solid #000000" }}>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Status</div>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000" }}>{content.status || "Individual"}</div>
                  <div style={{ padding: "4px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>Form Number</div>
                  <div style={{ padding: "4px 8px", fontWeight: 700 }}>{content.formType || "ITR-3"}</div>
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
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>{content.businessLoss || "675484"}</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", fontWeight: 700 }}>Total Income</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}></div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono, fontWeight: 700 }}>{content.totalIncome || "160850"}</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Book Profit under MAT, where applicable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>2</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>0</div>

                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000" }}>Adjusted Total Income under AMT, where applicable</div>
                  <div style={{ padding: "3px 4px", borderBottom: "1px solid #000000", borderRight: "1px solid #000000", textAlign: "center" }}>3</div>
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono }}>{content.totalIncome || "160850"}</div>

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
                  <div style={{ padding: "3px 8px", borderBottom: "1px solid #000000", textAlign: "right", fontFamily: F.mono, fontWeight: 700 }}>{content.taxPaid || "9500"}</div>

                  <div style={{ padding: "3px 8px", borderRight: "1px solid #000000", fontWeight: 700 }}>(+)Tax Payable / (-)Refundable (6-7)</div>
                  <div style={{ padding: "3px 4px", borderRight: "1px solid #000000", textAlign: "center" }}>8</div>
                  <div style={{ padding: "3px 8px", textAlign: "right", fontFamily: F.mono, fontWeight: 700, color: "#15803d" }}>-9500</div>
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
                <div>Income Tax Return submitted electronically on <strong>21-08-2020 15:25:22</strong> from IP address <strong>106.195.42.18</strong> and verified by <strong>{content.name || "ABHINAM ENTERPRISES"}</strong> having PAN <strong>{content.panNumber || "AABCA1234F"}</strong> on <strong>21-08-2020 15:25:22</strong> from IP address <strong>106.195.42.18</strong> using <strong>Digital Signature Certificate (DSC)</strong>.</div>
                <div style={{ marginTop: 4 }}>DSC details: <strong>SHA-256 Validated • Cert No: DS2020-91823901 • Authorized CA: eMudhra</strong></div>
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
                <div style={{ fontWeight: 800, textTransform: "uppercase" }}>{content.establishmentName || "M/S INDUSTRIAL FURNACES"}</div>
                <div>Proprietor</div>
                <div>3rd Left, Industrial Area</div>
                <div style={{ fontWeight: 700 }}>HYDERABAD, TELANGANA - 500072</div>
              </div>

              {/* Subject */}
              <div style={{ background: "#f8fafc", padding: "6px 10px", border: "1px solid #e2e8f0", fontWeight: 700, marginBottom: 12, fontSize: 11.5 }}>
                Sub: Allotment of Code Number to establishment M/s {content.establishmentName || "Industrial Furnaces"} under Employees' Provident Fund and Miscellaneous Provisions Act, 1952-regarding.
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
                <span style={{ fontFamily: F.mono, fontWeight: 900, color: "#1e3a8a", fontSize: 14 }}>{content.establishmentCode || "APHYD0089201000"}</span>
              </div>

              {/* 7 Points of Declarations */}
              <div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>This code number is allotted based on the following declarations by you:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8, fontSize: 11.5 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>1. Name of Establishment</span><span>:</span><strong style={{ textTransform: "uppercase" }}>{content.establishmentName || "M/S INDUSTRIAL FURNACES"}</strong>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>2. PAN of Establishment</span><span>:</span><span style={{ fontFamily: F.mono, fontWeight: 700 }}>{content.panNumber || "AABCA1234F"}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>3. Date on which employment strength crossed 19</span><span>:</span><strong>01/08/2023</strong>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>4. Section under which</span><span>:</span><span style={{ fontFamily: F.mono }}>0001(3)(b)</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>5. Primary Activity</span><span>:</span><strong style={{ color: "#1e3a8a" }}>ENGINEERS - ENGG. CONTRACTORS</strong>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "240px 15px 1fr" }}>
                    <span>6. Ownership Type</span><span>:</span><strong>Proprietorship Firm</strong>
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
                <div style={{ fontSize: 11, color: "#334155" }}>Regional Office, Hyderabad / Chennai</div>
                <div style={{ fontSize: 10, color: "#15803d", fontWeight: 700, marginTop: 2 }}>✓ Active ECR Return Compliance Verified</div>
              </div>
            </div>
          )}

          {/* 6. MAKE IN INDIA */}
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

          {/* 7. AUTHENTIC AUDITED BALANCE SHEET (Matches CA Audited Format) */}
          {(doc.id === "doc-balance-sheet" || doc.fileName?.toLowerCase().includes("balance") || doc.title?.toLowerCase().includes("balance")) && (
            <div style={{ background: "#fcfbfa", border: "1.5px solid #334155", borderRadius: 4, padding: "24px", color: "#000000", fontFamily: "Arial, sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
              {/* Company Header */}
              <div style={{ textAlign: "center", borderBottom: "2px solid #000000", paddingBottom: 10, marginBottom: 14 }}>
                <div style={{ fontSize: 15, fontWeight: 900, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {content.enterpriseName || "M/S INDUSTRIAL FURNACES"}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, margin: "2px 0", textTransform: "uppercase" }}>
                  {content.address || "PLOT NO. 116 GALI NO. 6 KRISHNA COLONY , SECTOR-25, BALLABGARH, FARIDABAD"}
                </div>
                <div style={{ fontSize: 12, fontWeight: 900, textDecoration: "underline", marginTop: 4 }}>
                  PROVISIONAL / AUDITED BALANCE SHEET AS AT 31.01.2023
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
                    <div>4816233.00</div>
                    <div>3300387.00</div>
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
                    <div style={{ paddingLeft: 6 }}>Bike / Car</div>
                    <div style={{ paddingLeft: 6 }}>Computer / Mobile</div>
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
                  <div style={{ padding: "6px 4px", borderRight: "1.5px solid #000000", textAlign: "right", fontFamily: F.mono, fontSize: 11 }}>48673846.00</div>
                  <div style={{ padding: "6px 8px", borderRight: "1px solid #000000", textTransform: "uppercase" }}>Total</div>
                  <div style={{ padding: "6px 4px", borderRight: "1px solid #000000" }}></div>
                  <div style={{ padding: "6px 4px", textAlign: "right", fontFamily: F.mono, fontSize: 11 }}>48673846.00</div>
                </div>
              </div>

              {/* Proprietor & CA Attestation Section */}
              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "flex-start" }}>
                {/* Left: Place & Note */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>DATE: 28/02/2023</div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>PLACE: FARIDABAD</div>
                  <div style={{ fontSize: 10, fontStyle: "italic", marginTop: 8, color: "#334155" }}>
                    "Physical verification of closing stock has not been facilitated; it is taken as certified by the proprietor"
                  </div>
                </div>

                {/* Right: Proprietor Signature */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11 }}>For, Industrial Furnaces</div>
                  <div style={{ fontSize: 12, fontWeight: 800, margin: "4px 0" }}>For INDUSTRIAL FURNACES (Prop)</div>
                  <div style={{ fontFamily: "cursive", fontSize: 20, color: "#1e3a8a", transform: "rotate(-3deg)", display: "inline-block", margin: "4px 0" }}>
                    संजय चौधरी Proprietor
                  </div>
                </div>
              </div>

              {/* Chartered Accountant Box with Blue Stamp */}
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1.5px dashed #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>For AMKN & CO</div>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>Chartered Accountants (FRN: 032712C)</div>
                  <div style={{ fontFamily: "cursive", fontSize: 18, color: "#1d4ed8", margin: "4px 0" }}>CA Nitin Kaushik</div>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>CA NITIN KAUSHIK (Partner)</div>
                  <div style={{ fontSize: 10, color: "#334155" }}>M.NO- 558996</div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#15803d", fontFamily: F.mono, marginTop: 2 }}>
                    UDIN- 23558996BGSVMJ272
                  </div>
                </div>

                {/* Round Blue CA Seal */}
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "2.5px solid #1d4ed8",
                    color: "#1d4ed8",
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
                  <div style={{ fontSize: 7.5, fontWeight: 900, textTransform: "uppercase" }}>AMKN & CO</div>
                  <div style={{ fontSize: 6.5, fontWeight: 800 }}>FRN: 032712C</div>
                  <div style={{ fontSize: 8, fontWeight: 900, margin: "2px 0" }}>NOIDA</div>
                  <div style={{ fontSize: 6, fontWeight: 700, textTransform: "uppercase" }}>Chartered Accountants</div>
                </div>
              </div>
            </div>
          )}

          {/* 8. TECHNICAL BOQ */}
          {doc.id === "doc-boq" && (
            <div style={{ border: "2px solid #334155", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #334155", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>SCHEDULE OF BILL OF QUANTITIES & TECHNICAL COMPLIANCE</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.navy, margin: "4px 0" }}>API 6D TECHNICAL DATASHEETS</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Standard: {content.specificationStandard}</div>
              </div>
              <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 10 }}>
                <div><strong>Total Line Items:</strong> {content.totalLineItems}</div>
                <div><strong>Key Component:</strong> {content.keyComponent1}</div>
                <div style={{ background: "#fff1f2", border: "1px solid #fecdd3", padding: 10, borderRadius: 6, color: "#9f1239" }}>
                  <strong>Note:</strong> {content.keyComponent2}
                </div>
              </div>
            </div>
          )}

          {/* 9. OEM AUTHORIZATION */}
          {doc.id === "doc-oem" && (
            <div style={{ border: "2px solid #4338ca", borderRadius: 8, padding: 20, background: "#fafafa" }}>
              <div style={{ textAlign: "center", borderBottom: "2px solid #4338ca", paddingBottom: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: C.inkMuted }}>ORIGINAL EQUIPMENT MANUFACTURER AUTHORIZATION</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#4338ca", margin: "4px 0" }}>MANUFACTURER AUTHORIZATION FORM (MAF)</div>
                <div style={{ fontSize: 12, color: C.inkFaint }}>Back-to-Back Warranty Guarantee</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
                <div><strong>Authorizing OEM:</strong> {content.authorizingManufacturer}</div>
                <div><strong>Territory:</strong> {content.territory}</div>
                <div><strong>Validity:</strong> <span style={{ color: C.emerald, fontWeight: 700 }}>{content.validThrough}</span></div>
                <div><strong>Warranty:</strong> {content.warrantyCommitment}</div>
              </div>
            </div>
          )}

          {/* Generic Fallback for unlisted documents */}
          {!["doc-gst", "doc-pan", "doc-udyam", "doc-mii", "doc-undertaking", "doc-itr", "doc-epfo", "doc-balance-sheet", "doc-boq", "doc-oem"].includes(doc.id) && (
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
